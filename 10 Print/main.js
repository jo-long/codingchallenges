const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x = 0;
let y = 0;
let spacing = 30;

function draw(){
    console.log("Here");
    if(Math.random() < 0.5){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + spacing, y + spacing);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }else{
        ctx.beginPath();
        ctx.moveTo(x, y + spacing);
        ctx.lineTo(x + spacing, y);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    x += spacing;
    if(x > canvas.width - spacing){
        x = 0;
        y += spacing;
        if(y > canvas.height - spacing){
            console.log("Finished in theory");
            clearInterval(intervalId);
        }
    }
}

let intervalId = setInterval(draw, 100);