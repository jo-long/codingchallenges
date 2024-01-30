const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let stars = [];
let step = 1;
let speed = 1;

const slider = document.getElementById("myRange");
slider.addEventListener("input", function(e){
    step = e.target.value;
});

for(let i = 0; i < 2000; i++){
    stars[i] = new Star(canvas.width, canvas.height);
}

function draw(){
    speed = (step * 50) / canvas.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width/2, canvas.height/2);
    for(let i = 0; i < stars.length; i++){
        stars[i].update(speed, canvas.width, canvas.height);
        stars[i].show(ctx, canvas);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

setInterval(draw, 33.33);