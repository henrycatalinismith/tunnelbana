class Cube {
  constructor(x, y, z) {
    Object.assign(this, { x, y, z });
  }
}

const cube = (x, y, z) => new Cube(x, y, z);

cube.add = (a, b) => {
  return cube(a.x + b.x, a.y + b.y, a.z + b.z);
}

cube.scale = (c, scale) => {
  return cube(c.x * scale, c.y * scale, c.z * scale);
}

cube.directions = [
  cube(1, -1, 0), cube(1, 0, -1), cube(0, 1, -1),
  cube(-1, 1, 0), cube(-1, 0, 1), cube(0, -1, 1),
];

cube.direction = direction => cube.directions[direction];

cube.neighbor = (c, direction) => {
  return cube.add(c, cube.direction(direction));
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

export default cube;


