using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Music.DataAccess.Repositories;

namespace Music.App.Controllers
{
    public class UserController : Controller
    {
        private readonly SongRepository _songRepository;
        private readonly TagRepository _tagRepository;

        public UserController(SongRepository songRepository, TagRepository tagRepository)
        {
            _songRepository = songRepository;
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public JsonResult Stats()
        {
            var stats = _songRepository.GetStats();
            return Json(stats);
        }
    }
}