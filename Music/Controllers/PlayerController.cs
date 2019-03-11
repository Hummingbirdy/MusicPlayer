using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Music.DataAccess.Repositories;
using Music.Modals;

namespace Music.Controllers
{
    public class PlayerController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SongRepository _songRepository;
        private readonly TagRepository _tagRepository;

        public PlayerController(
            UserManager<ApplicationUser> userManager, 
            SongRepository songRepository,
            TagRepository tagRepository)
        {
            _userManager = userManager;
            _songRepository = songRepository;
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public JsonResult Songs()
        {
            var userId = _userManager.GetUserId(HttpContext.User);

            var songs = _songRepository.All(userId);
            var references = _tagRepository.AllReferences();

            foreach (var song in songs)
            {
                var tags = new List<TagReferences>();
                foreach (var reference in references)
                {
                    if (reference.YouTubeId == song.YouTubeId)
                    {
                        var tag = new TagReferences()
                        {
                            Tag = reference.Tag
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
        public JsonResult Search([FromBody] List<SearchTerms> values)
        {
            var userId = _userManager.GetUserId(HttpContext.User);
            var fullPlayList = _songRepository.All(userId);
            var results = new List<Songs>();
            values.ForEach(value =>
            {
                var searched = fullPlayList.Where(s => s.Name.ToLower().Contains(value.Name.ToLower())).ToList();
                results = results.Concat(searched).ToList();
            });

            var distinct = results.Distinct().ToList();
            Random rnd = new Random();
            var songs = from song in distinct
                        orderby rnd.Next()
                        select song;

            return Json(new { songs });
        }
    }

    public class SearchTerms
    {
        public string Name { get; set; }
    }
}