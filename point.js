export class Point{
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

    setX(x){
        this.x = x;
    }
}