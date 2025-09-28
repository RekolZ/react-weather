import { useCallback, useState } from "react";
import CloudBackground from "../assets/cloudbackground.png";
import { getImg } from "../../getImg";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../../store/weatherSlice";
import axios from "axios";
import debounce from "lodash.debounce";

export default function WeatherIndication({ weather }) {
  const { city } = useSelector((state) => state.weather);

  const [value, setValue] = useState(city);
  const [isFocused, setIsFocused] = useState(false);
  const [cities, setCities] = useState([]);

  const dispatch = useDispatch();

  const fetchCities = async (value) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=e8c1f053b2f0ced70c7096f12de601c3&lang=ru&country=RU`
      );
      const citiesData = response.data
        .filter((city) => {
          if (city.local_names?.ru) return city.local_names.ru;
        })
        .slice(0, 5);
      setCities(citiesData);
    } catch (error) {
      console.error(error);
    }
  };

  let color;
  const time = new Date().getHours();
  if (time >= 6 && time < 22) color = "rgba(100, 176, 206, 1)";
  else color = "rgb(135, 116, 250)";

  const fetchedCities = useCallback(debounce(fetchCities, 300), []);

  const handleChange = async (e) => {
    const value = e.target.value;
    setValue(value);
    fetchedCities(value);
  };

  return (
    weather && (
      <div className="weather__indication">
        <svg
          className="weather__circle"
          height={600}
          width={600}
          viewBox="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" stroke="#000" strokeWidth="1" />
            <circle cx="50" cy="50" r="35" stroke="#fff" strokeWidth="9" />
            <circle
              cx="50"
              cy="50"
              r="34"
              stroke="#000"
              strokeWidth="1"
              fill={color}
            />
          </svg>
        </svg>
        <img className="cloud__right-side" src={CloudBackground} alt="" />
        <img className="cloud__left-side" src={CloudBackground} alt="" />
        <h1>
          Текущая <br />
          Погода
        </h1>
        <div className="city">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setTimeout(() => {
                setIsFocused(false);
                setValue(city);
              }, 100);
            }}
          />
          {isFocused && (
            <ul>
              {cities.map((city) => {
                return (
                  <li
                    key={city.geonameId}
                    onClick={() => dispatch(setCity(city.local_names.ru))}
                  >
                    {city.local_names.ru}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <img className="weather__img" src={getImg(weather)} alt="" />
        <p>{Math.round(weather.main.temp)}°C</p>
      </div>
    )
  );
}
