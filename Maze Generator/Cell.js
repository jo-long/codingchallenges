class Cell{
    constructor(col, row){
        this.col = col;
        this.row = row;
        this.walls = {top: true, right: true, bottom: true, left: true};
        this.visited = false;
        this.inPath = false;
    }

    show(ctx, w, h){
        let x = this.col * w;
        let y = this.row * h;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";

        if(this.walls.top){
            ctx.moveTo(x, y);
            ctx.lineTo(x + w, y);
        }

        if(this.walls.right){
            ctx.moveTo(x + w, y);
            ctx.lineTo(x + w, y + h);
        }

        if(this.walls.bottom){
            ctx.moveTo(x + w, y + h);
            ctx.lineTo(x, y + h);
        }

        if(this.walls.left){
            ctx.moveTo(x, y + h);
            ctx.lineTo(x, y);
        }

        ctx.stroke();

        if(this.inPath){
            ctx.beginPath();
            ctx.fillStyle = "hsl(277, 50%, 27%)";
            ctx.fillRect(x, y, w, h);
        }else if(this.visited){
            ctx.beginPath();
            ctx.fillStyle = "purple";
            ctx.fillRect(x, y, w, h);
        }
    }

    highlight(ctx, w, h){
        let x = this.col * w;
        let y = this.row * h;
        ctx.beginPath();
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(x, y, w, h);
    }
}