const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
let data = imageData.data;

let blobs = [];

for(let i = 0; i < 15; i++){
    blobs.push(new Blob(Math.random() * canvas.width, Math.random() * canvas.height));
}



function draw(){
    for(let y = 0; y < canvas.height; y++){
        for(let x = 0; x < canvas.width; x++){
            let sum = 0;
            for(let i = 0; i < blobs.length; i++){
                let xDif = x - blobs[i].x;
                let yDif = y - blobs[i].y;

                let d = Math.sqrt((xDif * xDif) + (yDif * yDif));

                sum += 10 * blobs[i].r / d;
            }
            let colors = hsl2rgb(sum % 360, 1, 0.5);
            data[(y*4) * canvas.width + (x*4)] = Math.floor(colors[0] * 255.999); // Red
            data[(y*4) * canvas.width + (x*4) + 1] = Math.floor(colors[1] * 255.999); // Green
            data[(y*4) * canvas.width + (x*4) + 2] = Math.floor(colors[2] * 255.999); // Blue
            data[(y*4) * canvas.width + (x*4) + 3] = 255;
            
        }
    }

    ctx.putImageData(imageData, 0, 0);

    for(let i = 0; i < blobs.length; i++){
        blobs[i].update(canvas.width, canvas.height);
    }
}

function hsl2rgb(h,s,l) 
{
   let a=s*Math.min(l,1-l);
   let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
   return [f(0),f(8),f(4)];
}

setInterval(draw, 33)
