﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Music.App.Controllers;
using Music.DataAccess.Repositories;
using Music.Modals;


namespace Music.Controllers
{
    public class UploadController : BaseAPIController
    {
        private readonly SongRepository _songRepository;
        private readonly TagRepository _tagRepository;

        public UploadController(
            SongRepository songRepository,
            TagRepository tagRepository)
        {
            _songRepository = songRepository;
            _tagRepository = tagRepository;
        }

        [HttpPost]
        [Authorize]
        public void Playlist([FromBody]List<Songs> songs)
        {         
            var userId = GetUser();

            var distinctSongs = songs.GroupBy(s => s.YouTubeId).Select(s => s.OrderBy(x => x.YouTubeId).First()).ToList();

            var currentTags = _tagRepository.All(userId);

            var playlists = songs.ToLookup(s => s.Playlist);
            var references = new List<TagReferences>();

            foreach (var playlist in playlists)
            {
                var tagId = 0;
                if (!currentTags.Any(t => t.Tag == playlist.Key))
                {
                    tagId = _tagRepository.Upload(userId, playlist.Key, 1, null);
                }
                else
                {
                    tagId = currentTags.Where(t => t.Tag == playlist.Key).Select(t => t.TagId).First();
                }

                foreach (var song in playlist)
                {
                    references.Add(new TagReferences()
                    {
                        TagId = tagId,
                        YouTubeId = song.YouTubeId,
                        UserId = userId
                    });                   
                }
            }

            try
            {
                _songRepository.BulkUpload(userId, distinctSongs);
                _tagRepository.BulkUploadReferences(references);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}