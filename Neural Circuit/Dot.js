class Dot{
    constructor(angle, x, y, split, wLimit, hLimit){
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.split = split;
        this.wLimit = wLimit;
        this.hLimit = hLimit;
        this.stop = false;
        this.v = {x: Math.sin(this.angle) * .5, y: Math.cos(this.angle) * .5};
        this.prev = {x: this.x, y: this.y};
    }

    update(dots){
        if(Math.random() > (.992 - (this.split * .002))){
            if(this.split < 6){
                this.split++;
                dots.push(new Dot(this.angle - (Math.PI / 4), this.x, this.y, this.split, this.wLimit, this.hLimit));
                this.angle += Math.PI / 4;
                this.v.x = Math.sin(this.angle);
                this.v.y = Math.cos(this.angle);
            }else if(this.split === 6){
                this.stop = true;
            }
        }
        this.prev.x = this.x;
        this.prev.y = this.y;
        this.x += this.v.x;
        this.y += this.v.y;
        return dots;
    }

    draw(ctx){
        ctx.lineWidth = (1 - this.split / 7) * 4;
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.split / 7})`;
        ctx.beginPath();
        ctx.moveTo(this.prev.x, this.prev.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }

    isOut(){
        const dist = Math.sqrt(Math.pow(this.x - (this.wLimit / 2), 2) + Math.pow(this.y - (this.hLimit / 2), 2));
        if(dist < this.hLimit * .1 || this.x < 0 || this.x > this.wLimit || this.y < 0 || this.y > this.hLimit) return true;
        return false;

    }
}