const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let minDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
minDimension = minDimension >= 600 ? 600 : minDimension - (minDimension % 10);
canvas.width = minDimension;//window.innerWidth >= 600 ? 600 : 360;
canvas.height = minDimension;//canvas.width > window.innerHeight ? 360 : canvas.width;//window.innerHeight >= 600 ? 600 : 400;

let step, state, numSteps, turnCounter, stepSize, cols, rows, totalSteps, x, y, px, py;
let primesDict = {};
let biggestPrime = 0;
let maxStep = 0;
initialize();
// let state = 0;
// let numSteps = 1;
// let turnCounter = 1;

// let stepSize = 10;

// let cols = (canvas.width - stepSize) / stepSize;
// let rows = (canvas.height - stepSize) / stepSize;

// let totalSteps = cols * rows;

// let x = canvas.width / 2;
// let y = canvas.height / 2;

// let px = x;
// let py = y;

// let primesDict = {};

window.addEventListener("resize", (e) =>{
    let newMinDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    newMinDimension = newMinDimension >= 600 ? 600 : newMinDimension - (newMinDimension % 10);
    if(newMinDimension == minDimension) return;
    minDimension = newMinDimension;
    canvas.width = minDimension;
    canvas.height = minDimension;
    oldStep = step;
    initialize();
    clearInterval(intervalId);
    resizeDraw();
    if(oldStep < totalSteps) intervalId = setInterval(draw, 33.33);

});

canvas.addEventListener("click", (e) =>{
    let xPos = e.clientX - canvas.getBoundingClientRect().left;
    let yPos = e.clientY - canvas.getBoundingClientRect().top;

    for(const key in primesDict){
       const x0 = primesDict[key][0];
       const y0 = primesDict[key][1];

       if(Math.sqrt((x0-xPos)*(x0-xPos) + (y0-yPos)*(y0-yPos)) < stepSize * 0.5){
            document.getElementById("prime").innerText = `The selected prime is ${key}`;
            break;
       }
    }
});

function initialize(){
    step = 1;
    state = 0;
    numSteps = 1;
    turnCounter = 1;

    stepSize = 10;

    cols = (canvas.width - stepSize) / stepSize;
    rows = (canvas.height - stepSize) / stepSize;

    totalSteps = cols * rows;

    x = canvas.width / 2;
    y = canvas.height / 2;

    px = x;
    py = y;
}

function draw(){
    if((step <= biggestPrime && step in primesDict) || isPrime(step)){
        primesDict[step] = [x, y];
        ctx.beginPath();
        ctx.arc(x, y, stepSize * 0.5, 0, 2 * Math.PI);
        let h = step * 360 / totalSteps;
        ctx.fillStyle = `HSL(${h}, 100%, 50%)`;
        ctx.fill();
        biggestPrime = step > biggestPrime ? step : biggestPrime;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(px, py);
    ctx.strokeStyle = "white";
    ctx.stroke();

    px = x;
    py = y;

    switch(state){
        case 0:
            x += stepSize;
            break;
        case 1:
            y -= stepSize;
            break;
        case 2:
            x -= stepSize;
            break;
        case 3:
            y += stepSize;
            break;
    }

    if(step % numSteps == 0){
        state = (state + 1) % 4;
        turnCounter++;
        if(turnCounter % 2 == 0){
            numSteps++
        }
    }
    maxStep = maxStep < step ? step : maxStep;
    step++;

    if(step > totalSteps){
        clearInterval(intervalId);
    }
}

function isPrime(num){
    if(num == 2 || num == 3){
        return true;
    }

    if(num <= 1 || num % 2 == 0 || num % 3 == 0){
        return false;
    }

    for(let i = 5; i * i < num; i += 6){
        if(num % i == 0 || num % (i + 2) == 0){
            return false;
        }
    }
    return true;
}

function resizeDraw(){
    let i = maxStep < totalSteps ? maxStep : totalSteps;
    while(step <= i){
        draw();
    }
}

let intervalId = setInterval(draw, 33.33);
