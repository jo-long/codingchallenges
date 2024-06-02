const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let minDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
minDimension = minDimension >= 600 ? 600 : minDimension - (minDimension % 10);
canvas.width = minDimension;
canvas.height = minDimension;

const slider = document.getElementById("myRange");
let angle = slider.value * Math.PI / 180;

draw();

window.addEventListener("resize", (e) =>{
    let newMinDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    newMinDimension = newMinDimension >= 600 ? 600 : newMinDimension - (newMinDimension % 10);
    if(newMinDimension == minDimension) return;
    minDimension = newMinDimension;
    canvas.width = minDimension;
    canvas.height = minDimension;
    draw();
});

slider.addEventListener("input", function(e){
    angle = e.target.value * Math.PI / 180;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
});

function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height);
    branch(canvas.width / 4);
}

function branch(len){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.translate(0, -len);

    if(len > 1){
        ctx.save();
        ctx.rotate(angle);
        branch(len * 0.67);
        ctx.restore();
        ctx.save();
        ctx.rotate(-angle);
        branch(len * 0.67);
        ctx.restore();
    }
}