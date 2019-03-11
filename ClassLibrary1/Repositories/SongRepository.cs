using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
using Music.DataAccess.Core;

namespace Music.DataAccess.Repositories
{
    public class SongRepository : BaseRepository
    {
        public List<Songs> All(string userId)
        {
            var songs = Retrieve(
                "GetSongs",
                new
                {
                    userId
                },
                (db, cmd) => db.Query<Songs>(cmd)
            );

            return songs.ToList();
        }

        public void BulkUpload(string userId, List<Songs> songs)
        {
            var records = songs.Select(s => new
            {
                userId,
                s.YouTubeId,
                s.Name,
                s.Thumbnail,
                s.PublishedDate
            }).ToDataTable();

            Execute(
                "UploadSongs",
                new { records },
                (db, cmd) => db.Execute(cmd)
            );
        }
    }
}
