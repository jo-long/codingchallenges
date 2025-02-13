const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gradients = {};
let memory = {};

let s = 200;
let amp = 200;
let frameCount = 0;

// ctx.beginPath();
// ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
// ctx.fillStyle = "white";
// ctx.fill();
// ctx.fillStyle = "red";
// ctx.beginPath();
// ctx.arc(canvas.width / 2, canvas.height / 2 - 10, 5, 0, Math.PI * 2)
// ctx.fill();

function draw(){
    ctx.drawImage(canvas, 0, 1);
    for(let i = 0; i < canvas.width; i+=2){
        let n = noise(i / s, (frameCount * 2) / s);
        // console.log(n);
        ctx.fillStyle = `hsl(${Math.floor(n * 361)}, 100%, 50%)`;
        ctx.beginPath();
        ctx.fillRect(i, 1 + n * amp, 1, 1);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.fillRect(i, 1 + n * amp - 1, 1, 1);

    }
    frameCount++;
}

function randomUnitVector(){
    const theta = Math.random() * (2 * Math.PI);
    return {x: Math.cos(theta), y: Math.sin(theta)};
}

function dotProduct(x, y, x2, y2){
    let gradientVector;
    let distanceVector = {x: x - x2, y: y - y2};
    if(gradients[[x2, y2]]){
        gradientVector = gradients[[x2, y2]];
    }else{
        gradientVector = randomUnitVector();
        gradients[[x2, y2]] = gradientVector;
    }
    return distanceVector.x * gradientVector.x + distanceVector.y * gradientVector.y;
}

function smootherstep(x){
    return (6*x**5) - (15*x**4) + (10*x**3);
}

function interpolate(x, a, b){
    if(x < 0) x = 0;
    if(x > 1) x = 1;
    return a + smootherstep(x) * (b - a);
}

function noise(x, y){
    if(memory.hasOwnProperty([x, y])){
        return memory[[x, y]];
    }

    const xFloored = Math.floor(x);
    const yFloored = Math.floor(y);

    const top1 = dotProduct(x, y, xFloored, yFloored);
    const top2 = dotProduct(x, y, xFloored + 1, yFloored);
    const bottom1 = dotProduct(x, y, xFloored, yFloored + 1);
    const bottom2 = dotProduct(x, y, xFloored + 1, yFloored + 1);

    const x1 = interpolate(x - xFloored, top1, top2);
    const x2 = interpolate(x - xFloored, bottom1, bottom2);

    const val = (.5 * interpolate(y - yFloored, x1, x2)) + .5;
    
    memory[[x, y]] = val;

    return val;
}

setInterval(draw, 33.33);


