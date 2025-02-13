class Particle {
    constructor(wLimit, hLimit){
        this.wLimit = wLimit;
        this.hLimit = hLimit;
        this.x = Math.random() * wLimit;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * .5;
        this.size = Math.random() * 1.5 + 1;
        this.pixY = Math.floor(this.y);
        this.pixX = Math.floor(this.x);
        this.color;
        this.startTime = Date.now();
        this.lifeSpan = 20;
        this.shouldRespawn = true;
        this.shouldSkip = false;
        this.movementIncrease = 0;
    }

    update(speed, color){ //pixels
        this.pixY = Math.floor(this.y);
        this.pixX = Math.floor(this.x);
        this.speed = speed;//pixels[this.pixY][this.pixX];
        this.color = color;
        const secondsPassed = (Date.now() - this.startTime) / 1000;
        this.shouldRespawn = secondsPassed < this.lifeSpan;
        if(!this.shouldRespawn) this.movementIncrease+=.01;
        let movement = (2.5 - this.speed) + this.velocity;

        this.y += movement + this.movementIncrease;
        if(this.y >= this.hLimit){
            if(this.shouldRespawn){
                this.y = 0;
                this.x = Math.random() * this.wLimit;
            }else{
                this.shouldSkip = true;
            }
        }
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;//"white";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}