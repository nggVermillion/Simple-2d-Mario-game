import {Player} from "./player.js";
import { Platform } from "./platform.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("body");
    const ctx = canvas.getContext("2d");
    ctx.width = 1600;
    ctx.height = 1200;
    function getCurrentTime(){
        const time = new Date();
        return time.getTime();
    }
    let previousTime = 0;
    let currentTime = getCurrentTime();
    let deltaTime = 0;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.platform = new Platform(this.player, ctx, this.width/5, 780, 400, 100);
            this.floor = 1100;
        }

        update(){
        }

        getFloor(){
            return this.floor;
        }

        draw(ctx){
            drawFloor();
            drawHill();
            drawCloud();
            drawBrush();
            drawSmallHill();
            this.platform.draw();
            this.platform.collosionDetection();

            this.player.update(deltaTime);

            this.player.draw(ctx);
        }

    }

    const game = new Game(ctx.width, ctx.height);

    function animate(){
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        previousTime = currentTime;
        currentTime = getCurrentTime();

        deltaTime = (currentTime - previousTime)/1000;

        if(deltaTime>0.15){
            deltaTime = 0.15;
        }
        game.draw(ctx);


        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("keydown", function(event) {
        if (event.code === "Space" || event.key === " ") {
          //
        }
      });

    this.window.addEventListener("keyup", function(event){
        if (event.code === "Space" || event.key === " ") {
            
        }
    })

})

let canvas;
let ctx;

function init(){
    canvas = document.getElementById("body");
    ctx = canvas.getContext("2d");
    drawFloor();
    drawHill();
    drawCloud();
    drawBrush();
    drawSmallHill();
}

function drawFloor(){
    ctx.fillStyle = "RGB(175, 96, 26)";

    // Draw the rectangle
    ctx.fillRect(0, 1100, 1600, 100);
  
}

function drawHill(){
    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(10, 1100);
    ctx.lineTo(150, 950);
    ctx.bezierCurveTo(150, 950, 200, 900, 250, 950);
    ctx.lineTo(390, 1100);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 0;
    ctx.stroke();
}

function drawSmallHill(){
    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(600, 1100);
    ctx.lineTo(700, 1020);
    ctx.bezierCurveTo(700, 1020, 750, 980, 800, 1020);
    ctx.lineTo(900, 1100);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawCloud(){
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(220, 200);
    ctx.bezierCurveTo(220, 200, 210, 120, 280, 150)
    ctx.bezierCurveTo(280, 150, 330, 120, 340, 170);
    ctx.bezierCurveTo(340, 170, 340, 220, 300, 220);
    ctx.bezierCurveTo(300, 220, 230, 260, 220, 200);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawBrush(){
    
}



document.addEventListener("DOMContentLoaded", init);