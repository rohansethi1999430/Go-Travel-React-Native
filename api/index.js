import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: '48.0243592626943',
          tr_latitude: '48.05145535403229',
          bl_longitude: '7.241254022597957',
          tr_longitude: '7.351885672111982',
          limit: "300",
          currency: "EUR",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key": "6c35fb0e6fmsh4d5410cf8166781p175615jsn0fb9f6a167de",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    console.log(data);

    return data;
  } catch (error) {
    return null;
  }
};