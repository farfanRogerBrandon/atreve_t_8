using Google.Cloud.Firestore;

namespace AtrevetGroup8.Models
{
    public class UserImpl : FireBaseConnection
    {
        public async Task<List<User>> GetClient()
        {
            List<User> clients = new List<User>();

            QuerySnapshot querySnapshot = await db.Collection("user").GetSnapshotAsync();

            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents) { 
            
                User user = new User();

                try
                {
                    user = documentSnapshot.ConvertTo<User>();
                }
                catch (Exception)
                {

                    throw;
                }

                if(user.role == "client" && user.state == 1)
                {
                    clients.Add(user);
                }
            
            }


            return clients;
        }


        public async Task<List<User>> TopClient()
        {
            List<User> clients = new List<User>();
            List<User> aux = new List<User>();

            QuerySnapshot querySnapshot = await db.Collection("user").GetSnapshotAsync();

            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {

                User user = new User();

                try
                {
                    user = documentSnapshot.ConvertTo<User>();
                }
                catch (Exception)
                {

                    throw;
                }

                if (user.role == "client")
                {
                    aux.Add(user);
                    var sortedClients = aux.OrderByDescending(c => c.rating).ToList();
                    clients = sortedClients.Take(20).ToList();

                }

            }

            return clients;
        }

        public async Task<List<User>> TopBadClient()
        {
            List<User> clients = new List<User>();
            List<User> aux = new List<User>();

            QuerySnapshot querySnapshot = await db.Collection("user").GetSnapshotAsync();

            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {

                User user = new User();

                try
                {
                    user = documentSnapshot.ConvertTo<User>();
                }
                catch (Exception)
                {

                    throw;
                }

                if (user.role == "client")
                {
                    aux.Add(user);
                    var sortedClients = aux.OrderBy(c => c.rating).ToList();
                    clients = sortedClients.Take(20).ToList();

                }

            }

            return clients;
        }

        public async Task<List<(User, int)>> NroRentals()
        {
            List<(User, int)> clients = new List<(User, int)>();

            QuerySnapshot querySnapshot = await db.Collection("user").GetSnapshotAsync();

            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {
                User user = new User();

                try
                {
                    user = documentSnapshot.ConvertTo<User>();
                }
                catch (Exception)
                {
                    throw;
                }

                if (user.role == "client")
                {
                    QuerySnapshot querySnapshot1 = await db.Collection("rental").WhereEqualTo("clientId", documentSnapshot.Reference).GetSnapshotAsync();
                    int rentalCount = querySnapshot1.Count;
                    clients.Add((user, rentalCount));
                }
            }

            return clients;
        }

        public async Task<List<(User, int)>> NroRejectedOffers()
        {
            List<(User, int)> clients = new List<(User, int)>();

            QuerySnapshot querySnapshot = await db.Collection("user").GetSnapshotAsync();

            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {
                User user = new User();

                try
                {
                    user = documentSnapshot.ConvertTo<User>();
                }
                catch (Exception)
                {
                    throw;
                }

                if (user.role == "client")
                {
                    QuerySnapshot querySnapshot1 = await db.Collection("offer")
                        .WhereEqualTo("user.ci", user.ci)
                        .WhereEqualTo("statusNegociation", 0)
                        .GetSnapshotAsync();
                    
                    int RejectedOffers = querySnapshot1.Count;
                    clients.Add((user,RejectedOffers));
                }
            }

            return clients;
        }

        public async Task<bool> GetRole(string username)
        {
            QuerySnapshot querySnapshot = await db.Collection("user").WhereEqualTo("mail",username).GetSnapshotAsync();

            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {
                User user = new User();
                try
                {
                    user = documentSnapshot.ConvertTo<User>();
                }
                catch (Exception ex)
                {

                }
                if (user.role == "admin")
                {
                    return true;
                }
            }

            return false;
        }

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
                if(user.role == "offeror" && user.state == 1)
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

        public async Task<User> DatosUserEliminando(string userId)
        {

            DocumentReference userRef = db.Collection("user").Document(userId);
            DocumentSnapshot snapshot = await userRef.GetSnapshotAsync();

            if (snapshot.Exists)
            {
                User user = snapshot.ConvertTo<User>();
                if (user.role == "client" || user.role == "offeror")
                {
                    return user;
                }
            }

            return null;
        }

        public async Task DeleteLogicUser(string userId)
        {
            DocumentReference userRef = db.Collection("user").Document(userId);
            DocumentSnapshot snapshot = await userRef.GetSnapshotAsync();

            if (snapshot.Exists)
            {
                User user = snapshot.ConvertTo<User>();

                if (user.role == "client" || user.role == "offeror")
                {
                    user.state = 0;

                    await userRef.SetAsync(user);

                }
            }
        }

    }
}
