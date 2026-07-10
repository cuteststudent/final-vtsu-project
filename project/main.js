import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";
import { drawTerrain, height as terrainHeight } from "./terrain.js";

let position = vector(0, 400, 0);;
let velocity = vector(5, 0, 0);;
let moveForward = 0.5;;
let rot = vector(0, 0, 0);;
let crashed = false;;
let n = 0;
let swoosh;
let wind;
let vol;

reset();

export function preload() {
    soundFormats('mp3')
    swoosh = loadSound('swoosh.mp3')
    swoosh.playMode("untilDone")
    wind = loadSound('wind.mp3')
    wind.setLoop(true);
    wind.playMode("untilDone")
};

let font;

export function setup() {
    directionalLight(255, 255, 255, 1, 1, -1);
    font = loadFont("https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf");
}

function reset() {
    position = vector(0, 400, 0);
    velocity = vector(5, 0, 0);
    moveForward = 0.5;
    rot = vector(0, 0, 0);
    crashed = false;
}





function plane() {
    push();
    rotateY(-90);
    fill(255, 255, 255)
    stroke(0, 0, 0);
    strokeWeight(2.5);

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



export function draw(t, dt) {
    orbitControl();

    getAudioContext().resume()
    wind.setVolume(velocity.mag() / 10);
    wind.play();


    //lighting
    {
        background(30, 30, 30); //Clear the background to dark grey 
        // orbitControl(); //Enable mouse movement in the scene
        ambientLight(180, 180, 180);  //Add some ambient light to the scene
    }

    camera(0, -120, 500);
    scale(0.25, 0.25, 0.25);

    push();

    if (!crashed) {
        moveForward = moveForward * .999;

        if (keyIsDown(32) && moveForward <= 1.9) {
            getAudioContext().resume()
            swoosh.play();
            moveForward = moveForward + 3
        }


        //Control & physics

        velocity.x = moveForward * sin(rot.y) * 5

        velocity.z = moveForward * cos(rot.y) * 5

        position.x += velocity.x

        position.z -= velocity.z

        rot.y += ((map(keyIsDown(68), 0, 1, 0, 1) - map(keyIsDown(65), 0, 1, 0, 1)) * 2)

        // position.y -= ((map(keyIsDown(83), 0, 1, 0, 1) - map(keyIsDown(87), 0, 1, 0, 1)) * 2)

        position.y += velocity.y

        velocity.y = tan(rot.x) * moveForward * 5



        // pitch

        rot.x += (map(keyIsDown(87), 0, 1, 0, 1) - map(keyIsDown(83), 0, 1, 0, 1))


        moveForward -= sin(rot.x) * 0.05


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
        if (-position.y > terrainHeight(position.x * 1000, position.z * 1000) / 50) {
            console.log("you crashed");
            crashed = true;
        }

    } else {
        //Crashed!

        //Check for reset
        if (keyIsDown(82)) {
            reset();
        }
    }

    plane();
    pop();

    //aim the camera based on input
    rotateX(rot.x);
    rotateY(rot.y);


    //Draw Terrain
    push();
    scale(10);
    translate(-position.x - 2500, position.y, -position.z - 2500);
    scale(50);
    drawTerrain();
    scale(2);
    translate(0, -50, 0);
    noStroke();
    fill(64, 64, 64);
    translate(15, 49, 15);
    scale(0.01);
    stroke(5);
    noStroke();
    torus(100, 25, 50, 50);
    pop();

    if (crashed) {
        //Print crashed
        resetMatrix();
        push();
        translate(-300, -300, 260);
        scale(.5)
        textFont(font);
        textSize(36);
        text("you crashed", 500, 500, 500, 800);
        pop();

    }
}