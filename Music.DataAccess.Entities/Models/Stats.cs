using System;
using System.Collections.Generic;
using System.Text;

namespace Music.DataAccess.Entities.Models
{
    public class Stats
    {
        public DateTime LastSyncDate { get; set; }
        public int SongCount { get; set; }
    }
}
