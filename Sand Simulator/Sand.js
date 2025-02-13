class Sand extends Particle {
    constructor(color, empty){
        super(color, empty);
        this.maxSpeed = 8;
        this.acceleration = .4;
        this.velocity = 0;
        this.modified = false;
    }

    updateVelocity(){
        let newVelocity = this.velocity + this.acceleration;
        
        if(Math.abs(newVelocity) > this.maxSpeed){
            newVelocity = Math.sign(newVelocity) * this.maxSpeed;
        }

        this.velocity = newVelocity;
    }

    resetVelocity(){
        this.velocity = 0;
    }

    getUpdateCount(){
        const abs = Math.abs(this.velocity);
        const floored = Math.floor(abs);
        const mod = abs - floored;
        return floored + (Math.random() < mod ? 1 : 0);
    }

    update(){
        if(this.maxSpeed === 0){
            this.modified = false;
            return;
        }
        this.updateVelocity();
        this.modified = this.velocity !== 0;
    }
}