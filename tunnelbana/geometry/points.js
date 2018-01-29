export function add(origin, point) {
  return {
    x: origin.x + point.x,
    y: origin.y + point.y
  };
}

export function angle(origin, point) {
  return Math.atan2(point.y - origin.y, point.x - origin.x);
}

export function distance(origin, point) {
  const a = Math.abs(origin.x - point.x);
  const b = Math.abs(origin.y - point.y);
  return Math.sqrt(Math.abs(a * a + b * b));
}

export function rotate(origin, point, radians) {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const qx = origin.x + cos * (point.x - origin.x) - sin * (point.y - origin.y);
  const qy = origin.y + sin * (point.x - origin.x) + cos * (point.y - origin.y);
  return {
    x: qx,
    y: qy
  };
}
