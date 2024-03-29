const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let circles = [];
let imageData;
let imgH;
let imgW;
let intervalId;
let img = new Image();
img.src = "kitten.jpg";

img.onload = () => {
    imgH = img.height;
    imgW = img.width;
    canvas.width = imgW * 2;
    canvas.height = imgH;
    ctx.drawImage(img, 0, 0, imgW, imgH);
    imageData = ctx.getImageData(0, 0, imgW, imgH);
    intervalId = setInterval(draw, 100);
};

function draw(){
    let circlesToSpawn = 10;
    let count = 0;
    let attempts = 0;

    while(count < circlesToSpawn){
        let newCircle = createCircle();

        if(newCircle !== null){
            circles.push(newCircle);
            count++
        }

        attempts++;

        if(attempts > 1000){
            clearInterval(intervalId);
            break;
        }
    }

    for(let i = 0; i < circles.length; i++){
        let circle = circles[i];

        if(circle.growing){
            if(circle.touchingEdge(imgW, imgH)){
                circle.growing = false;
            }else{
                for(let j = 0; j < circles.length; j++){
                    let other = circles[j];
                    if(circle !== other){
                        let d = Math.sqrt(Math.pow(other.x - circle.x, 2) + Math.pow(other.y - circle.y, 2));
                        let distance = circle.r + other.r;

                        if(d - 1 < distance){
                            circle.growing = false;
                            break;
                        }
                    }
                }
            }
        }

        circle.show(ctx);
        circle.grow();
    }
}

function createCircle(){
    let x = (Math.random() * imgW) + imgW;//(canvas.width / 2);
    let y = Math.random() * imgH;//canvas.height;

    let valid = true;

    for(let i = 0; i < circles.length; i++){
        let circle = circles[i];
        let d = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
        
        if(d - 2 < circle.r){
            valid = false;
            break;
        }
    }

    if(valid){
        let index = (Math.floor(x) + Math.floor(y) * img.width) * 4;
        let r = imageData.data[index];
        let g = imageData.data[index + 1];
        let b = imageData.data[index + 2];
        return new Circle(x, y, `rgb(${r}, ${g}, ${b})`);
    }else{
        return null;
    }
}
