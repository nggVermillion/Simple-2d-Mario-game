import {Vector} from "./Vector.js";
import { Point } from "./point.js";
import { Jumping} from "./playerState.js";
import { Running } from "./playerState.js";
import { Standing } from "./playerState.js";

import { Falling } from "./playerState.js";
let input = "RELEASE left";

export class Player {
    y = 950;
    constructor(game){
        this.game = game;
        this.width = 150;
        this.height = 150;
        this.position = new Point(0, 950);
        this.velocity = new Vector(50, 1000);
        this.gravitiy = new Vector(0, -1500);

        this.normalState = document.getElementById("normalPlayer");
        this.states = [new Standing(this), new Jumping(this), new Running(this), new Falling(this)];
        this.currentState = this.states[0];
        /*
        this.currentState = "normal";
        this.normalState = document.getElementById("normalPlayer");
        this.beforeJump = document.getElementById("beforeJumpPlayer");
        this.inAir = document.getElementById("inAirPlayer");
        */
    }

    setState(state){
        if(this.currentState !== this.states[state]){
            this.currentState = this.states[state];
        }
    }


    update(deltaTime){
        this.currentState.handleInput(input);
        //updates velocity but too lazy to change names
        this.currentState.updatePlayerPosition(deltaTime);
        this.position.add(deltaTime*this.velocity.getX(), deltaTime*this.velocity.getY());
    }

    setVelocity(x, y){
        this.velocity.setCoordinates(x, y);
    }

    draw(ctx){
        ctx.drawImage(this.normalState, this.position.getX(), this.position.getY(), this.width, this.height);
    }

    onGround(){
        if(this.position.getY() >= this.game.getFloor() - this.height){
            return true;
        }
        return false;
    }
    checkCollision(x, y, width, height){
        playerLeft = this.position.getX();
        playerRight = this.position.getX() + this.width;
        objectLeft = x;
        objectRight = x+width;
        objectTop = y;
        playerBottom = this.position.getY() + this.height;
        if((playerLeft>=objectLeft && playerRight <= objectRight) && playerBottom <= objectTop){
            return true;
        }
        return false;
    }
}

window.addEventListener("keydown", function(event){
    switch(event.key){
        case "ArrowLeft":
            input = "PRESS left";
            break;
        case "ArrowRight":
            input = "PRESS right";
            break;
        case "ArrowUp":
            input = "PRESS up";
            break;
        case "ArrowDown":
            input = "PRESS down";
            break;
        case "a":
            input = "PRESS left";
            break;
        case "d":
            input = "PRESS right";
            break;
        case "w":
            input = "PRESS up";
            break;
        case "s":
            input = "PRESS down";
            break;
    }
})

window.addEventListener("keyup", function(event){
    switch(event.key){
        case "ArrowLeft":
            input = "RELEASE left";
            break;
        case "ArrowRight":
            input = "RELEASE right";
            break;
        case "ArrowUp":
            input = "RELEASE up";
            break;
        case "ArrowDown":
            input = "RELEASE down";
            break;
        case "a":
            input = "RELEASE left";
            break;
        case "d":
            input = "RELEASE right";
            break;
        case "w":
            input = "RELEASE up";
            break;
        case "s":
            input = "RELEASE down";
            break;
    }
})