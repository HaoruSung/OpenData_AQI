using System;
using System.Collections.Generic;
using System.Text;

namespace IAirMap.ViewModel.In
{
    public class Out_OpenDataAQI
    {
        public bool include_total { get; set; }
        public string resource_id { get; set; }
        public List<Field> fields { get; set; }
        public Extras __extras { get; set; }
        public string records_format { get; set; }
        public List<Record> records { get; set; }
        public int limit { get; set; }
        public int offset { get; set; }
        public Links _links { get; set; }
        public int total { get; set; }
    }
    public class Info
    {
        public string notes { get; set; }
        public string label { get; set; }
    }

    public class Field
    {
        public Info info { get; set; }
        public string type { get; set; }
        public string id { get; set; }
    }

    public class Extras
    {
        public string api_key { get; set; }
    }

    public class Record
    {
        public string SiteName { get; set; }
        public string County { get; set; }
        public double? AQI { get; set; }
        public string Pollutant { get; set; }
        public string Status { get; set; }
        public string SO2 { get; set; }
        public string CO { get; set; }
        public string CO_8hr { get; set; }
        public string O3 { get; set; }
        public string O3_8hr { get; set; }
        public string PM10 { get; set; }
        public string PM25 { get; set; }
        public string NO2 { get; set; }
        public string NOx { get; set; }
        public string NO { get; set; }
        public string WindSpeed { get; set; }
        public string WindDirec { get; set; }
        public string PublishTime { get; set; }
        public string PM25AVG { get; set; }
        public string PM10_AVG { get; set; }
        public string SO2_AVG { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string SiteId { get; set; }
        public string ImportDate { get; set; }
    }

    public class Links
    {
        public string start { get; set; }
        public string next { get; set; }
    }

}
