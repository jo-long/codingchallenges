class Symbol{
    constructor(x, y, fontSize, heightLimit){
        this.characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.heightLimit = heightLimit;
    }

    draw(ctx){
        let text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        ctx.fillText(text, this.x * this.fontSize, this.y * this.fontSize);
        if(this.y * this.fontSize > this.heightLimit && Math.random() > .98){
            this.y = 0;
        }else{
            this.y += 1;
        }

    }
}