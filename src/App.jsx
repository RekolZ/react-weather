import { useEffect, useState } from "react";

import "./App.scss";
import WeatherIndication from "./components/WeatherIndication";
import WeatherPeriods from "./components/WeatherPeriods";
import WeatherHourly from "./components/WeatherHourly";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/weatherSlice";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const { hourlyWeatherData, currentWeatherData, city, loading, error } =
    useSelector((state) => state.weather);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [city]);

  useEffect(() => {
    setBackground();
  }, [backgroundColor]);

  const setBackground = () => {
    const hours = new Date().getHours();
    let color = "rgb(96, 79, 158)"; // по умолчанию (ночь)
    if (hours >= 6 && hours < 18) color = "rgb(123, 200, 241)"; // день
    else if (hours >= 18 && hours < 21) color = "rgb(150, 130, 238)"; // вечер

    setBackgroundColor(color);
    document.body.style.backgroundColor = color;
  };

  if (loading) {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          width="300"
          height="850"
        >
          <g>
            <circle
              className="loading"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="50.26548245743669 50.26548245743669"
              stroke="#ffffff"
              strokeWidth="8"
              r="32"
              cy="50"
              cx="50"
            >
              <animateTransform
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                type="rotate"
                attributeName="transform"
              />
            </circle>
            <g />
          </g>
        </svg>
      </>
    );
  }

  if (error) {
    return <div>Ошибочка вышла. ты чево наделал</div>;
  }

  return (
    <>
      <WeatherIndication weather={currentWeatherData} color={backgroundColor} />
      <WeatherPeriods weather={hourlyWeatherData} />
      <WeatherHourly weather={hourlyWeatherData} />
    </>
  );
}

export default App;
