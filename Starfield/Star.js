class Star{
    constructor(width, height){
        this.x = this.#randomInt(-width, width);
        this.y = this.#randomInt(-height, height);
        this.z = this.#randomInt(0, width);
        this.pz = this.z;
    }

    update(speed, width, height){
        this.z = this.z - speed;
        if(this.z < 1){
            this.z = width;
            this.x = this.#randomInt(-width, width);
            this.y = this.#randomInt(-height, height);
            this.pz = this.z;
        }
    }

    show(ctx, canvas){
        let sx = (this.x / this.z) * canvas.width;
        let sy = (this.y / this.z) * canvas.height;
        let r = (this.z) * (0 - 6) / (canvas.width - 0) + 6;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        let px = (this.x / this.pz) * canvas.width;
        let py = (this.y / this.pz) * canvas.height;

        this.pz = this.z;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = "white";
        ctx.stroke();

    } 

    #randomInt(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}