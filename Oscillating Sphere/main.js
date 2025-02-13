const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let r = 150;
let waves = [];
let num = 20;
let step = 10;

for(let i = 0; i < num; i++){
    waves[i] = new Wave(i * step);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.beginPath();
    // ctx.arc(0, 0, r, 0, 2 * Math.PI);
    // ctx.strokeStyle = "white";
    // ctx.stroke();

    // for(let i = 0; i <=360; i++){
    //     let x = scale(i, 0, 360, -r, r);
    //     let amplitude = r * Math.sqrt(1 - Math.pow(x / r, 2));
    //     let y = amplitude * Math.sin((i + angle)* (Math.PI / 180));
    //     ctx.beginPath();
    //     ctx.arc(x, y, 1, 0, 2 * Math.PI);
    //     ctx.fillStyle = "white";
    //     ctx.fill();
    // }
    // angle += 1;
    for(let i = 0; i < waves.length; i++){
        waves[i].display(r);
        waves[i].move();
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function scale(num, inMin, inMax, outMin, outMax){
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

setInterval(draw, 33.33);