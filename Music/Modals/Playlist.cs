using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music.App.Modals
{
    public class Playlist
    {
        public string Name { get; set; }
        public List<Songs> Songs { get; set; }
    }
}
