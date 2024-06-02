const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let minDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
minDimension = minDimension >= 600 ? 600 : minDimension - (minDimension % 10);
canvas.width = minDimension;
canvas.height = minDimension;

let x = 0;
let y = 0;
let biggest = 0;
let numColsAndRows = 20;
let spacing = canvas.width / numColsAndRows;
let grid = Array.from({length: numColsAndRows}, () => Array(numColsAndRows).fill(null));
for(let j = 0; j < numColsAndRows; j++){
    for(let i = 0; i < numColsAndRows; i++){
        grid[j][i] = Math.random() < .5 ? true : false;
    }
}

window.addEventListener("resize", (e) =>{
    let newMinDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    newMinDimension = newMinDimension >= 600 ? 600 : newMinDimension - (newMinDimension % 10);
    if(newMinDimension == minDimension) return;
    clearInterval(intervalId);
    minDimension = newMinDimension;
    canvas.width = minDimension;
    canvas.height = minDimension;
    spacing = canvas.width / numColsAndRows;
    index = y * numColsAndRows + x;
    biggest = index > biggest ? index : biggest;
    x = 0;
    y = 0;
    resizeDraw();
});

function draw(){
    if(grid[y][x]){
        ctx.beginPath();
        ctx.moveTo((x * spacing), (y * spacing));
        ctx.lineTo((x * spacing) + spacing, (y * spacing) + spacing);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }else{
        ctx.beginPath();
        ctx.moveTo((x * spacing), (y * spacing) + spacing);
        ctx.lineTo((x * spacing) + spacing, (y * spacing));
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    x++;
    if(x === numColsAndRows){
        x = 0;
        y++;
        if(y === numColsAndRows) clearInterval(intervalId);
    }
}

function resizeDraw(){
    while((y * numColsAndRows) + x < biggest){
        draw();
    }
    if(y !== numColsAndRows) intervalId = setInterval(draw, 33.33);
}

let intervalId = setInterval(draw, 100);