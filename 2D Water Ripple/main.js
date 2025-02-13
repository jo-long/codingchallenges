const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
let data = imageData.data;

let current = Array.from({length: canvas.width}, () => Array(canvas.height).fill(0));
let previous = Array.from({length: canvas.width}, () => Array(canvas.height).fill(0));

let dampening = 0.99;

canvas.addEventListener("mousemove", (e) =>{
    let x = Math.floor(e.clientX - canvas.getBoundingClientRect().left);
    let y = Math.floor(e.clientY - canvas.getBoundingClientRect().top);
    console.log(`${x}, ${y}`);
    if(x >= canvas.width || x <= 0 || y >= canvas.height || y <= 0) return;
    x = x == canvas.width - 1 ? canvas.width - 2 : x;
    y = y == canvas.height - 1 ? canvas.height -2 : y;
    previous[x][y] = 5000;

});

function draw(){
    for(let i = 1; i < canvas.width - 1; i++){
        for(let j = 1; j < canvas.height - 1; j++){
            current[i][j] = (   previous[i - 1][j] + 
                                previous[i + 1][j] + 
                                previous[i][j - 1] + 
                                previous[i][j + 1]) /
                                2 - current[i][j];
            current[i][j] = current[i][j] * dampening;

            let index = (i + j * canvas.width) * 4;
            data[index] = current[i][j];
            data[index + 1] = current[i][j];
            data[index + 2] = current[i][j];
            data[index + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
    let temp = previous;
    previous = current;
    current = temp;
}

setInterval(draw, 16.67);