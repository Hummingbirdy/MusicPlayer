using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
using Music.DataAccess.Core;
using Music.DataAccess.Entities.Models;
using Music.Modals;

namespace Music.DataAccess.Repositories
{
    public class TagRepository : BaseRepository
    {
        public List<Tags> All(string userId)
        {
            var tags = Retrieve(
                "GetTags",
                new { userId },
                (db, cmd) => db.Query<Tags>(cmd)
            );

            return tags.ToList();
        }

        public int Upload(string userId, string tag, int type, string color)
        {
            var tagId = Retrieve(
                "UploadTag",
                new {
                    userId,
                    tag,
                    type,
                    color
                },
                (db, cmd) => db.QueryFirstOrDefault<int>(cmd)
            );

            return tagId;
        }

        public void BulkUploadReferences(List<TagReferences> tagReferences)
        {
            var records = tagReferences.Select(r => new
            {
                r.UserId,
                r.TagId,
                r.YouTubeId,
            }).ToDataTable();

            Execute(
                "BulkUploadTagReferences",
                new { records },
                (db, cmd) => db.Execute(cmd)
            );
        }

        public List<TagReferences> AllReferences(string userId)
        {
            var references = Retrieve(
                "GetTagReferences",
                new { userId },
                (db, cmd) => db.Query<TagReferences>(cmd)
            );

            return references.ToList();
        }

        public void UploadReference(string userId, int tagId, string youTubeId)
        {
            Execute(
                "UploadTagReference",
                new { userId, tagId, youTubeId },
                (db, cmd) => db.Execute(cmd)
            );
        }

        public List<Colors> AllColors()
        {
            var colors = Retrieve(
                "GetColors",
                (db, cmd) => db.Query<Colors>(cmd)
            );

            return colors.ToList();
        }

        public void DeleteTagReference(int referenceId)
        {
            Execute(
               "DeleteTagReference",
               new { referenceId },
               (db, cmd) => db.Execute(cmd)
            );
        }
    }
}
