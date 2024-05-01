using Google.Cloud.Firestore;

namespace AtrevetGroup8.Models
{
    public class GarageImpl : FireBaseConnection
    {
        public async Task<List<Grage>> GetGarage()
        {
            List<Grage> Garages = new List<Grage>();

            QuerySnapshot querySnapshot = await db.Collection("grage").GetSnapshotAsync();

            foreach (DocumentSnapshot documentSnapshot in querySnapshot.Documents)
            {
                Dictionary<string, object> data = documentSnapshot.ToDictionary();

                // Crea un nuevo objeto Garage y asigna los datos directamente
                Grage garage = new Grage
                {
                    Address = data.ContainsKey("address") && data["address"] is string ? (string)data["address"] : null,
                    Availability = data.ContainsKey("avialability") && data["avialability"] is string ? (string)data["avialability"] : null,
                    Cost = data.ContainsKey("cost") && data["cost"] is long ? (int)(long)data["cost"] : 0,
                    Description = data.ContainsKey("description") && data["description"] is string ? (string)data["description"] : null,
                    Height = data.ContainsKey("height") && data["height"] is long ? (int)(long)data["height"] : 0,
                    Length = data.ContainsKey("length") && int.TryParse(data["length"].ToString(), out int lengthValue) ? lengthValue : 0,
                    OfferorId = data.ContainsKey("offerorId") && data["offerorId"] is string ? (string)data["offerorId"] : null,
                    Rating = data.ContainsKey("rating") && data["rating"] is double ? (double)data["rating"] : 0.0,
                    Spaces = data.ContainsKey("spaces") && int.TryParse(data["spaces"].ToString(), out int spacesValue) ? spacesValue : 0,
                    Width = data.ContainsKey("width") && data["width"] is string ? int.Parse((string)data["width"]) : 0,
                    Location = data.ContainsKey("location") && data["location"] != null ? ConvertToLocation(data["location"]) : null,
                    TimeTable = data.ContainsKey("timeTable") ? ConvertToTimeTable(data["timeTable"]) : null
                    // Asigna otros campos de manera similar...
                };



                try
                {
                    Garages.Add(garage);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }                

            }

            return Garages;
        }

        private List<TimeTableEntry> ConvertToTimeTable(object timeTableData)
        {
            if (timeTableData is IList<object> timeTableList)
            {
                List<TimeTableEntry> timeTableEntries = new List<TimeTableEntry>();

                foreach (object entry in timeTableList)
                {
                    if (entry is IDictionary<string, object> entryDict)
                    {
                        TimeTableEntry timeTableEntry = new TimeTableEntry
                        {
                            Day = entryDict.ContainsKey("day") ? (string)entryDict["day"] : null,
                            Periods = entryDict.ContainsKey("periods") ? ConvertToPeriods(entryDict["periods"]) : null
                        };

                        timeTableEntries.Add(timeTableEntry);
                    }
                    else
                    {
                        throw new ArgumentException("Cada entrada en timeTableData debe ser un diccionario.");
                    }
                }

                return timeTableEntries;
            }
            else
            {
                throw new ArgumentException("timeTableData no es una lista válida.");
            }
        }

        private List<Period> ConvertToPeriods(object periodsData)
        {
            if (periodsData is IList<object> periodsList)
            {
                List<Period> periods = new List<Period>();

                foreach (object periodData in periodsList)
                {
                    if (periodData is IDictionary<string, object> periodDict)
                    {
                        int startHour = 0;
                        int endHour = 0;

                        foreach (var kvp in periodDict)
                        {
                            if (kvp.Key == "startHour")
                            {
                                startHour = Convert.ToInt32(kvp.Value);
                            }
                            else if (kvp.Key == "endHour")
                            {
                                endHour = Convert.ToInt32(kvp.Value);
                            }
                        }
                        Period period = new Period
                        {
                            StartHour = startHour,
                            EndHour = endHour
                        };

                        periods.Add(period);
                    }
                    else
                    {
                        throw new ArgumentException("Cada periodo en periodsData debe ser un diccionario.");
                    }
                }


                return periods;
            }
            else
            {
                throw new ArgumentException("periodsData no es una lista válida.");
            }
        }


        private Location ConvertToLocation(object locationData)
        {
            if (locationData is GeoPoint geoPoint)
            {
                // Si locationData es un GeoPoint, lo conviertes a Location
                return new Location
                {
                    Latitude = geoPoint.Latitude,
                    Longitude = geoPoint.Longitude
                };
            }
            else if (locationData is IDictionary<string, object> locationDict)
            {
                // Si locationData es un diccionario, lo conviertes a Location
                double latitude = 0.0;
                double longitude = 0.0;

                if (locationDict.ContainsKey("Latitude") && locationDict["Latitude"] is double)
                {
                    latitude = (double)locationDict["Latitude"];
                }

                if (locationDict.ContainsKey("Longitude") && locationDict["Longitude"] is double)
                {
                    longitude = (double)locationDict["Longitude"];
                }

                return new Location
                {
                    Latitude = latitude,
                    Longitude = longitude
                };
            }
            else
            {
                throw new ArgumentException("locationData no es un formato válido para Location.");
            }
        }


    }
}
