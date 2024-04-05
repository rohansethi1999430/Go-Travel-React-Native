import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bl_lat ? bl_lat : '48.0243592626943',
          tr_latitude: tr_lat ? tr_lat : '48.05145535403229',
          bl_longitude: bl_lng ? bl_lng : '7.241254022597957',
          tr_longitude: tr_lng ? tr_lng : '7.351885672111982',
          limit: "300",
          currency: "EUR",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key": "927edf75fbmsh12d55e0b28bb208p11a093jsnbadc5ed39c60",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

//    console.log(data);

    return data;
  } catch (error) {
    return null;
  }
};