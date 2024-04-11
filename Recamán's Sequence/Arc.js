class Arc{
    constructor(start, end, dir){
        this.start = start;
        this.end = end;
        this.dir = dir;
    }

    show(ctx){
        let diameter = Math.abs(this.end - this.start);
        let x = (this.end + this.start) / 2;
        let startAngle = this.dir == 0 ? Math.PI : 0;;
        let endAngle = this.dir == 0 ? 0 : Math.PI;
        ctx.strokeStyle = "white";
        ctx.strokeWeight = 0.5;
        ctx.beginPath();
        ctx.arc(x, 0, diameter / 2, startAngle, endAngle);
        ctx.stroke();
    }
}