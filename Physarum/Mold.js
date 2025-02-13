class Mold{
    constructor(wLimit, hLimit){
        this.wLimit = wLimit;
        this.hLimit = hLimit;
        this.x = this.#randomInt(0, wLimit + 1);
        this.y = this.#randomInt(0, hLimit + 1);
        this.r = 1;
        this.heading = this.#randomInt(0, 361) * (Math.PI / 180);
        this.vx = Math.cos(this.heading);
        this.vy = Math.sin(this.heading);
        this.rotAngle = Math.PI/4;

        this.rSensorPos = {x: 0, y: 0};
        this.lSensorPos = {x: 0, y: 0};
        this.fSensorPos = {x: 0, y: 0};
        this.sensorAngle = Math.PI / 4;
        this.sensorDist = 10;
    }

    update(width, pixels){
        this.vx = Math.cos(this.heading);
        this.vy = Math.sin(this.heading);

        this.x = (this.x + this.vx + this.wLimit) % this.wLimit;
        this.y = (this.y + this.vy + this.hLimit) % this.hLimit;

        this.setSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
        this.setSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
        this.setSensorPos(this.fSensorPos, this.heading);

        // this.rSensorPos.x = this.x + this.sensorDist * Math.cos(this.heading + this.sensorAngle);
        // this.rSensorPos.y = this.y + this.sensorDist * Math.sin(this.heading + this.sensorAngle);

        // this.lSensorPos.x = this.x + this.sensorDist * Math.cos(this.heading - this.sensorAngle);
        // this.lSensorPos.y = this.y + this.sensorDist * Math.sin(this.heading - this.sensorAngle);

        // this.fSensorPos.x = this.x + this.sensorDist * Math.cos(this.heading);
        // this.fSensorPos.y = this.y + this.sensorDist * Math.sin(this.heading);

        let index = (Math.floor(this.rSensorPos.x) + Math.floor(this.rSensorPos.y) * width) * 4;
        let r = pixels[index];

        index = (Math.floor(this.lSensorPos.x) + Math.floor(this.lSensorPos.y) * width) * 4;
        let l = pixels[index];

        index = (Math.floor(this.fSensorPos.x) + Math.floor(this.fSensorPos.y) * width) * 4;
        let f = pixels[index];

        if(f > l && f > r){
            this.heading += 0;
        }else if(f < l && f < r){
            if(Math.random() < .5){
                this.heading += this.rotAngle;
            }else{
                this.heading -= this.rotAngle;
            }
        }else if(l > r){
            this.heading += -this.rotAngle;
        }else if(r > l){
            this.heading += this.rotAngle;
        }
    }

    display(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    setSensorPos(sensor, angle){
        sensor.x = (this.x + this.sensorDist * Math.cos(angle) + this.wLimit) % this.wLimit;
        sensor.y = (this.y + this.sensorDist * Math.sin(angle) + this.hLimit) % this.hLimit;
    }

    #randomInt(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}