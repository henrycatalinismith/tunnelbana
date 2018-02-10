class Cube {
  constructor(x = 0, y = 0, z = 0) {
    Object.assign(this, { x, y, z });
  }
}

const cube = (x, y, z) => new Cube(x, y, z);

const lerp = (a, b, t) => a + (b - a) * t; // for floats

cube.add = (a, b) => {
  return cube(a.x + b.x, a.y + b.y, a.z + b.z);
}

cube.scale = (c, scale) => {
  return cube(c.x * scale, c.y * scale, c.z * scale);
}

cube.distance = (a, b) => {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z));
};

cube.directions = [
  cube(1, -1, 0), cube(1, 0, -1), cube(0, 1, -1),
  cube(-1, 1, 0), cube(-1, 0, 1), cube(0, -1, 1),
];

cube.direction = direction => cube.directions[direction];

cube.neighbor = (c, direction) => {
  return cube.add(c, cube.direction(direction));
}

cube.neighbors = c => {
  return cube.directions.map(d => {
    return cube.add(c, d);
  });
}

cube.ring = (c, radius) => {
  const results = [];
  let curr = cube.add(c, cube.scale(cube.direction(4), radius));

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < radius; j++) {
      results.push(curr);
      curr = cube.neighbor(curr, i);
    }
  }

  return results;
}

cube.radius = (c, radius) => {
  let results = [c];

  for (let i = 1; i <= radius; i++) {
    results = [ ...results, ...cube.ring(c, i) ];
  }

  return results;
}

cube.lerp = (a, b, t) => cube(
  lerp(a.x, b.x, t),
  lerp(a.y, b.y, t),
  lerp(a.z, b.z, t)
);

cube.line = (a, b) => {
  const n = cube.distance(a, b);
  const results = [];
  for (let i = 0; i <= n; i++) {
    results.push(cube.round(
      cube.lerp(a, b, 1.0 / n * i)
    ))
  }
  return results;
};

cube.round = c => {
  let rx = Math.round(c.x)
  let ry = Math.round(c.y)
  let rz = Math.round(c.z)

  const x_diff = Math.abs(rx - c.x)
  const y_diff = Math.abs(ry - c.y)
  const z_diff = Math.abs(rz - c.z)

  if (x_diff > y_diff && x_diff > z_diff) {
    rx = -ry -rz;
  } else if (y_diff > z_diff) {
    ry = -rx-rz;
  } else {
    rz = -rx-ry;
  }

  return cube(rx, ry, rz);
};

cube.pixels = (c, radius) => {
  const x = 0 - Math.sqrt(3) * radius * ( c.z/2 + c.y )
  const y = 3/2 * radius * c.z;

  return { x, y };
};

cube.sides = (center, radius) => {
  const centerAng = 2 * Math.PI / 6;
  const round = n => Number(n.toFixed(3));
  const deg2rad = degs => Math.PI * degs / 180;
  const offset = 2;
  const startAng = deg2rad(90);
  const points = [];

  for (let i = 0; i < 6; i++) {
    const ang = startAng + (i * centerAng);
    const x = (offset / 2) + center.x + (radius * Math.cos(ang));
    const y = (offset / 1.5) + center.y - (radius * Math.sin(ang));
    points.push([x, y]);
  }

  return points.map(point => point.map(round));
};

export default cube;


