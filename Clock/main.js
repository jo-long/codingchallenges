const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawClock(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height /2);
    ctx.rotate(-90 * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height /2);

    let time = new Date();

    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hour = time.getHours();
    
    let secondsAngle = seconds * 6;
    let minutesAngle = minutes * 6;
    let hourAngle = (hour % 12) * 30

    ctx.lineWidth = 8;
    
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, secondsAngle * Math.PI / 180);
    ctx.strokeStyle = "#FC3C19";
    ctx.stroke();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height /2);
    ctx.rotate(secondsAngle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height /2);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + 75, canvas.height / 2);
    ctx.strokeStyle = "#FC3C19";
    ctx.stroke();
    ctx.restore();
    
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 125, 0, minutesAngle * Math.PI / 180);
    ctx.strokeStyle = "#1967FC";
    ctx.stroke();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height /2);
    ctx.rotate(minutesAngle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height /2);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + 55, canvas.height / 2);
    ctx.strokeStyle = "#1967FC";
    ctx.stroke();
    ctx.restore();
    
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, hourAngle * Math.PI / 180);
    ctx.strokeStyle = "#B5FC19";
    ctx.stroke();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height /2);
    ctx.rotate(hourAngle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height /2);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + 35, canvas.height / 2);
    ctx.strokeStyle = "#B5FC19";
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height /2, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.font = "40px monospace"
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(`${hour % 12 > 9 ? hour % 12 : "0" + hour % 12}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`, canvas.width/2, 9 * canvas.height/10);
}

setInterval(drawClock, 100);