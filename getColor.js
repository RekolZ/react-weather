export const getColor = (temp) => {
  const normaliseTemp = (temp, min, max) => {
    return (temp - min) / (max - min);
  };

  const normalized = normaliseTemp(temp, -20, 25);

  let r, g, b;
  if (normalized <= 0.5) {
    // Переход от голубого к мятному
    r = Math.round(160 * (1 - normalized * 2) + 170 * normalized * 2);
    g = Math.round(190 * (1 - normalized * 2) + 230 * normalized * 2);
    b = Math.round(255 * (1 - normalized * 2) + 200 * normalized * 2);
  } else {
    // Переход от мятного к желтому
    r = Math.round(
      170 * (1 - (normalized - 0.5) * 2) + 220 * (normalized - 0.5) * 2
    );
    g = Math.round(
      230 * (1 - (normalized - 0.5) * 2) + 200 * (normalized - 0.5) * 2
    );
    b = Math.round(
      200 * (1 - (normalized - 0.5) * 2) + 60 * (normalized - 0.5) * 2
    );
  }
  const color = `rgb(${r}, ${g}, ${b}, 1)`;
  return color;
};
