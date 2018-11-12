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
using Music.Modals;


namespace Music.Controllers
{
    public class UploadController : Controller
    {
        private string _connectionString = "Server=tcp:lemasterworks.database.windows.net,1433;Initial Catalog=MusicPlayer;Persist Security Info=False;User ID=tlemaster;Password=Lexielm2;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        private readonly UserManager<ApplicationUser> _userManager;

        public UploadController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
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

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                try
                {
                    var currentTags = connection.Query<Tags>("GetTags", commandType: CommandType.StoredProcedure).ToList();
                    var playlists = songs.GroupBy(s => s.Playlist).Select(s => s.OrderBy(x => x.Playlist).First()).ToList();
                    var references = new List<TagReferences>();
                    playlists.ForEach(p =>
                    {
                        var tagId = 0;
                        if (!currentTags.Any(t => t.Tag == p.Playlist))
                        {
                            tagId = connection.Query<int>("UploadTag", new { tag = p.Playlist }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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
                                    YoutTubeId = s.YouTubeId
                                });
                            }
                        });
                    });

                    var rec = references.Select(r => new
                    {
                        r.TagId,
                        r.YoutTubeId
                    }).ToDataTable();
                    connection.Query("UploadTagReferences", new { references = rec }, commandType: CommandType.StoredProcedure);

                    var records = distinctSongs.Select(s => new
                    {
                        userId,
                        s.YouTubeId,
                        s.Name,
                        s.Thumbnail,
                        s.PublishedDate
                    }).ToDataTable();
                    connection.Query("UploadSongs", new { songs = records }, commandType: CommandType.StoredProcedure);

                }
                catch(Exception ex)
                {
                    var message = ex;
                    throw;
                }
            }
        }
    }
}