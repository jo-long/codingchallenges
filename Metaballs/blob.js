class Blob{
    constructor(x, y){
        this.x = x;
        this.y = y;
        let angle = Math.random() * (2 * Math.PI);
        this.xSpeed = Math.floor(Math.random() * (5 - 2) + 2) * Math.cos(angle); 
        this.ySpeed = Math.floor(Math.random() * (5 - 2) + 2) * Math.sin(angle); 
        this.r = Math.floor(Math.random() * (140 - 120) + 120);
    }

    update(width, height){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if(this.x > width || this.x < 0) this.xSpeed *= -1;
        if(this.y > height || this.y < 0) this.ySpeed *= -1;
    }
}