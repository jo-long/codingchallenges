const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let minDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
minDimension = minDimension >= 600 ? 600 : minDimension - (minDimension % 10);
canvas.width = minDimension;
canvas.height = minDimension;

let circles, cols, rows;
let size = 10;
let r = size / 2;
let k = 20;
initialize();

window.addEventListener("resize", (e) =>{
    let newMinDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    newMinDimension = newMinDimension >= 600 ? 600 : newMinDimension - (newMinDimension % 10);
    if(newMinDimension == minDimension) return;
    minDimension = newMinDimension;
    canvas.width = minDimension;
    canvas.height = minDimension;
    initialize();
});

function initialize(){
    circles = [];
    cols = canvas.width / size;
    rows = canvas.height / size;

    for(let i = 0; i < cols; i++){
        circles[i] = [];
        for(let j = 0; j < rows; j++){
            let x = size / 2 + i * size;
            let y = size / 2 + j * size;
            let d = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2));
            let angle = d / k;
            circles[i][j] = new Circle(r, x, y, angle);
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            circles[i][j].display(ctx);
            circles[i][j].move(-.05);
        }
    }
}

setInterval(draw, 33.33);