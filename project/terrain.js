let grid = [];

export function setup() {
  grid = [
    [3, 1, 0, 0, 0, 3, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 3, 1, 0, 0, 0],
    [2, 1, 2, 1, 1, 3, 1, 0, 0, 0],
    [0, 1, 1, 1, 3, 3, 1, 0, 0, 0],
    [3, 0, 0, 0, 0, 3, 1, 0, 0, 0],
    [3, 1, 0, 0, 0, 3, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 3, 1, 0, 0, 0],
    [2, 1, 2, 1, 1, 3, 1, 0, 0, 0],
    [0, 1, 1, 1, 3, 3, 1, 0, 0, 0],
    [3, 0, 0, 0, 0, 3, 1, 0, 0, 0],
  ]
}

function height(x, z) {
  return noise(x, z)
}

export function draw() {
  translate(0, -100, 0);
  stroke(0);
  scale(50);
  for (let x = 0; x < 5; x++) {
    for (let z = 0; z < 5; z++) {
      push();
      beginShape();
      vertex(x, height(x, z), z);
      vertex(x + 1, height(x + 1, z), z);
      vertex(x + 1, height(x + 1, z + 1), z + 1);
      vertex(x, height(x, z + 1), z + 1);
      endShape();
      pop();
    }
  }
}