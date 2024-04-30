using Google.Cloud.Firestore;

namespace AtrevetGroup8.Models
{
    [FirestoreData]
    public class Grage
    {
        [FirestoreProperty]
        public string Address { get; set; }

        [FirestoreProperty]
        public string Availability { get; set; }

        [FirestoreProperty]
        public int Cost { get; set; }

        [FirestoreProperty]
        public string Description { get; set; }

        [FirestoreProperty]
        public int Height { get; set; }

        [FirestoreProperty]
        public int Length { get; set; }

        [FirestoreProperty]
        public Location Location { get; set; }

        [FirestoreProperty]
        public string OfferorId { get; set; }

        [FirestoreProperty]
        public double Rating { get; set; }

        [FirestoreProperty]
        public int Spaces { get; set; }

        [FirestoreProperty]
        public List<DateTime> SpecialDates { get; set; }

        [FirestoreProperty]
        public int State { get; set; }

        [FirestoreProperty]
        public List<TimeTableEntry> TimeTable { get; set; }

        [FirestoreProperty]
        public int Width { get; set; }
    }

    [FirestoreData]
    public class Location
    {
        [FirestoreProperty]
        public double Latitude { get; set; }

        [FirestoreProperty]
        public double Longitude { get; set; }
    }

    [FirestoreData]
    public class TimeTableEntry
    {
        [FirestoreProperty]
        public string Day { get; set; }

        [FirestoreProperty]
        public List<Period> Periods { get; set; }
    }

    [FirestoreData]
    public class Period
    {
        [FirestoreProperty]
        public int StartHour { get; set; }

        [FirestoreProperty]
        public int EndHour { get; set; }
    }
}
