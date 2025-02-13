const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let intervalId;
let mousedown = false;
let pointerRadius = 5;
let x, y;

let grid = new Grid(canvas.width, canvas.height);
let color = {"hue" : 40, "saturation" : 65, "lightness" : 61};

canvas.addEventListener("mousedown", (e) =>{
    mousedown = true;
    let x = Math.floor(e.clientX - canvas.getBoundingClientRect().left);
    let y = Math.floor(e.clientY - canvas.getBoundingClientRect().top);
    if(x >= canvas.width || x <= 0 || y >= canvas.height || y <= 0) return;
    intervalId = setInterval(function(){setGrid()}, 33.33);
});

canvas.addEventListener("mousemove", (e) =>{
    // if(!mousedown) return;
    let newX = Math.floor(e.clientX - canvas.getBoundingClientRect().left);
    let newY = Math.floor(e.clientY - canvas.getBoundingClientRect().top);
    if(newX >= canvas.width || newX <= 0 || newY >= canvas.height || newY <= 0) return;
    x = newX;
    y = newY;
    // let newColor = varyColor(color["hue"], color["saturation"], color["lightness"]);
    // grid.set(x, y, newColor);
});

canvas.addEventListener("mouseup", (e) =>{
    mousedown = false;
    clearInterval(intervalId);
});

function varyColor(hue, saturation, lightness){
    saturation += Math.floor(Math.random() * -20);
    saturation = saturation < 0 ? 0 : saturation > 100 ? 100 : saturation;
    lightness += Math.floor(Math.random() * (20) - 10);
    lightness = lightness < 0 ? 0 : lightness > 100 ? 100 : lightness;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, pointerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${color["hue"]}, ${color["saturation"]}%, ${color["lightness"]}%)`;;
    ctx.fill();
    for(let i = 0; i < grid.grid.length; i++ ){
        for(let j = 0; j < grid.grid[i].length; j++){
            //ctx.fillStyle = "black";
            if(grid.isEmpty(i, j)) continue;
            ctx.fillStyle = grid.grid[i][j];
            ctx.fillRect(i, j, 1, 1);
        }
    }
    update();
}

function update(){
    for(let j = grid.grid[0].length - 1; j > 0; j--){
        let renderSide = Math.random() > 0.5;
        for(let i = 0; i < grid.grid.length; i++){
            let tmp = i;
            i = renderSide ? i : -i + grid.grid.length - 1;
            if(grid.isEmpty(i, j)){
                i = tmp;
                continue;
            }

            let bottom = grid.isEmpty(i, j + 1);
            let bottomL = i > 0 && grid.isEmpty(i - 1, j + 1);
            let bottomR = i < grid.grid.length - 1 && grid.isEmpty(i + 1, j + 1);

            if(bottom){
                grid.swap(i, j, i, j + 1);
            }else if(bottomL && bottomR){
                let dir = Math.random() < 0.5 ? 1 : -1;
                grid.swap(i, j, i + dir, j + 1);
            }else if(bottomL){
                grid.swap(i, j, i - 1, j + 1);
            }else if(bottomR){
                grid.swap(i, j, i + 1, j + 1);
            }

            i = tmp;
        }
    }
}

function setGrid(){
    let extension = pointerRadius % 2 == 0 ? pointerRadius / 2 : (pointerRadius - 1) / 2;
    for(let i = -extension; i <= extension; i++){
        for(let j = -extension; j <= extension; j++){
            if(x + i < 0 || x + i > canvas.width - 1 || y + j < 0 || y + j > canvas.height - 1 || Math.random() < .05) continue;
            let newColor = varyColor(color["hue"], color["saturation"], color["lightness"]);
            grid.set(x + i, y + j, newColor);
        }
    }
    // color["hue"] = color["hue"] == 360 ? 0 : color["hue"] + 1;
    // console.log(color["hue"]);
}

setInterval(draw, 33.33);

