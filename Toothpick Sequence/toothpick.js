class Toothpick{
    constructor(x, y, dir, len){
        this.dir = dir;
        this.len = len;
        this.isNew = true;
        this.justSpawnedChildren = false;
        if(dir == 1){
            this.ax = x - len / 2;
            this.bx = x + len/2;
            this.ay = y;
            this.by = y;
        }else{
            this.ax = x;
            this.bx = x;
            this.ay = y - len / 2;
            this.by = y + len / 2;
        }
    }

    intersects(x, y){
        if(this.ax == x && this.ay == y){
            return true;
        }else if(this.bx == x && this.by == y){
            return true 
        }else{
            return false;
        }
    }

    createNewToothpick(picks, side){
        let available = true;
        let coords = side == 0 ? [this.ax, this.ay] : [this.bx, this.by];

        for(let pick of picks){
            if(pick != this && pick.intersects(coords[0], coords[1])){
                available = false;
                break;
            }
        }

        if(available){
            return new Toothpick(coords[0], coords[1], this.dir * -1, this.len);
        }else{
            return null;
        }
    }

    show(ctx, factor){
        ctx.beginPath();
        ctx.moveTo(this.ax, this.ay);
        ctx.lineTo(this.bx, this.by);
        ctx.lineWidth = 1/factor;
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}