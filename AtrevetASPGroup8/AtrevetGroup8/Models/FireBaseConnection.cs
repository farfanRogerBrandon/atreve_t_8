using Google.Cloud.Firestore;

namespace AtrevetGroup8.Models
{
    public class FireBaseConnection
    {

        private string path = "https://firebasestorage.googleapis.com/v0/b/atrevetgroup8.appspot.com/o/atrevetgroup8-firebase-adminsdk-7jk2e-b1568de1ef.json?alt=media&token=1d7f3771-7117-4013-9307-4f2a88c1cd83";
        public static FirestoreDb db = FirestoreDb.Create("atrevetgroup8", new Google.Cloud.Firestore.V1.FirestoreClientBuilder
        {
            JsonCredentials = "{\r\n  \"type\": \"service_account\",\r\n  \"project_id\": \"atrevetgroup8\",\r\n  \"private_key_id\": \"b1568de1ef47bdafd9c1b3dc4e8de952fb1f7e55\",\r\n  \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4yjaoC6F7Hwn6\\n6UaRuF1kecBsIHgAALj1TGLD9vT3TERJvYS9ehNSw1sH4CshPlpVJ7kEkd0ueJat\\njHFu+9xOY7NhKi6XKv+wWZXix2AIHdRIU/R8GXQiuOWrInFJaZel/v7lbOEYAuUC\\nE/wb55JjCj7Xm8OG89rewMNbypXyTaP+XHkoZCSc3oUWwyUHy5ql2PJJPR86R8eN\\nzR65h56xEbGOxwYK1DT44APPEVyFQ6DbdMon3BrWS+mVD/Uqhq+Jtji7i3cGsXaj\\nyw1eR3ADLi58DBh4zWWTJlTBuRVU9NDod5kIFtR2v1+dnAQslzAqUB9gPXmaLklz\\nEPLPzbLHAgMBAAECggEATqL2yWJRsKRPye/VcROE4soRAbJ7fnzQOMrtyLjiHA7f\\njIXS5BL8AB9UMLDLidUP+ebyjChKeIkmjeoTJ4iUguNYpYOe2gOZVYF6EEyJ6EpR\\nWQopI1ptmo0WZ1I75WLC/wfZjuZbj61DqTO5+GH+YJkujvAhL9+8B0j+maRHVRnO\\nD2Iyg961Aq/kjEYQgldl2pE65ayIXN7IO8YeynnS5Rl8XUnQtOjJxzaLfuvGhbxM\\n1exaciI0nkR8vDr4X6+bfWaLa+yvdS8naCi2dyolePX51iMg5hz4yi4zw7JEfinO\\n9lP7n/iv9ursI8XHXDH9J1E/1wwOqwAHbC/8/72w4QKBgQDZpnAZmzalJqinnEbB\\nkb2ANkFhme6MZgOrvrtDjDPp47NVBXBdDtzOJS0ctiMczQQ1BDnM1HUXdgvfaN58\\nSrl9VQk6Ri/2VpHKSxzdL+ix+MXf+UjIqOufZ/3cJkzyWcpdQG9qak+hglc5ldFk\\n6rKUVWhhp4JtgCKv9gtsiRIwUQKBgQDZWYuyx3IPDJE+DUGksb+jJIqxDTv1LAJW\\nn9bbIC05NFHMzPznzOQEmY31fHVv0HR9i6M5xp1DyqVVK28fpVuCcQUSCun2CWLj\\nLiuUhUYI/1VKBWb8kDA2LnjMmSCW91N9tNZnShaLh2Un1RYJnhhnbK4tNcMZn0tF\\nqVgp3w5DlwKBgQCqCV2Ko7gNTiZ0y6J7l2B0ye5KUfgLt6cmhdvG6cGk+D8iLR2b\\nlgDrDCAyThkgZwriYGrHmzPfIFomL8ehUr+XKtgKrsrJqNg9MnFaXBNu9uugDyDN\\noypxXsz1MPbsXzm5oJ1qhaOwiiOa2XC9Zp4dRJxHrpY29eQjlBVYtb2AAQKBgFOd\\nOzzftWVMtGNmviYZq1ubpy9NpA9BivTAMOvDiSJEmmNrSK/0BpQubopOAu+tBeN2\\nYKjNW5rEzq3hM7K87mNUD1tNj4vzOHOlQ2azjqnPcIQ1Z9UpsyJk5lvvXLY3F4t4\\nkjLSMbIjuCqGsx+oDkNbb/Y8hH3K5i46Y4xYHyipAoGBALhGkJ7i5gv55m2ER7YV\\n8qTth99CB9kBYesMlEduiehpJ+uDXnJKM2+ju291eGr0VhkbE01hsnnERx6/s6XI\\niCkHej2nfk+OrxyHYanjGSJv7Xg8CDQFxpwrMQrPQyX7y3vexGDg7rxfbIAq2dvC\\nybMZ5uT6CieKqn/wLkdq0eGR\\n-----END PRIVATE KEY-----\\n\",\r\n  \"client_email\": \"firebase-adminsdk-7jk2e@atrevetgroup8.iam.gserviceaccount.com\",\r\n  \"client_id\": \"110971489698614307936\",\r\n  \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\r\n  \"token_uri\": \"https://oauth2.googleapis.com/token\",\r\n  \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\r\n  \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7jk2e%40atrevetgroup8.iam.gserviceaccount.com\",\r\n  \"universe_domain\": \"googleapis.com\"\r\n}\r\n"
        }.Build());




    }
}
