const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "./images/dragon.jpeg";
let particles = [];
let numParticles = 20000;
let mappedImage = [];


image.addEventListener("load", function(){
    canvas.width = image.naturalWidth *.5;
    canvas.height = image.naturalHeight * .5;
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let y = 0; y < canvas.height; y++){
        let row = [];
        for(let x = 0; x < canvas.width; x++){
            const red = pixels.data[((y * canvas.width) + x) * 4];
            const green = pixels.data[((y * canvas.width) + x) * 4 + 1];
            const blue = pixels.data[((y * canvas.width) + x) * 4 + 2];
            const brightness = calculateRelativeBrightness(red, green, blue)/100;
            const color = `rgb(${red}, ${green}, ${blue})`;
            row.push({brightness: brightness, color: color});
        }
        mappedImage[y] = row;
    }
    init();
    setInterval(draw, 33.33);
});

function init(){
    for(let i = 0; i < numParticles; i++){
        particles.push(new Particle(canvas.width, canvas.height));
    }
}

function draw(){
    ctx.globalAlpha = .05;
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.2;
    for(let i = 0; i < particles.length; i++){
        if(particles[i].shouldSkip) continue;
        const pixel = mappedImage[particles[i].pixY][particles[i].pixX];
        particles[i].update(pixel.brightness, pixel.color);
        ctx.globalAlpha = particles[i].speed * 0.5;
        particles[i].draw(ctx);
    }
}

function calculateRelativeBrightness(red, green, blue){
    return Math.sqrt((red * red) * .299 + (green * green) * .587 + (blue * blue) * .114);
}
