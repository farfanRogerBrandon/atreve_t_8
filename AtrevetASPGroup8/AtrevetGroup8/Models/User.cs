using Google.Cloud.Firestore;

namespace AtrevetGroup8.Models
{

    [FirestoreData]

    public class User : FireBaseConnection
    {
        [FirestoreDocumentId]
        public string Id { get; set; }

        [FirestoreProperty]
        public string names { get; set; }
        [FirestoreProperty]
        public string lastnames { get; set; }
        [FirestoreProperty]
        public string password { get; set; }
        [FirestoreProperty]
        public string ci { get; set; }
        [FirestoreProperty]
        public string mail { get; set; }
        [FirestoreProperty]
        public string cellphone { get; set; }
        [FirestoreProperty]
        public double rating { get; set; }
        [FirestoreProperty]
        public string role {  get; set; }
        [FirestoreProperty]
        public int state { get; set; }
    }
}
