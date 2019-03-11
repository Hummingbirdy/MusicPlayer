using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
using Music.DataAccess.Core;
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

        public int Upload(string tag)
        {
            var tagId = Retrieve(
                "UploadTag",
                new { tag },
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
    }
}
