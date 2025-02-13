class Wave {
    constructor(shift){
        this.shift = shift;
        this.angle = 0;
        this.movement = 0;
        this.period = 2;
    }

    display(r){
        for(let i = 0; i <=360; i += 1){
            let x = scale(i, 0, 360, -r, r);
            let amplitude = r * Math.sqrt(1 - Math.pow(x / r, 2));
            let y = amplitude * Math.sin(((i + this.angle + this.shift * this.movement) * this.period)* (Math.PI / 180));
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
        }
    }

    move(){
        this.angle += 1;
        this.movement = 1 + Math.cos(this.angle * (Math.PI / 180));
    }

    scale(num, inMin, inMax, outMin, outMax){
        return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
}