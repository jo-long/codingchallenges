const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let minDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
minDimension = minDimension >= 600 ? 600 : minDimension - (minDimension % 10);
canvas.width = minDimension;
canvas.height = minDimension;

let n, c;
initialize();

window.addEventListener("resize", (e) =>{
    let newMinDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    newMinDimension = newMinDimension >= 600 ? 600 : newMinDimension - (newMinDimension % 10);
    if(newMinDimension == minDimension) return;
    minDimension = newMinDimension;
    canvas.width = minDimension;
    canvas.height = minDimension;
    let prevN = n;
    initialize();
    clearInterval(intervalId);
    resizeDraw(prevN);
    intervalId = setInterval(draw, 33.33);
});

function initialize(){
    n = 0;
    c = canvas.width / 60;
}

function draw(){
    if(n === 2000){
        clearInterval(intervalId);
    }
    let angle = ((n * 137.5) * Math.PI) / 180;
    let radius = c * Math.sqrt(n);
    let x = radius * Math.cos(angle) + canvas.width/2;
    let y = radius * Math.sin(angle) + canvas.height/2;

    ctx.beginPath();
    ctx.arc(x, y, canvas.width / 120, 0, 2 * Math.PI);
    ctx.fillStyle = `HSL(${(angle * 180 / Math.PI - radius) % 360}, 100%, 50%)`;
    ctx.fill();
    n++;
}

function resizeDraw(redraws){
    while(n <= redraws) draw();
}

let intervalId = setInterval(draw, 33.33);