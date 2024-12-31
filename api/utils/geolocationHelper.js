import axios from "axios";

const getLocation = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat,
          lon: lng,
        },
      }
    );
    return data;
  } catch {
    throw new Error("Error fetching location data from Nominatim API");
  }
};
export default getLocation;
