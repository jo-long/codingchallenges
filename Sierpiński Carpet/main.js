const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
maxIteration = -1;

canvas.addEventListener("click", (e) =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if(maxIteration == 5){
        maxIteration = -1;
        return;
    }
    maxIteration++;
    draw(0, 0, canvas.width, canvas.height, 0);
});

function draw(x, y, width, height, iteration){
    ctx.fillStyle = "white";
    ctx.fillRect(x + width / 3, y + height / 3, width / 3, height / 3);
    if(iteration == maxIteration){
        return;
    }
    iteration++;
    draw(x, y, width / 3, height / 3, iteration);
    draw(x + width / 3, y, width / 3, height / 3, iteration);
    draw(x + (2 * width) / 3, y, width / 3, height / 3, iteration);

    draw(x, y + height / 3, width / 3, height / 3, iteration);
    draw(x + (2 * width) / 3, y + height / 3, width / 3, height / 3, iteration);

    draw(x, y + (2 * height) / 3, width / 3, height / 3, iteration);
    draw(x + width / 3, y + (2 * height) / 3, width / 3, height / 3, iteration);
    draw(x + (2 * width) / 3, y + (2 * height) / 3, width / 3, height / 3, iteration);
    
}
