const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let minDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
minDimension = minDimension >= 600 ? 600 : minDimension - (minDimension % 10) - 10;
canvas.width = minDimension;
canvas.height = minDimension;

let numbers = [];
let count = 1;
let sequence = [];
let index = 0;

let scale = 0;

let arcs = [];

let biggest = 0;

numbers[index] = true;
sequence.push(index);



// class Arc{
//     constructor(start, end, dir){
//         this.start = start;
//         this.end = end;
//         this.dir = dir;
//     }

//     show(){
//         let diameter = Math.abs(this.end - this.start);
//         let x = (this.end + this.start) / 2;
//         let startAngle = this.dir == 0 ? Math.PI : 0;;
//         let endAngle = this.dir == 0 ? 0 : Math.PI;
//         ctx.strokeStyle = "white";
//         ctx.strokeWeight = 0.5;
//         ctx.beginPath();
//         ctx.arc(x, 0, diameter / 2, startAngle, endAngle);
//         ctx.stroke();
//     }
// }

window.addEventListener("resize", (e) =>{
    let newMinDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    newMinDimension = newMinDimension >= 600 ? 600 : newMinDimension - (newMinDimension % 10) - 10;
    if(newMinDimension == minDimension) return;
    minDimension = newMinDimension;
    canvas.width = minDimension;
    canvas.height = minDimension;
});

function step(){
    let next = index - count;
    if(next < 0 || numbers[next]){
        next = index + count;
    }
    numbers[next] = true;
    sequence.push(next);

    let arc = new Arc(index, next, count % 2);
    arcs.push(arc);
    index = next;

    if(index > biggest){
        biggest = index;
    }

    count++;
}

function draw(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    step();
    setFontSize(40, canvas.width, `Biggest number is ${biggest}`);
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(`Biggest number is ${biggest}`, canvas.width/2, 9 * canvas.height/10);
    ctx.translate(0, canvas.height / 2);
    scale += ((canvas.width / biggest) - scale) * 0.1;
    ctx.scale(scale, scale);

    for(let arc of arcs){
        arc.show(ctx);
    }
}

function setFontSize(currentSize, widthRestriction, text){
    ctx.font = `${currentSize}px monospace`;
    let width = ctx.measureText(text).width;
    while(width >= widthRestriction){
        currentSize-=5;
        ctx.font = `${currentSize}px monospace`;
        width = ctx.measureText(text).width;
    }
}

setInterval(draw, 33.33);
