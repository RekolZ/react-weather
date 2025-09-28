import { getImg } from "../../../getImg";

export default function WeatherHourlyCard({ time, temp, type, color }) {
  const date = new Date(time).getHours() + ":00";
  return (
    <div style={{ backgroundColor: color }} className="weather__hourly-card">
      <p>{date}</p>
      <img src={getImg(null, type)} alt="" />
      <p>{Math.round(temp)}°C</p>
    </div>
  );
}
