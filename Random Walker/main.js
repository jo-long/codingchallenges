//Maybe add the ability to spawn multiple walkers at different points?
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height / 2;

let rgb = [Math.floor(Math.random() * (256)), Math.floor(Math.random() * (256)), Math.floor(Math.random() * (256))]
let hsl = [Math.floor(Math.random() * (361)), Math.floor(Math.random() * (101)), Math.floor(Math.random() * (101))]

function draw(){
   for(let i = 0; i < 1000; i++){
        step();
   }
}

function step(){
    x += Math.floor(Math.random() * (3)) - 1;
    y += Math.floor(Math.random() * (3)) - 1;

    x = x > canvas.width ? canvas.width : x < 0 ? 0 : x;
    y = y > canvas.height ? canvas.height : y < 0 ? 0 : y;

    // for(let i = 0; i < rgb.length; i++){
    //     rgb[i] += Math.floor(Math.random() * (3)) - 1;
    //     rgb[i] = rgb[i] > 255 ? 255 : rgb[i] < 0 ? 0 : rgb[i];
    // }

    for(let i = 1; i < hsl.length; i++){
        hsl[i] += Math.floor(Math.random() * (3)) - 1;
        hsl[i] = hsl[i] > 100 ? 100 : hsl[i] < 0 ? 0 : hsl[i];
    }

    // ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]}, ${rgb[2]})`;
    ctx.fillStyle = `hsl(${hsl[0]},${hsl[1]}%, ${hsl[2]}%)`;
    ctx.fillRect(x, y, 1, 1);
}

setInterval(draw, 33.33);