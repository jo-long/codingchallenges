const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let step = 1;
let state = 0;
let numSteps = 1;
let turnCounter = 1;

let stepSize = 10;

const cols = (canvas.width - stepSize) / stepSize;
const rows = (canvas.height - stepSize) / stepSize;

let totalSteps = cols * rows;

let x = canvas.width / 2;
let y = canvas.height / 2;

let px = x;
let py = y;

let primesDict = {};

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

function draw(){
    if(isPrime(step)){
        primesDict[step] = [x, y];
        ctx.beginPath();
        ctx.arc(x, y, stepSize * 0.5, 0, 2 * Math.PI);
        let h = step * 360 / totalSteps;
        ctx.fillStyle = `HSL(${h}, 100%, 50%)`;
        ctx.fill();
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

let intervalId = setInterval(draw, 33.33);
