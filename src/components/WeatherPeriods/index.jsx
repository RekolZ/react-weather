import WeatherPeriodsCard from "./WeatherPeriodsCard";
import { getImg } from "../../../getImg";
import { useDispatch } from "react-redux";
import { setDay } from "../../../store/weatherSlice";
import { getColor } from "../../../getColor";

export default function WeatherPeriods({ weather }) {
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const dispatch = useDispatch();

  if (weather) {
    const today = new Date(weather.list[0].dt_txt);

    const getTemp = () => {
      let result = [];
      let today = new Date(weather.list[0].dt_txt).getDay();
      let tempMin;
      let tempMax;

      const map = new Map();

      for (let i = 0; i < weather.list.length; i++) {
        // проверка на новый день
        if (today == new Date(weather.list[i].dt_txt).getDay()) {
          let weatherType = weather.list[i].weather[0].main;

          if (map.has(weatherType))
            map.set(weatherType, map.get(weatherType) + 1);
          else map.set(weatherType, 1);

          if (!tempMax || weather.list[i].main.temp_max > tempMax)
            tempMax = weather.list[i].main.temp_max;

          if (!tempMin || weather.list[i].main.temp_min < tempMin)
            tempMin = weather.list[i].main.temp_min;
        } else {
          let type = "";
          let max = 0;

          map.forEach((value, key) => {
            if (max < value) {
              max = value;
              type = key;
            }
          });
          result.push({
            tempMin,
            tempMax,
            weatherType: type,
          });
          map.clear();
          tempMax = undefined;
          tempMin = undefined;
          today = new Date(weather.list[i].dt_txt).getDay();
        }
      }
      return result;
    };

    const dayOnClick = (id) => {
      dispatch(setDay(id));
    };

    const temperature = getTemp();

    return (
      <div className="weather__periods">
        {temperature.map((obj, id) => {
          const avgTemp = (obj.tempMax + obj.tempMin) / 2;
          return (
            <WeatherPeriodsCard
              key={id}
              daypart={{
                id: id + 1,
                name: id == 0 ? "Сегодня" : days[today.getDay() + id],
                tempMin: obj.tempMin,
                tempMax: obj.tempMax,
                img: getImg("", obj.weatherType),
              }}
              dayOnClick={dayOnClick}
              color={getColor(avgTemp)}
            />
          );
        })}
      </div>
    );
  }
}
