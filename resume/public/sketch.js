"use strict";
let light = true;
//Diameter of one particle
let particleSize = 3;
//Total particles
let particleSum = 100;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    particleSum = 25;
}
let bg_col = 255;
//Distance the line gets drawn
let lineMaxDist = 100;
let particles = [];

function setup() {
    var c = createCanvas(windowWidth, windowHeight, P2D);
    c.parent('can')
    stroke(0, 255, 0);
    fill(0, 255, 0);
    for (let i = 0; i < particleSum; i++) {
        particles.push(new Particle());
    }

}

function draw() {
    background(bg_col);
    //Move and display particles
    particles.forEach(particle => {
        particle.move();
        particle.connect();
        particle.display();
    });
    addDom();
}

class Particle {
    constructor() {
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);
        this.xSpeed = Math.random() * 0.7;
        this.ySpeed = Math.random() * 0.7;
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x <= 0) this.xSpeed *= -1;
        if (this.x > width) this.xSpeed *= -1;
        if (this.y <= 0) this.ySpeed *= -1;
        if (this.y > height) this.ySpeed *= -1;
    }

    connect() {
        particles.forEach(particle => {
            let distance = dist(this.x, this.y, particle.x, particle.y);
            if (distance < lineMaxDist) {

                stroke(color(0, 255, 0, map(distance, 0, lineMaxDist, 255, 0)));
                strokeWeight(map(distance, 0, lineMaxDist, 2, 0));
                line(this.x, this.y, particle.x, particle.y);
            }
        })
    }

    display() {
        noStroke();
        ellipse(this.x, this.y, particleSize)
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function addDom() {
    let canvas = document.getElementsByTagName("canvas")[0]
    canvas.style.position = "fixed"
    canvas.style.margin = "0"
    canvas.style.padding = "0"
    canvas.style.top = "0";
    canvas.style.left = "0";
}


function changemode() {
    if (light) {
        darkmode()
    }
    if (!light) {
        lightmode()
    }
    light = !light;
}



function darkmode() {
    bg_col = 0;
    document.body.style.color = "#ffffff"
}

function lightmode() {
    bg_col = 255;
    document.body.style.color = "#000000"
}