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
        public List<Tags> All()
        {
            var tags = Retrieve(
                "GetTags",
                (db, cmd) => db.Query<Tags>(cmd)
            );

            return tags.ToList();
        }

        public int Upload(string tag, int type)
        {
            var tagId = Retrieve(
                "UploadTag",
                new { tag, type },
                (db, cmd) => db.QueryFirstOrDefault<int>(cmd)
            );

            return tagId;
        }

        public void BulkUploadReferences(List<TagReferences> tagReferences)
        {
            var records = tagReferences.Select(r => new
            {
                r.TagId,
                r.YouTubeId
            }).ToDataTable();

            Execute(
                "BulkUploadTagReferences",
                new { records },
                (db, cmd) => db.Execute(cmd)
            );
        }

        public List<TagReferences> AllReferences()
        {
            var references = Retrieve(
                "GetTagReferences",
                (db, cmd) => db.Query<TagReferences>(cmd)
            );

            return references.ToList();
        }

        public void UploadReference(int tagId, string youTubeId)
        {
            Execute(
                "UploadTagReference",
                new { tagId, youTubeId },
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
    }
}
