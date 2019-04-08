using System;
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
using Microsoft.IdentityModel.Protocols;
using Music.DataAccess.Repositories;
using Music.Modals;


namespace Music.Controllers
{
    public class UploadController : Controller
    {        
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SongRepository _songRepository;
        private readonly TagRepository _tagRepository;

        public UploadController(
            UserManager<ApplicationUser> userManager,
            SongRepository songRepository,
            TagRepository tagRepository)
        {
            _userManager = userManager;
            _songRepository = songRepository;
            _tagRepository = tagRepository;
        }

        [HttpPost]
        public void Playlist(List<Songs> songs)
        {
            UploadSongs(songs);
        }

        public void UploadSongs(List<Songs> songs)
        {
            var userId = _userManager.GetUserId(HttpContext.User);

            var distinctSongs = songs.GroupBy(s => s.YouTubeId).Select(s => s.OrderBy(x => x.YouTubeId).First()).ToList();

            var currentTags = _tagRepository.All(userId);
            var playlists = songs.GroupBy(s => s.Playlist).Select(s => s.OrderBy(x => x.Playlist).First()).ToList();
            var references = new List<TagReferences>();
            playlists.ForEach(p =>
            {
                var tagId = 0;
                if (!currentTags.Any(t => t.Tag == p.Playlist))
                {
                    tagId = _tagRepository.Upload(userId, p.Playlist, 1, null);
                }
                else
                {
                    tagId = currentTags.Where(t => t.Tag == p.Playlist).Select(t => t.TagId).First();
                }

                songs.ForEach(s =>
                {
                    if (s.Playlist == p.Playlist)
                    {
                        references.Add(new TagReferences()
                        {
                            TagId = tagId,
                            YouTubeId = s.YouTubeId
                        });
                    }
                });
            });

            _tagRepository.BulkUploadReferences(references);
            _songRepository.BulkUpload(userId, distinctSongs);
        }
    }
}