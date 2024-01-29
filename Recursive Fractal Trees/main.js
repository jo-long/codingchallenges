const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const slider = document.getElementById("myRange");
let angle = slider.value * Math.PI / 180;
slider.addEventListener("input", function(e){
    angle = e.target.value * Math.PI / 180;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
});

draw();

function draw(){
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(300, canvas.height);
    branch(150);
}

function branch(len){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.translate(0, -len);

    if(len > 1){
        ctx.save();
        ctx.rotate(angle);
        branch(len * 0.67);
        ctx.restore();
        ctx.save();
        ctx.rotate(-angle);
        branch(len * 0.67);
        ctx.restore();
    }

    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(0, -len * 0.67);
    // ctx.strokeStyle = "white";
    // ctx.stroke();


}