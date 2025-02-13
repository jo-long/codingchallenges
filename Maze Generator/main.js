const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cols = 20;
const rows = 20;
let grid = [];
let stack = [];
const numIterations = 3;

const w = canvas.width / cols;
const h = canvas.height / rows;

for(let j = 0; j < rows; j++){
    for(let i = 0; i < cols; i++){
        let cell = new Cell(i, j);
        grid.push(cell);
    }
}

let current = grid[0];
current.visited = true;

function draw(){ 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < grid.length; i++){
        grid[i].show(ctx, w, h);
    }
    for(let i = 0; i < numIterations; i++){
        if(i === numIterations - 1) current.highlight(ctx, w, h);
        let next = getRandomUnvisitedNeighbor(current.col, current.row);
        if(next){
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        }else if(stack.length > 0){
            current = stack.pop();
        }else{
            clearInterval(intervalId);
            current.show(ctx, w, h);
            a_star(0, cols * rows - 1);
        }
    }

}

function getRandomUnvisitedNeighbor(i, j){
    let neighbors = [];

    const top = grid[index(i, j - 1)];
    const right = grid[index(i + 1, j)];
    const bottom = grid[index(i, j + 1)];
    const left = grid[index(i - 1, j)];

    if(top && !top.visited) neighbors.push(top);

    if(right && !right.visited) neighbors.push(right);

    if(bottom && !bottom.visited) neighbors.push(bottom);

    if(left && !left.visited) neighbors.push(left);

    if(neighbors.length > 0){
        return neighbors[randomInt(0, neighbors.length)];
    }
    else{
        return undefined;
    }
}

function index(i, j){
    if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;
    return i + j * cols;
}

function randomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function removeWalls(cell1, cell2){
    const x = cell1.col - cell2.col;

    if(x === 1){
        cell1.walls.left = false;
        cell2.walls.right = false;
    }else if(x === -1){
        cell1.walls.right = false;
        cell2.walls.left = false;
    }

    const y = cell1.row - cell2.row;

    if(y === 1){
        cell1.walls.top = false;
        cell2.walls.bottom = false;
    }else if(y === -1){
        cell1.walls.bottom = false;
        cell2.walls.top = false;
    }
}

function a_star(start, goal){
    discoveredNodes = [start];

    cameFrom = [];

    gScore = [];
    for(let i = 0; i < grid.length; i++){
        gScore.push(Infinity);
    }
    gScore[0] = 0;

    fScore = [];
    for(let i = 0; i < grid.length; i++){
        fScore.push(Infinity);
    }
    fScore[0] = 1;

    while(discoveredNodes.length !== 0){
        let current = discoveredNodes[0];
        let currentIndex = 0;
        for(let i = 1; i < discoveredNodes.length; i++){
            if(fScore[current] > fScore[discoveredNodes[i]]){
                current = discoveredNodes[i];
                currentIndex = i;
            }
        }
        if(current === goal){
            drawPath(cameFrom, current, start);
            return;
        }

        discoveredNodes.splice(currentIndex, 1);

        let neighbors = getVisitableNeighbors(grid[current].col, grid[current].row);
        // if(neighbors.length > 0){
            for(let neighbor of neighbors){
                const tentativeGScore = gScore[current] + 1;
                if(tentativeGScore < gScore[neighbor]){
                    cameFrom[neighbor] = current;
                    gScore[neighbor] = tentativeGScore;
                    fScore[neighbor] = tentativeGScore + 1;
                    if(!discoveredNodes.includes(neighbor)) discoveredNodes.push(neighbor);
                }
            }
        // }

    }

    console.log("Path not found!");

}

function getVisitableNeighbors(i, j){
    let neighbors = [];
    // let current = grid[index(i, j)];
    const topIndex = index(i, j - 1);
    const rightIndex = index(i + 1, j);
    const bottomIndex = index(i, j + 1);
    const leftIndex = index(i - 1, j);

    const top = grid[topIndex];
    const right = grid[rightIndex];
    const bottom = grid[bottomIndex];
    const left = grid[leftIndex];

    if(top && !top.walls.bottom) neighbors.push(topIndex);

    if(right && !right.walls.left) neighbors.push(rightIndex);

    if(bottom && !bottom.walls.top) neighbors.push(bottomIndex);

    if(left && !left.walls.right) neighbors.push(leftIndex);
    
    return neighbors;
}

function drawPath(cameFrom, current, start){
    grid[current].inPath = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < grid.length; i++){
        grid[i].show(ctx, w, h);
    }
    if(current !== start){
        grid[current].highlight(ctx, w, h);
        current = cameFrom[current];
        setTimeout(() => {
            drawPath(cameFrom, current, start);
        }, 33.33);
    }

}

let intervalId = setInterval(draw, 33.33);