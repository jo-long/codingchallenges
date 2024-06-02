class Star{
    constructor(width, height){
        this.x = this.#randomInt(-width, width);
        this.y = this.#randomInt(-height, height);
        this.z = this.#randomInt(0, width);
        this.wLimit = width;
        this.hLimit = height;
        this.pz = this.z;
    }

    update(speed){
        this.z = this.z - speed;
        if(this.z < 1){
            this.z = this.wLimit;
            this.x = this.#randomInt(-this.wLimit, this.wLimit);
            this.y = this.#randomInt(-this.hLimit, this.hLimit);
            this.pz = this.z;
        }
    }

    show(ctx){
        let sx = (this.x / this.z) * this.wLimit;
        let sy = (this.y / this.z) * this.hLimit;
        let r = (this.z) * (0 - 6) / (this.wLimit - 0) + 6;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        let px = (this.x / this.pz) * this.wLimit;
        let py = (this.y / this.pz) * this.hLimit;

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
        return Math.floor(Math.random() * (max - min)) + min;
    }

    resize(newWidth, newHeight){
        this.x = this.x * (newWidth / this.wLimit);
        this.y = this.y * (newHeight / this.hLimit);
        this.z = this.z * (newWidth / this.wLimit);
        this.pv = this.pz * (newWidth / this.wLimit);
        this.wLimit = newWidth;
        this.hLimit = newHeight;
    }
}