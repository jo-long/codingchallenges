class Particle {
    constructor(x, y, xSpeed, ySpeed, xLimit, yLimit){
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed= ySpeed;
        this.xLimit = xLimit;
        this.yLimit = yLimit;
    }

    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.x = this.constrain(this.x, 0, this.xLimit);
        this.y = this.constrain(this.y, 0, this.yLimit);

        this.bounce();


    }

    constrain(num, min, max){
        if(num < min) num = min;
        if(num > max) num = max;
        return num;
    }

    bounce(){
        if(this.x <= 0 || this.x >= this.xLimit) this.xSpeed *= -1;
        if(this.y <= 0 || this.y >= this.yLimit) this.ySpeed *= -1;
    }


}