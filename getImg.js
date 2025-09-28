import Sun from "./src/assets/sun.png";
import Clouds from "./src/assets/clouds.png";
import Snow from "./src/assets/snow.png";
import Fog from "./src/assets/fog.png";
import Rain from "./src/assets/rain.png";
import Thunderstorm from "./src/assets/thunderstorm.png";

export const getImg = (data, weatherType) => {
  const weather = data?.weather?.[0]?.main || weatherType;

  switch (weather) {
    case "Clouds":
      return Clouds;
    case "Snow":
      return Snow;
    case "Drizzle":
    case "Rain":
      return Rain;
    case "Thunderstorm":
      return Thunderstorm;
    case "Mist":
    case "Fog":
      return Fog;
    default:
      return Sun;
  }
};
