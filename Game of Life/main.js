const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const size = 5;
const margin = 2;
const cols = canvas.width / size;
const rows = canvas.height / size;

let grid = new Grid(cols, rows, size);

canvas.addEventListener("mousemove", (e) =>{
    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = e.clientY - canvas.getBoundingClientRect().top;
    console.log(`${x}, ${y}`)
    if(x > canvas.width || x < 0 || y > canvas.height || y < 0){
        return;
    }

    for (let i = -margin; i < margin; i++) {
        for (let j = -margin; j < margin; j++) {
            const xIndex = (Math.floor(x/size) + i + cols) % cols;
            const yIndex = (Math.floor(y/size) + j + rows) % rows;
            grid.cells[xIndex][yIndex] = 1;
        }
    }
});


function draw(){
    grid.update();
    grid.display(ctx);
}

setInterval(draw, 33.33);