const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let dots = [];
const amount = 9;
ctx.lineWidth = 4;
ctx.strokeStyle = "white";
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height * .1, 0, 2 * Math.PI);
ctx.stroke();
for(let i = 0; i < amount; i++){
    const angle = (i / amount) * Math.PI * 2;
    const x = Math.sin(angle) * canvas.height * .1 + (canvas.width / 2);
    const y = Math.cos(angle) * canvas.height * .1 + (canvas.height / 2);
    dots.push(new Dot(angle, x, y, 0, canvas.width, canvas.height));
}

function draw(){
    for(let i = dots.length - 1; i >= 0; i--){
        const dot = dots[i];
        dots = dot.update(dots);
        dot.draw(ctx);
        if(dot.stop || dot.isOut()){
            dots.splice(i, 1);
        }
    }
}

setInterval(draw, 33.33);