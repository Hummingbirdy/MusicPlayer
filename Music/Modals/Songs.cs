using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music
{
    public class Songs
    {
        public int SongId { get; set; }
        public string YouTubeId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Thumbnail { get; set; }
        public DateTime PublishedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public string Playlist { get; set; }
        public int TagId { get; set; }
    }
}
