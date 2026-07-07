import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";
import { drawTerrain, height as terrainHeight } from "./terrain.js";

//We can use this to load textures or sounds
export function preload() {

}

let font;

export function setup() {
    directionalLight(255, 255, 255, 1, 1, -1);
    font = loadFont("https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf");
}

let position = vector(0, 0, 0);

let moveForward = 0.5;

let rotY = 0;

let crashed = false;

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
    }

    camera(0, -120, 500);
    scale(0.25, 0.25, 0.25);

    push();

    if (!crashed) {
        moveForward = moveForward * .999;

        if (keyIsDown(32) && moveForward <= 0.9) {
            moveForward = moveForward + 1.5
        }

        //Control & physics
        position.x += moveForward * sin(rotY) * 5;

        position.z -= moveForward * cos(rotY) * 5

        rotY += ((map(keyIsDown(68), 0, 1, 0, 1) - map(keyIsDown(65), 0, 1, 0, 1)) * 2)

        position.y -= ((map(keyIsDown(83), 0, 1, 0, 1) - map(keyIsDown(87), 0, 1, 0, 1)) * 2)

        //Yaw Effect
        {
            if (keyIsDown(68) && !keyIsDown(65)) {
                rotateZ(25);
            }
            if (keyIsDown(65) && !keyIsDown(68)) {
                rotateZ(-25);
            }
        }

        //Detect Crash
        if (-position.y > terrainHeight(position.x / 50, position.z / 50) / 50) {
            console.log("you crashed");
            crashed = true;
        }

    } else {
        //Crashed!

        //Print crashed
        push();
        translate(-600, -800, 1500);
        textFont(font);
        textSize(36);
        text("you crashed", 500, 500, 500, 800);
        pop();

        //Check for reset
        if (keyIsDown(82)) {
            position = vector(0, 0, 0);
            crashed = false;
        }
    }

    plane();
    pop();

    //aim the camera based on input
    if (!crashed) {
        rotateX(((map(keyIsDown(83), 0, 1, 0, 1) - map(keyIsDown(87), 0, 1, 0, 1)) * -15))
        rotateY(rotY);
    }


    //Draw Terrain
    push();
    scale(10);
    translate(-position.x - 2500, position.y, -position.z - 2500);
    scale(50);
    drawTerrain();
    pop();
}