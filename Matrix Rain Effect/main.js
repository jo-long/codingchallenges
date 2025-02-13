const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const effect = new Effect(canvas.width, canvas.height, 10);
ctx.font = `${effect.fontSize}px monospace`;
ctx.textAlign = "center";

function animate(){
    ctx.fillStyle = "rgba(0, 0, 0, .05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0aff0a";
    for(let symbol of effect.symbols){
        symbol.draw(ctx);
    }
}

setInterval(animate, 33.33);