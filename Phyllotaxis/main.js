const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let n = 0;
let c = 10;

function draw(){
    let angle = ((n * 137.5) * Math.PI) / 180;
    let radius = c * Math.sqrt(n);
    let x = radius * Math.cos(angle) + canvas.width/2;
    let y = radius * Math.sin(angle) + canvas.height/2;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = `HSL(${(angle * 180 / Math.PI - radius) % 360}, 100%, 50%)`;
    ctx.fill();
    n++;
}

setInterval(draw, 100);