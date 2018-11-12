using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Music.Modals;

namespace Music.Controllers
{
    public class PlayerController : Controller
    {
        private string _connectionString = "Server=tcp:lemasterworks.database.windows.net,1433;Initial Catalog=MusicPlayer;Persist Security Info=False;User ID=tlemaster;Password=Lexielm2;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        private readonly UserManager<ApplicationUser> _userManager;

        public PlayerController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public JsonResult Songs()
        {
            var songs = GetSongs();
            return Json(new { songs });
        }

        [HttpPost]
        public JsonResult Search([FromBody] List<string> values)
        {
            var fullPlayList = GetSongs();
            var results = new List<Songs>();
            values.ForEach(value =>
            {
                var searched = fullPlayList.Where(s => s.Name.ToLower().Contains(value.ToLower())).ToList();
                results = results.Concat(searched).ToList();
            });

            var distinct = results.Distinct().ToList();
            Random rnd = new Random();
            var songs = from song in distinct
                        orderby rnd.Next()
                        select song;

            return Json(new { songs });
        }

        public List<Songs> GetSongs()
        {
            var userId = _userManager.GetUserId(HttpContext.User);

            var songs = new List<Songs>();
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                songs = connection.Query<Songs>("GetSongs", new { userId }, commandType: CommandType.StoredProcedure).ToList();
            }

            return songs;
        }
    }
}