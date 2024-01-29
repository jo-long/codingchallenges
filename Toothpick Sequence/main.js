const canvas = document.getElementById("canvas");
canvas.addEventListener("click", (e) =>{
    draw();
});
const ctx = canvas.getContext("2d");

let picks = [];
let len = 63;

let minX = -canvas.width / 2;
let maxX = canvas.width / 2;
let factor = canvas.width / (maxX - minX);
let oldFactor = factor;

picks.push(new Toothpick(0, 0, 1, len));

function draw(){
    factor = canvas.width / (maxX - minX);
    if(factor != oldFactor){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(factor, factor);
    for(let pick of picks){
        if(!pick.isNew){
            pick.show(ctx, factor);
            minX = Math.min(pick.ax, minX);
            maxX = Math.max(pick.ax, maxX);
        }
    }

    let next = [];
    for(let pick of picks){
        if(pick.isNew){
            for(let i = 0; i < 2; i++){
                let child = pick.createNewToothpick(picks, i);
                if(child != null){
                    next.push(child);
                }
            }
            pick.isNew = false;
        }
    }
    picks = picks.concat(next);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

draw();