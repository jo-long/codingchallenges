const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let minDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
minDimension = minDimension >= 600 ? 600 : minDimension - (minDimension % 10);
canvas.width = minDimension;
canvas.height = minDimension;

window.addEventListener("resize", (e) =>{
    let newMinDimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    newMinDimension = newMinDimension >= 600 ? 600 : newMinDimension - (newMinDimension % 10);
    if(newMinDimension == minDimension) return;
    clearInterval(intervalId);
    minDimension = newMinDimension;
    canvas.width = minDimension;
    canvas.height = minDimension;
    drawClock();
    intervalId = setInterval(drawClock, 33.33);
});

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
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 4, 0, secondsAngle * Math.PI / 180);
    ctx.strokeStyle = "#FC3C19";
    ctx.stroke();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height /2);
    ctx.rotate(secondsAngle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height /2);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + (canvas.width / 8), canvas.height / 2);
    ctx.strokeStyle = "#FC3C19";
    ctx.stroke();
    ctx.restore();
    
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 5 * canvas.width / 24, 0, minutesAngle * Math.PI / 180);
    ctx.strokeStyle = "#1967FC";
    ctx.stroke();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height /2);
    ctx.rotate(minutesAngle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height /2);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + (11 * canvas.width / 120), canvas.height / 2);
    ctx.strokeStyle = "#1967FC";
    ctx.stroke();
    ctx.restore();
    
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 6, 0, hourAngle * Math.PI / 180);
    ctx.strokeStyle = "#B5FC19";
    ctx.stroke();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height /2);
    ctx.rotate(hourAngle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height /2);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + (7 * canvas.width / 120), canvas.height / 2);
    ctx.strokeStyle = "#B5FC19";
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 120, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    let timeString = `${hour % 12 > 9 ? hour % 12 : "0" + hour % 12}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
    setFontSize(40, canvas.width, timeString);
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(timeString, canvas.width/2, 9 * canvas.height/10);
}

function setFontSize(currentSize, widthRestriction, text){
    ctx.font = `${currentSize}px monospace`;
    let width = ctx.measureText(text).width;
    while(width >= widthRestriction){
        currentSize-=5;
        ctx.font = `${currentSize}px monospace`;
        width = ctx.measureText(text).width;
    }
}

let intervalId = setInterval(drawClock, 100);