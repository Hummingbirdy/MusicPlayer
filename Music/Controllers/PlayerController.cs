using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Music.App.Controllers;
using Music.DataAccess.Repositories;
using Music.Modals;

namespace Music.Controllers
{
    public class PlayerController : BaseAPIController
    {
        private readonly SongRepository _songRepository;
        private readonly TagRepository _tagRepository;

        public PlayerController(
            SongRepository songRepository,
            TagRepository tagRepository)
        {
            _songRepository = songRepository;
            _tagRepository = tagRepository;
        }

        [HttpGet]
        [Authorize]
        public JsonResult Songs()
        {
            var userId = GetUser();

            var songs = _songRepository.All(userId);
            var references = _tagRepository.AllReferences(userId);

            foreach (var song in songs)
            {
                var tags = new List<TagReferences>();
                foreach (var reference in references)
                {
                    if (reference.YouTubeId == song.YouTubeId)
                    {
                        var tag = new TagReferences()
                        {
                            TagReferenceId = reference.TagReferenceId,
                            Tag = reference.Tag,
                            Fixed = reference.Fixed,
                            Color = reference.Color
                        };
                        tags.Add(tag);
                    }
                }
                song.Tags = tags;
            }

            songs.OrderBy(s => s.Name).ToList();

            return Json(new { songs });
        }

        [HttpPost]
        [Authorize]
        public JsonResult Search([FromBody]string search)
        {
            var userId = GetUser();

            var songs = RunSearch(search, userId);
            return Json(new { songs });
        }

        [HttpGet]
        public JsonResult AndroidSearch(string search)
        {
            var userId = "9b107906-4975-49fa-8d7a-d6f2274d995b";

            var songs = RunSearch(search, userId);


            return Json(songs);
        }

        private List<Songs> RunSearch(string search, string userId)
        {
            string[] searchingFor = new string[] { };
            string[] doesNotContain = new string[] { };

            while (search.Contains('-'))
            {
                var dashLocation = search.IndexOf('-');
                if (search[dashLocation + 1] == '"')
                {
                    var startQuote = search.IndexOf('"', dashLocation);
                    var endQuote = search.IndexOf('"', startQuote + 1);

                    var quotedTerm = search.Substring(startQuote + 1, endQuote - (startQuote + 1)).Trim();
                    doesNotContain = doesNotContain.Concat(new string[] { quotedTerm }).ToArray();
                    search = search.Remove(dashLocation, endQuote - dashLocation + 1);
                }
                else
                {
                    var endOfWord = search.IndexOf(' ', dashLocation);
                    var quotedTerm = search.Substring(dashLocation + 1, endOfWord - dashLocation).Trim();
                    doesNotContain = doesNotContain.Concat(new string[] { quotedTerm }).ToArray();
                    search = search.Remove(dashLocation, endOfWord - dashLocation + 1);
                }
            }

            while (search.Contains('"'))
            {
                if (search.Count(s => s == '"') % 2 == 1)
                {
                    break;
                }
                var startQuote = search.IndexOf('"');
                var endQuote = search.IndexOf('"', startQuote + 1);

                var quotedTerm = search.Substring(startQuote + 1, endQuote - (startQuote + 1)).Trim();
                searchingFor = searchingFor.Concat(new string[] { quotedTerm }).ToArray();
                search = search.Remove(startQuote, endQuote - startQuote + 1);
            }

            string[] searchTerms = search.Split(' ');
            searchingFor = searchingFor.Concat(searchTerms).ToArray();

            var fullPlayList = _songRepository.All(userId);
            var results = new List<Songs>();

            foreach (var term in searchingFor)
            {
                var songMatches = fullPlayList.Where(s => s.Name.ToLower().Contains(term.ToLower()));
                results.AddRange(songMatches);

                var songsForTag = _songRepository.GetByTag(term);
                results.AddRange(songsForTag);
            }

            foreach (var term in doesNotContain)
            {
                results.RemoveAll(r => r.Name.ToLower().Contains(term.ToLower()));
            }

            var distinct = results.Distinct().ToList();

            var references = _tagRepository.AllReferences(userId);

            foreach (var song in distinct)
            {
                var tags = new List<TagReferences>();
                foreach (var reference in references)
                {
                    if (reference.YouTubeId == song.YouTubeId)
                    {
                        var tag = new TagReferences()
                        {
                            TagReferenceId = reference.TagReferenceId,
                            Tag = reference.Tag,
                            Fixed = reference.Fixed,
                            Color = reference.Color
                        };
                        tags.Add(tag);
                    }
                }
                song.Tags = tags;
            }

            Random rnd = new Random();
            var songs = from song in distinct
                        orderby rnd.Next()
                        select song;

            return songs.ToList();
        }
    }

    public class Result
    {
        public List<SearchTerms> Names { get; set; }
        public List<SearchTerms> Tags { get; set; }
    }

    public class SearchTerms
    {
        public string Name { get; set; }
    }
}