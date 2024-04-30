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

                if(user.role == "client")
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

        public async Task<List<User>> NroRentals()
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
    }
}
