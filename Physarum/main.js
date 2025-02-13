const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {willReadFrequently: true});

let molds = [];

for(let i = 0; i < 10000; i++){
    molds[i] = new Mold(canvas.width, canvas.height);
}

function draw(){
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    ctx.fillStyle = "rgba(0, 0, 0, .1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let m of molds){
        m.update(canvas.width, data);
        m.display(ctx);
    }
}

setInterval(draw, 33.33);