class Line{
    constructor(x, y, angle, length){
        this.startX = x;
        this.startY = y;
        this.currentX = x;
        this.currentY = y;
        this.prevX = x;
        this.prevY = y;
        this.angle = angle;
        this.length = length;
        this.currentLength = 0;
        this.speed = 5;
        this.children = [null, null, null];
        this.color = this.randomColor();
    }

    step(){
        if(this.length < 10) return false;

        this.currentLength = Math.sqrt(Math.pow(this.startX - this.currentX, 2) + Math.pow(this.startY - this.currentY, 2));
        if(this.currentLength >= this.length) return false;

        if(this.children[0] == null && this.currentLength >= this.length * .25){
            this.children[0] = new Line(this.currentX, this.currentY, this.angle - Math.PI / 4, this.length * .25);
        }

        if(this.children[1] == null && this.currentLength >= this.length * .5){
            this.children[1] = new Line(this.currentX, this.currentY, this.angle - Math.PI / 4, this.length * .5);
        }

        if(this.children[2] == null && this.currentLength >= this.length * .75){
            this.children[2] = new Line(this.currentX, this.currentY, this.angle - Math.PI / 4, this.length * .75);
        }

        this.prevX = this.currentX;
        this.prevY = this.currentY;

        this.currentX = this.currentX + (Math.cos(this.angle) * this.speed);
        this.currentY = this.currentY + (Math.sin(this.angle) * this.speed);
        return true;
    }

    randomColor(){
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
      
        return `rgb(${red}, ${green}, ${blue})`; 
    }
}