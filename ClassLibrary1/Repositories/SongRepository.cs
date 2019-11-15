using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
using Music.DataAccess.Core;
using Music.DataAccess.Entities.Models;

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
                new { songs = records },
                (db, cmd) => db.Execute(cmd)
            );
        }

        public List<Songs> GetByTag(string tag)
        {
            var songs = Retrieve(
                "GetSongsByTag",
                new { tag },
                (db, cmd) => db.Query<Songs>(cmd)
            )
            .ToList();

            return songs;
        }

        public Stats GetStats()
        {
            var stats = Retrieve(
                "GetStats",
                (db, cmd) =>
                {
                    using (var multi = db.QueryMultiple(cmd))
                    {
                        return new Stats()
                        {
                            LastSyncDate = multi.ReadFirst<DateTime>(),
                            SongCount = multi.ReadFirst<int>()
                        };
                    }
                }
            );

            return stats;
        }
    }
}
