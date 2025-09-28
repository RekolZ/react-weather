export default function WeatherPeriodsCard({ daypart, dayOnClick, color }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="weather__period-card"
      id={daypart.id}
      onClick={() => dayOnClick(daypart.id)}
    >
      <div>
        <h2>{daypart.name}</h2>
      </div>
      <img src={daypart.img} alt="" />
      <p>{Math.round(daypart.tempMax)}°C</p>
      <p>{Math.round(daypart.tempMin)}°C</p>
    </div>
  );
}
