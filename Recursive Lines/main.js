const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let firstLine = new Line(25, canvas.height - 25, 0, 275);
let lines = [];
lines.push(firstLine);
ctx.lineWidth = 2;
let x = 0;
let fadeProgress = {0 : 0}

function draw(){
    ctx.globalCompositeOperation = "darken";
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    console.log(`The size of lines is ${lines.length}`);
    let finished = true;
    for(let line of lines){
        let children = Array.from(line.children);
        //console.log(children);
        if(line.step()){
            finished = false;
            ctx.save();
            ctx.beginPath();
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = line.color;
            ctx.moveTo(line.prevX, line.prevY);
            ctx.lineTo(line.currentX, line.currentY);
            ctx.fill();
            ctx.restore();
            for(let i = 0; i < children.length; i++){
                if(children[i] !== line.children[i]){
                    console.log("Here!");
                    lines.push(line.children[i]);
                }
            }
        }
    }
    if(finished){
        // clearInterval(drawId);
        // clearInterval(fadeId);
        lines = [];
        firstLine = new Line(25, canvas.height - 25, 0, 275);
        lines.push(firstLine);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function fadeOut(){
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function d(){
    let index = 0;
    for(let line of lines){
        let children = Array.from(line.children);
        if(line.step() || fadeProgress[index] != 1){
            let fade = fadeProgress[index];
            fadeProgress[index] = fade + (line.speed * 0.75 * .0025) >= 1 ? 1 : fade + (line.speed * 0.75 * .0025);
            const gradient = ctx.createLinearGradient(line.startX, line.startY, line.currentX, line.currentY);
            gradient.addColorStop(fade, "black");
            if(fade < 1) gradient.addColorStop(1, "red");
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.lineTo(line.currentX, line.currentY);
            ctx.strokeStyle = gradient;
            ctx.stroke();
            for(let i = 0; i < children.length; i++){
                if(children[i] !== line.children[i]){
                    console.log("Here!");
                    lines.push(line.children[i]);
                    fadeProgress[Object.keys(fadeProgress).length] = 0;
                }
            }
        }
        index++;
    }
    // firstLine.step();
    //     const gradient = ctx.createLinearGradient(firstLine.startX, firstLine.startY, firstLine.currentX, firstLine.currentY);
    //     gradient.addColorStop(x, "black");
    //     gradient.addColorStop(1, "red");
    //     ctx.beginPath();
    //     ctx.moveTo(firstLine.startX, firstLine.startY);
    //     ctx.lineTo(firstLine.currentX, firstLine.currentY);
    //     ctx.strokeStyle = gradient;
    //     ctx.stroke();
    //     x = x + (firstLine.speed * 0.75 * .0025) >= 1 ? 1 : x + (firstLine.speed * 0.75 * .0025);
}

// let drawId = setInterval(draw, 16.67);
// let fadeId = setInterval(fadeOut, 33.33);
setInterval(d, 33.33);