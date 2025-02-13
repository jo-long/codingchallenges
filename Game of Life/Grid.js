class Grid{
    constructor(cols, rows, size){
        this.cols = cols;
        this.rows = rows;
        this.size = size;
        this.cells = [];
        for(let i = 0; i < cols; i++){
            this.cells[i] = [];
            for(let j = 0; j < rows; j++){
                this.cells[i][j] = Math.floor(Math.random() * 2);
            }
        }
    }

    display(ctx){
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(this.cells[i][j] === 0) ctx.fillStyle = "black";
                else{ ctx.fillStyle = "white"}
                ctx.fillRect(i * this.size, j * this.size, this.size, this.size);
            }
        }
    }

    update(){
        let nextGen = [];
        for(let i = 0; i < this.cols; i++){
            nextGen[i] = [];
            for(let j = 0; j < this.rows; j++){
                const aliveNeighbors = this.getNeighboringStates(i, j);
                if(this.cells[i][j] === 1 && aliveNeighbors < 2){
                    nextGen[i][j] = 0;
                }else if(this.cells[i][j] === 1 && (aliveNeighbors === 2 || aliveNeighbors === 3)){
                    nextGen[i][j] = 1;
                }else if(this.cells[i][j] === 1 && aliveNeighbors > 3){
                    nextGen[i][j] = 0;
                }else if(this.cells[i][j] === 0 && aliveNeighbors === 3){
                    nextGen[i][j] = 1;
                }else{
                    nextGen[i][j] = this.cells[i][j];
                }
            }
        }
        this.cells = nextGen;
    }

    getNeighboringStates(x, y){
        let sum = 0;
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                if(i === 0 && j === 0) continue;
                const xIndex = (x + i + this.cols) % this.cols;
                const yIndex = (y + j + rows) % this.rows;
                sum += this.cells[xIndex][yIndex];
            }
        }
        return sum;
    }

    resetGrid(){
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                this.cells[i][j] = 0;
            }
        }
    }

    randomGrid(){
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                this.cells[i][j] = Math.floor(Math.random() * 2);
            }
        }
    }
}