using Google.Cloud.Firestore;

namespace AtrevetGroup8.Models
{
    public class UserImpl : FireBaseConnection
    {
        public async Task<List<(User, int, double, int, int)>> GetOfferor()
        {
            List<(User,int,double,int, int)> offerors = new List<(User, int, double, int, int)>();

            QuerySnapshot querySnapshot = await db.Collection("user").GetSnapshotAsync();
            int xdd = querySnapshot.Count();
            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {
                User user = new User();
                try
                {
                    user = documentSnapshot.ConvertTo<User>();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
                if(user.role == "offeror")
                {
                    int Count = await GetCountGrage(documentSnapshot.Reference);
                    double RatingProm = await GetRatingProm(documentSnapshot.Reference);
                    int CantRecha = await GetCountOfferRefuse(documentSnapshot.Reference);
                    int CantRentals = await GetCountRental(documentSnapshot.Reference);
                    offerors.Add((user,Count,RatingProm,CantRecha, CantRentals));
                } 
            }

            return offerors;
        }

        public async Task<int> GetCountGrage(DocumentReference userId)
        {
           
            QuerySnapshot querySnapshot = await db.Collection("grage").WhereEqualTo("offerorId",userId).GetSnapshotAsync();

            return querySnapshot.Count;
        }
        public async Task<double> GetRatingProm(DocumentReference userId)
        {
            double rating = 0;
            QuerySnapshot querySnapshot = await db.Collection("grage").WhereEqualTo("offerorId", userId).GetSnapshotAsync();

            foreach(DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {
                rating += documentSnapshot.GetValue<double>("rating");
            }

            return rating / querySnapshot.Count;
        }

        public async Task<int> GetCountOfferRefuse(DocumentReference userId)
        {
            int recha = 0;
            QuerySnapshot querySnapshot = await db.Collection("grage").WhereEqualTo("offerorId", userId).GetSnapshotAsync();
            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {
                QuerySnapshot querySnapshot2 = await db.Collection("offer")
                .WhereEqualTo("garageRef", documentSnapshot.Reference)
                .WhereEqualTo("status", 1)
                .GetSnapshotAsync();

                recha += querySnapshot2.Count;
            }
            

            return recha;
        }
        public async Task<int> GetCountRental(DocumentReference userId)
        {
            int rentals = 0;
            QuerySnapshot querySnapshot = await db.Collection("grage").WhereEqualTo("offerorId", userId).GetSnapshotAsync();
            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {
                QuerySnapshot querySnapshot2 = await db.Collection("rental")
                .WhereEqualTo("garageId", documentSnapshot.Reference)
                .GetSnapshotAsync();

                rentals += querySnapshot2.Count;
            }


            return rentals;
        }
    }
}
