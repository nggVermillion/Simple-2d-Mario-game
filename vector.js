export class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    add(x, y){
        this.x += x;
        this.y += y;
    }

    substract(x, y){
        this.x += x;
        this.y += y;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setCoordinates(x, y){
        this.x = x;
        this.y = y;
    }
}