import { state } from "./playerState";

export class Platform {
    constructor(player, ctx, x, y, width, height){
        this.player = player;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillColor = "green";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
        this.ctx.stroke();
    }

    collosionDetection(){
        if(this.player.velocity.getY()>0){
            if(this.player.checkCollsion(this.x, this.y, this.width, this.height)){
                this.player.setState(state.STANDING);
            }
        }
    }

}