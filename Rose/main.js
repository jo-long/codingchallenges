const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgba(0, 0, 0, .5)";

let frequence = 0;
let phi = 0;
let frames = 0;
let numSpirals = 6;

function draw(){
    let a = 0;
    let amplitude = 1;
    frames += .5;
    phi += .05;
    frequence -= .0005 * Math.sin(frames * Math.PI / 180);
    ctx.clearRect(0, 0, canvas.width, canvas);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < numSpirals; i++){
        drawSpiral(a, amplitude, phi, frequence, i * Math.PI / (numSpirals / 2));
    }

}

function drawSpiral(a, amplitude, phi, frequence, increment){
    for(let i = 0; i < 100; i++){
        a += frequence;
        amplitude += 1;
        let _x = Math.cos(a + increment + phi) * amplitude + canvas.width / 2;
        let _y = Math.sin(a + increment + phi) * amplitude + canvas.height / 2;
        ctx.strokeStyle = `hsl(0, 70%, ${i}%)`;
        drawRect(i / 2, i / 2, _x, _y, Math.PI - a);

    }
}

function drawRect(w, h, x, y, theta){
    ctx.beginPath();
    for(let i = 45; i < 405; i += 90){
        let angle = i * Math.PI / 180;
        let _x = x + w * Math.cos(angle) * Math.cos(theta) - h * Math.sin(angle) * Math.sin(theta);
        let _y = y + w * Math.cos(angle) * Math.sin(theta) + h * Math.sin(angle) * Math.cos(theta);
        ctx.lineTo(_x, _y);
    }
    ctx.closePath();
    ctx.stroke();
}

setInterval(draw, 16.67);