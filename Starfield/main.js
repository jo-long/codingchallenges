const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let minDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
minDimension = minDimension >= 600 ? 600 : minDimension - (minDimension % 10);
canvas.width = minDimension;
canvas.height = minDimension;

let stars;
let step = 1;
let speed = 1;
createStars();

window.addEventListener("resize", (e) =>{
    let newMinDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    newMinDimension = newMinDimension >= 600 ? 600 : newMinDimension - (newMinDimension % 10);
    if(newMinDimension == minDimension) return;
    minDimension = newMinDimension;
    canvas.width = minDimension;
    canvas.height = minDimension;
    clearInterval(intervalId);
    resizeStars();
    draw();
    intervalId = setInterval(draw, 33.33);
});

const slider = document.getElementById("myRange");
slider.addEventListener("input", function(e){
    step = e.target.value;
});

function createStars(){
    stars = [];

    for(let i = 0; i < 2000; i++){
        stars[i] = new Star(canvas.width, canvas.height);
    }
}

function draw(){
    speed = (step * 50) / canvas.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width/2, canvas.height/2);
    for(let i = 0; i < stars.length; i++){
        stars[i].update(speed);
        stars[i].show(ctx);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function resizeStars(){
    for(let star of stars){
        star.resize(minDimension, minDimension);
    }
}

let intervalId = setInterval(draw, 33.33);