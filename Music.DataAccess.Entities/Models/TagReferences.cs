using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music.Modals
{
    public class TagReferences
    {
        public int TagReferenceId { get; set; }
        public int TagId { get; set; }
        public string UserId { get; set; }
        public string YouTubeId { get; set; }
        public bool Fixed { get; set; }
        public string Tag { get; set; }
        public string Color { get; set; }
    }
}
