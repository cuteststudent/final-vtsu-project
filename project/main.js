import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

//We can use this to load textures or sounds
export function preload() {

}

//Called once when program loads
export function setup() {
}

let position = vector(0, 0, 0);

// let move = vector(0, 0, 0);

let moveForward = 0.5;

let rotY = 0;

function plane() {
    push();
    rotateY(-90);
    fill(255, 255, 255)
    stroke(0, 0, 0);
    strokeWeight(10);

    //plane
    beginShape();
    vertex(1000, -200, 30);
    vertex(0, -200, 0);
    vertex(970, -20, 0);
    endShape();

    beginShape();
    vertex(1000, -200, -30);
    vertex(0, -200, 0);
    vertex(970, -20, 0);
    endShape();

    beginShape();
    vertex(1000, -180, 210);
    vertex(0, -200, 0);
    vertex(1000, -200, 30);
    endShape();

    beginShape();
    vertex(1000, -180, -210);
    vertex(0, -200, 0);
    vertex(1000, -200, -30);
    endShape();

    pop();
}


//Called every frame
export function draw(t, dt) {

    //lighting
    {
        background(30, 30, 30); //Clear the background to dark grey 
        orbitControl(); //Enable mouse movement in the scene
        ambientLight(80, 80, 80);  //Add some ambient light to the scene

        directionalLight(255, 255, 255, 1, 1, -1); //Add a white directional light

    }

    camera(0, -120, 500);
    scale(0.25, 0.25, 0.25);

    push();

    position.x += moveForward * sin(rotY) * 5;

    position.z -= moveForward * cos(rotY) * 5

    rotY += ((map(keyIsDown(68), 0, 1, 0, 1) - map(keyIsDown(65), 0, 1, 0, 1)) * 2)

    position.y -= ((map(keyIsDown(83), 0, 1, 0, 1) - map(keyIsDown(87), 0, 1, 0, 1)) * 2)



    if (keyIsDown(68) && !keyIsDown(65)) {
        rotateZ(25);
    }
    if (keyIsDown(65) && !keyIsDown(68)) {
        rotateZ(-25);
    }

    plane();

    pop();

    push();


    scale(10);

    rotateX(((map(keyIsDown(83), 0, 1, 0, 1) - map(keyIsDown(87), 0, 1, 0, 1)) * -15))


    rotateY(rotY);

    translate(-position.x, position.y, -position.z);

    drawGrid();

    pop();
    drawAxes();
}
