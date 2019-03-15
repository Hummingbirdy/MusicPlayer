using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Music.App.Modals;
using Music.DataAccess.Repositories;
using Music.Modals;

namespace Music.Controllers
{
    public class LibraryController : Controller
    {
        private readonly TagRepository _tagRepository;

        public LibraryController(TagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllTags()
        {
            var tags = _tagRepository.All();

            return Json(new
            {
                tags
            });
        }

        [HttpPost]
        public JsonResult AddTagReference([FromBody]TagDetails tagDetails)
        {
            if(tagDetails.TagId == null)
            {
                tagDetails.TagId = _tagRepository.Upload(tagDetails.Tag, 2);
            }
            _tagRepository.UploadReference((int)tagDetails.TagId, tagDetails.YouTubeId);
            return Json("");
        }

        //[HttpPost]
        //public JsonResult AddTag([FromBody] string tag)
        //{
        //    _tagRepository.Upload(tag, 2);

        //    return Json("");
        //}
    }
}