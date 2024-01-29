const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let order = 8;
let N = Math.floor(Math.pow(2, order));
let total = N * N;

let path = [];
let counter = 0;
let step = 12;
counter += step;

for(let i = 0; i < total; i++){
    path[i] = hilbert(i);
    let len = canvas.width / N;
    path[i][0] = path[i][0] * len;
    path[i][1] = path[i][1] * len;
    path[i][0] = path[i][0] + len/2;
    path[i][1] = path[i][1] + len/2;
}

function draw(){
    if(counter == 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    let offset = ((Math.ceil(counter / step) - 1) * step) - 1;
    offset = offset < 0 ? 0 : offset;
    //console.log(`Counter is ${counter} and path length is ${path.length}`);
    for(let i = 1 + offset; i < counter; i++){
        //console.log(`i is ${i}`);
        let h = i * 360 / path.length;
        ctx.beginPath();
        ctx.moveTo(path[i][0], path[i][1]);
        ctx.lineTo(path[i-1][0], path[i-1][1]);
        ctx.strokeStyle = `HSL(${h}, 100%, 50%)`;
        ctx.stroke();
    }

    counter += counter + step > path.length ? path.length - counter <= 0 ? 1 : path.length - counter : step;
    if(counter > path.length){
        counter = 0;
    }
}

function hilbert(i){
    const points = [
        [0, 0],
        [0, 1],
        [1, 1,],
        [1, 0]
    ];

    let index = i & 3;
    let v = points[index];

    for(let j = 1; j < order; j++){
        i = i >>> 2;
        index = i & 3;
        let len = Math.pow(2, j);
        if(index == 0){
            let tmp = v[0];
            v[0] = v[1];
            v[1] = tmp;
        }else if(index == 1){
            v[1] += len;
        }else if(index == 2){
            v[0] += len;
            v[1] += len;
        }else if(index == 3){
            let tmp = len - 1 - v[0];
            v[0] = len - 1 - v[1];
            v[1] = tmp;
            v[0] += len;
        }
    }
    return v;
}

setInterval(draw, 33.33);