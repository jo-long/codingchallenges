class Circle{
    constructor(radius, cx, cy, angle){
        this.radius = radius;
        this.cx = cx;
        this.cy = cy;
        this.angle = angle;
    }

    display(ctx){
        ctx.translate(this.cx, this.cy);
        // ctx.beginPath();
        // ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        // ctx.strokeStyle = "white";
        // ctx.stroke();

        let x = this.radius * Math.cos(this.angle);
        let y = this.radius * Math.sin(this.angle);
        ctx.beginPath();
        ctx.arc(x, y, this.radius, this.angle, this.angle + Math.PI / 2);
        ctx.lineTo(x, y);
        ctx.lineTo(0, 0);
        ctx.fillStyle = `hsl(350, 100%, ${this.scale(Math.abs(this.angle % (2 * Math.PI)), 0, 2 * Math.PI, 0, 100)}%)`;
        ctx.fill();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    move(speed){
        this.angle = (this.angle + speed) % (2 * Math.PI);
        // this.angle += speed;
    }

    scale(num, inMin, inMax, outMin, outMax){
        return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
}