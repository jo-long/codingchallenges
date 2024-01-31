class Circle{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.r = 2;
        this.growing = true;
    }

    grow(){
        if(this.growing){
            this.r += 1;
        }
    }

    show(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    touchingEdge(width, height){
        return (
            this.x + this.r >= 2 * width ||
            this.x - this.r <= width ||
            this.y + this.r >= height ||
            this.y - this.r <= 0
        );
    }
}
