const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let firstLine = new Line(25, canvas.height - 25, 0, canvas.width * .5);
let lines = [];
lines.push(firstLine);
ctx.lineWidth = 2;
let x = 0;
let fadeProgress = 0;

function draw(){
    // ctx.globalCompositeOperation = "darken";
    // ctx.globalAlpha = .15;
    // ctx.fillStyle = "rgb(0,0,0)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.globalCompositeOperation = "source-over";
    // ctx.globalAlpha = 1;
    // ctx.fillStyle = "rgba(0, 0, 0, .9)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log(`The size of lines is ${lines.length}`);
    let finished = true;
    for(let line of lines){
        let children = Array.from(line.children);
        //console.log(children);
        if(line.step()){
            finished = false;
            // ctx.save();
            // ctx.beginPath();
            // ctx.globalCompositeOperation = "lighter";
            ctx.strokeStyle = line.color;
            ctx.beginPath();
            ctx.moveTo(line.prevX, line.prevY);
            ctx.lineTo(line.currentX, line.currentY);
            ctx.stroke();
            // ctx.restore();
            for(let i = 0; i < children.length; i++){
                if(children[i] !== line.children[i]){
                    console.log("Here!");
                    lines.push(line.children[i]);
                }
            }
        }
    }
    if(finished){
        fadeProgress++;
        if(fadeProgress <= 60) return;
        // clearInterval(drawId);
        // clearInterval(fadeId);
        fadeProgress = 0;
        lines = [];
        firstLine = new Line(25, canvas.height - 25, 0, canvas.width * .5);
        lines.push(firstLine);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

setInterval(draw, 33.33);