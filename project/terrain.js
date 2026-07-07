let terrain;

export function height(x, z) {
  return noise(x, z)
}

export function drawTerrain() {
  if (!terrain) {
    makeTerrain();
  }
  model(terrain);
}

function makeTerrain() {
  beginGeometry();
  stroke(0);
  fill(0, 255, 0);

  for (let x = 0; x < 1000; x++) {
    for (let z = 0; z < 1000; z++) {
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
  terrain = endGeometry();
  terrain.computeNormals();
}