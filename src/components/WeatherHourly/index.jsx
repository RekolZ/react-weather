import { useEffect, useState } from "react";
import WeatherHourlyCard from "./WeatherHourlyCard";
import { useSelector } from "react-redux";
import { getColor } from "../../../getColor";

export default function WeatherHourly({ weather }) {
  const [weatherData, setWeatherData] = useState();
  const [currentWeather, setCurrentWeather] = useState([]);

  const { currentDay } = useSelector((state) => state.weather);

  const weatherArray = () => {
    if (weather) {
      let currentDate = new Date(weather.list[0].dt_txt).getDay();
      const result = [];
      let array = [];
      for (let i = 0; i < weather.list.length; i++) {
        if (currentDate != new Date(weather.list[i].dt_txt).getDay()) {
          currentDate = new Date(weather.list[i].dt_txt).getDay();
          result.push(array);
          array = [];
        }
        array.push({
          time: weather.list[i].dt_txt,
          temp: weather.list[i].main.temp,
          type: weather.list[i].weather[0].main,
        });
      }
      setWeatherData(result);
    }
  };

  const todayWeather = () => {
    const result = [];
    for (let i = 0; i < weatherData[currentDay].length; i++) {
      const time = weatherData[currentDay][i].time;
      const temp = weatherData[currentDay][i].temp;
      const type = weatherData[currentDay][i].type;
      result.push({ time, temp, type });
    }

    setCurrentWeather(result);
  };

  useEffect(() => {
    weatherArray();
  }, [weather]);

  useEffect(() => {
    if (weatherData) todayWeather();
  }, [weatherData, currentDay]);

  return (
    <div className="weather__hourly">
      {currentWeather.map(({ time, temp, type }, i) => {
        return (
          <WeatherHourlyCard
            time={time}
            temp={temp}
            type={type}
            key={i}
            color={getColor(temp)}
          />
        );
      })}
    </div>
  );
}
