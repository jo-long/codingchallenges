const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let spawnIntervalId;
let drawIntervalId;
let pointerRadius = 5;
let x, y;

let grid = new Grid(canvas.width, canvas.height);
let color = {"hue" : 0, "saturation" : 65, "lightness" : 61};

canvas.addEventListener("mousedown", (e) =>{
    let x = Math.floor(e.clientX - canvas.getBoundingClientRect().left);
    let y = Math.floor(e.clientY - canvas.getBoundingClientRect().top);
    if(x >= canvas.width || x <= 0 || y >= canvas.height || y <= 0) return;
    spawnIntervalId = setInterval(spawnParticles, 33.33);
});

canvas.addEventListener("mousemove", (e) =>{
    let newX = Math.floor(e.clientX - canvas.getBoundingClientRect().left);
    let newY = Math.floor(e.clientY - canvas.getBoundingClientRect().top);
    if(newX >= canvas.width || newX <= 0 || newY >= canvas.height || newY <= 0){
        clearInterval(spawnIntervalId);
        return;
    }
    x = newX;
    y = newY;
});

canvas.addEventListener("mouseup", (e) =>{
    clearInterval(spawnIntervalId);
});

function varyColor(hue, saturation, lightness){
    saturation += Math.floor(Math.random() * -20);
    saturation = saturation < 0 ? 0 : saturation > 100 ? 100 : saturation;
    lightness += Math.floor(Math.random() * (20) - 10);
    lightness = lightness < 0 ? 0 : lightness > 100 ? 100 : lightness;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function spawnParticles(){
    let extension = pointerRadius % 2 == 0 ? pointerRadius / 2 : (pointerRadius - 1) / 2;
    for(let i = -extension; i <= extension; i++){
        for(let j = -extension; j <= extension; j++){
            if(x + i < 0 || x + i > canvas.width - 1 || y + j < 0 || y + j > canvas.height - 1 || Math.random() < .05) continue;
            let newColor = varyColor(color["hue"], color["saturation"], color["lightness"]);
            grid.set(x + i, y + j, new Sand(newColor, false));
        }
    }
    color["hue"] = color["hue"] == 360 ? 0 : color["hue"] + 1;
    // console.log(color["hue"]);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // if(grid.shouldDraw()){
        console.log("Here");
        grid.update();
        grid.draw(ctx);
    // }
    // }else{
    //     clearInterval(drawIntervalId);
    // }
    ctx.beginPath();
    ctx.arc(x, y, pointerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${color["hue"]}, ${color["saturation"]}%, ${color["lightness"]}%)`;;
    ctx.fill();
}

setInterval(draw, 33.33);