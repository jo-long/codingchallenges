class Blob{
    constructor(x, y){
        this.x = x;
        this.y = y;
        let angle = Math.random() * (2 * Math.PI);
        this.xSpeed = Math.floor(Math.random() * (5 - 2) + 2) * Math.cos(angle); 
        this.ySpeed = Math.floor(Math.random() * (5 - 2) + 2) * Math.sin(angle); 
        this.r = Math.floor(Math.random() * (315 - 270) + 270);
    }

    update(width, height){
        this.x = this.#clamp(0, width, this.xSpeed + this.x);
        this.y = this.#clamp(0, height, this.ySpeed + this.y);
        if(this.x >= width || this.x <= 0) this.xSpeed *= -1;
        if(this.y >= height || this.y <= 0) this.ySpeed *= -1;
    }

    resize(wRatio, hRatio){
        this.x *= wRatio;
        this.y *= hRatio;
    }

    #clamp(min, max, value){
        if(value < min) return min;
        if(value > max) return max;
        return value;
    }
}