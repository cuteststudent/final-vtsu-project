let terrain;

export function height(x, z) {
  return noise(x / 10, z / 10) * 10
}

export function drawTerrain() {
  if (!terrain) {
    makeTerrain();
  }
  model(terrain);
  // fill(0, 0, 255);
  // box(100, 1, 100);
}

function makeTerrain() {
  beginGeometry();
  stroke(0);
  fill(0, 255, 0);

  for (let x = 0; x < 100; x++) {
    for (let z = 0; z < 100; z++) {
      push();
      beginShape();
      vertex(x, height(x, z), z);
      vertex(x + 1, height(x + 1, z), z);
      vertex(x + 1, height(x + 1, z + 1), z + 1);
      vertex(x, height(x, z + 1), z + 1);
      endShape();
      pop();

      push();
      noStroke();
      fill(0, 0, 255);
      beginShape();
      vertex(x, 6.15, z);
      vertex(x + 1, 6.15, z);
      vertex(x + 1, 6.15, z + 1);
      vertex(x, 6.15, z + 1);
      endShape();
      pop();

    }
  }
  terrain = endGeometry();
  terrain.computeNormals();
}