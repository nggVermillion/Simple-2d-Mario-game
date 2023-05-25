const state = {
    STANDING: 0,
    RUNNING: 2,
    JUMPING: 1,
    CROUCH: 4,
    FALLING: 3,
}


function getState(input){
    if(input === "PRESS up"){
        return state.JUMPING;
    }else if(input === "PRESS down"){
        return "CROUCH"
    }else if(input === "PRESS left"){
        return state.RUNNING;
    }else if(input === "PRESS right"){
        return state.RUNNING;
    }else if(input === "RELEASE left"){
        return state.STANDING;
    }else if(input === "RELEASE right"){
        return state.STANDING;
    }else if(input === "RELEASE up"){
        return state.STANDING
    }else if(input === "RELEASE down"){
        return state.STANDING;
    }
}

class State {
    constructor(state){
        this.state = state;
        this.runningDirection = "";
    }
}

export class Standing extends State{
    constructor(player){
        super("STANDING");
        this.player = player;
    }

    handleInput(input){
        this.player.setState(getState(input));
    }
    
    updatePlayerPosition(deltaTime){
        this.player.setVelocity(0, 0);
        return;
    }
}

export class Running extends State{
    constructor(player){
        super("RUNNING");
        this.player = player;
        this.jumpState = "up";
        this.runningDirection = "";
    }

    handleInput(input){
        if(input === "PRESS left"){
            this.runningDirection = "left";
        }else if(input === "PRESS right"){
            this.runningDirection = "right";
        }else{
            this.player.setState(getState(input));
        }
    }

    updatePlayerPosition(deltaTime){
        if(this.runningDirection ===  "right"){
            this.player.setVelocity(500, 0);
            this.player.position.add(deltaTime*this.player.velocity.getX(), 0);
        }else if(this.runningDirection === "left"){
            this.player.setVelocity(-500, 0);
            this.player.position.add((deltaTime*this.player.velocity.getX()), 0);
        }
    }
}

export class Jumping extends State{
    constructor(player){
        super("JUMPING");
        this.player = player;
    }

    handleInput(input){
        if(this.player.velocity.getY()>= 0){
            this.player.setState(state.FALLING);
        }
    }
    

    updatePlayerPosition(deltaTime){
        if(this.player.velocity.getY() === 0){
            if(this.player.velocity.getX() === 0){
                this.player.setVelocity(this.player.velocity.getX(), -1000);
            }else{
                this.player.setVelocity(this.player.velocity.getX(), -1000);
            }
        }else{
            
            this.player.setVelocity(this.player.velocity.getX() + deltaTime*this.player.gravitiy.getX(), this.player.velocity.getY() + (-1)*(deltaTime*this.player.gravitiy.getY()));
        }
    }

}

export class Falling extends State{
    constructor(player){
        super("FALLING");
        this.player = player;
    }

    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(state.STANDING);
        }
    }

    updatePlayerPosition(deltaTime){
        this.player.setVelocity(this.player.velocity.getX() + deltaTime*this.player.gravitiy.getX(), this.player.velocity.getY() + (-1)*(deltaTime*this.player.gravitiy.getY()));
    }
}