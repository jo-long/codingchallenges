class Grid {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.grid = Array.from({length: this.width}, () => Array(this.height).fill(new Empty("black"))); //.fill(0)
        this.modifiedIndices = new Set();
        this.cleared = false;
    }

    clear(){
        this.grid = Array.from({length: this.width}, () => Array(this.height).fill(new Empty("black"))); //.fill(0)
        this.cleared = true;
    }

    set(x, y, particle){ //(x, y, color)
        //this.grid[x][y] = color;
        if(x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        this.setIndex(x, y, particle);
    }

    swap(x1, y1, x2, y2){
        // const temp = this.grid[x1][y1];
        // this.grid[x1][y1] = this.grid[x2][y2];
        // this.grid[x2][y2] = temp;

        let tmp = this.grid[x1][y1];
        this.setIndex(x1, y1, this.grid[x2][y2]);
        this.setIndex(x2, y2, tmp);

    }

    isEmpty(x, y){
        return this.grid[x][y] instanceof Empty;//=== 0;
    }

    setIndex(x, y, particle){
        this.grid[x][y] = particle;
        this.modifiedIndices.add(this.calculateIndex(x, y));
    }

    clearIndex(x, y){
        this.setIndex(x, y, new Empty());
    }

    calculateIndex(x, y){
        return y * this.width + x;
    }

    update(){
        this.cleared = false;
        this.modifiedIndices = new Set();

        for(let j = this.grid[0].length - 1; j > 0; j--){
            let renderSide = Math.random() > 0.5;
            for(let i = 0; i < this.grid.length; i++){
                let tmp = i;
                i = renderSide ? i : -i + this.grid.length - 1;
                if(this.isEmpty(i, j)){
                    i = tmp;
                    continue;
                }
                this.grid[i][j].update();
                if(!this.grid[i][j].modified) continue;
                let vI = i;
                let vJ = j;
                const iterations = this.grid[i][j].getUpdateCount();
                for(let v = 0; v < iterations; v++){
                    const newV = this.updateParticle(vI, vJ);
                    if(newV.i !== vI || newV.j !== vJ){
                        vI = newV.i;
                        vJ = newV.j;
                    }else{
                        this.grid[vI][vJ].resetVelocity();
                        break;
                    }
                }
                i = tmp;
            }
        }
    }

    updateParticle(i, j){
        let bottom = this.isEmpty(i, j + 1);
        let bottomL = i > 0 && this.isEmpty(i - 1, j + 1);
        let bottomR = i < this.grid.length - 1 && this.isEmpty(i + 1, j + 1);

        if(bottom){
            this.swap(i, j, i, j + 1);
            return {i: i, j: j + 1};
        }else if(bottomL && bottomR){
            let dir = Math.random() < 0.5 ? 1 : -1;
            this.swap(i, j, i + dir, j + 1);
            return {i: i + dir, j: j + 1};
        }else if(bottomL){
            this.swap(i, j, i - 1, j + 1);
            return {i: i - 1, j: j + 1};
        }else if(bottomR){
            this.swap(i, j, i + 1, j + 1);
            return {i: i + 1, j: j + 1};
        }

        return {i: i, j: j};

    }

    draw(ctx){
        // ctx.clearRect(0, 0, this.width, canvas.height);
        // ctx.fillStyle = "black";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.beginPath();
        // ctx.arc(x, y, pointerRadius, 0, 2 * Math.PI);
        // ctx.fillStyle = `hsl(${color["hue"]}, ${color["saturation"]}%, ${color["lightness"]}%)`;;
        // ctx.fill();
        for(let i = 0; i < this.grid.length; i++ ){
            for(let j = 0; j < this.grid[i].length; j++){
                //ctx.fillStyle = "black";
                if(this.isEmpty(i, j)) continue;
                ctx.fillStyle = this.grid[i][j].color;
                ctx.fillRect(i, j, 1, 1);
            }
        }

        // this.modifiedIndices.forEach((index) => {
        //     const y = Math.floor(index / this.width);
        //     const x = index % this.width;
        //     // if(this.isEmpty(x, y)) return;
        //     ctx.fillStyle = this.grid[x][y].color;
        //     ctx.fillRect(x, y, 1, 1);
        // });        
    }

    shouldDraw(){
        return this.cleared || this.modifiedIndices.size > 0;
    }
}