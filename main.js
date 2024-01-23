const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let stars = [];
let mouseX = 0;

let speed = 1;

for(let i = 0; i < 800; i++){
    stars[i] = new Star(canvas.width, canvas.height);
}

canvas.addEventListener("mousemove", function(e){
    mouseX = e.clientX - e.target.getBoundingClientRect().left;
});

function draw(){
    speed = (mouseX * 50) / canvas.width;
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