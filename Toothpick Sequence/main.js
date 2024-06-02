const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let minDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
minDimension = minDimension >= 600 ? 600 : minDimension - (minDimension % 10);
canvas.width = minDimension;
canvas.height = minDimension;

let picks = [];
let len = 63;
picks.push(new Toothpick(0, 0, 1, len));
let minX = -canvas.width / 2;
let maxX = canvas.width / 2;
let factor = canvas.width / (maxX - minX);
let oldFactor = factor;
let justResized = false;

window.addEventListener("resize", (e) =>{
    let newMinDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    newMinDimension = newMinDimension >= 600 ? 600 : newMinDimension - (newMinDimension % 10);
    if(newMinDimension == minDimension) return;
    minDimension = newMinDimension;
    canvas.width = minDimension;
    canvas.height = minDimension;
    justResized = true;
    resizeDraw();
});

canvas.addEventListener("click", (e) =>{
    draw();
});

function resizeDraw(){
    minX = -canvas.width / 2;
    maxX = canvas.width / 2;
    factor = canvas.width / (maxX - minX);
    oldFactor = factor;
    for(let pick of picks){
        if(!pick.isNew){
            minX = Math.min(pick.ax, minX);
            maxX = Math.max(pick.ax, maxX);
        }
    }
    factor = canvas.width / (maxX - minX);
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(factor, factor);
    for(let pick of picks){
        if(!pick.isNew && !pick.justSpawnedChildren){
            pick.show(ctx, factor);
        }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function draw(){
    factor = canvas.width / (maxX - minX);
    if(factor != oldFactor){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(factor, factor);
    let next = [];
    for(let pick of picks){
        if(!pick.isNew){
            if(pick.justSpawnedChildren) pick.justSpawnedChildren = false;
            pick.show(ctx, factor);
            minX = Math.min(pick.ax, minX);
            maxX = Math.max(pick.ax, maxX);
        }else{
            for(let i = 0; i < 2; i++){
                let child = pick.createNewToothpick(picks, i);
                if(child != null){
                    next.push(child);
                }
            }
            pick.isNew = false;
            pick.justSpawnedChildren = true;
        }
    }

    picks = picks.concat(next);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

draw();