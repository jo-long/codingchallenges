class Effect{
    constructor(width, height, fontSize){
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
        this.columns = this.width / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }

    #initialize(){
        for(let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.height);
        }
    }
}