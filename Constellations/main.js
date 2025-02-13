const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let numParticles = 300;
let maxSpeed = 2;
let particles = [];

for(let i = 0; i < numParticles; i++){
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);
    const xSpeed = Math.floor(Math.random() * maxSpeed) + 1;
    const ySpeed = Math.floor(Math.random() * maxSpeed) + 1;

    const xDir = Math.random() < .5 ? 1 : -1;
    const yDir = Math.random() < .5 ? 1 : -1;

    particles.push(new Particle(x, y, xSpeed * xDir, ySpeed * yDir, canvas.width, canvas.height));
}

function draw(){
    ctx.fillStyle = `hsla(0, 0%, 0%, ${.3 * .3})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(0, 100, 100)";
    for(let p of particles){
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
        ctx.fill();
        drawAttachments(p);
    }

    for(let p of particles){
        p.update();
    }
}

function drawAttachments(particle){
    let attachments = 0;
    for(let p of particles){
        const xDiff = p.x - particle.x;
        const yDiff = p.y - particle.y;
        const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if(distance < 74){
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = setStrokeColor(distance);
            // ctx.globalCompositeOperation = "screen";
            ctx.stroke();
            attachments++;
        }

        if(attachments === 5) return;
    }
}

function setStrokeColor(distance){
    const distanceRatio = distance / 74;
    let hue = distanceRatio * 60;
    hue -= 60 / 2;
    hue += 200;
    if(hue > 360) hue -= 360;
    if(hue < 0) hue += 360;
    hue = Math.floor(hue);
    const alpha = (100 - distanceRatio * distanceRatio * (.5 * .5) * 100) / 100;
    return `hsla(${hue}, 100%, 60%, ${alpha})`;

}


setInterval(draw, 33.33);