function Game(){
    return{
        win: "Du vann!",
        loose: "OOOPS!",
        secretList: ["QUITO", "CANBERRA", "REYKJAVIK", "OTTAWA", "CONAKRY", "YAMOUSSOUKRO", "KINGSTON", "TBILISI", "SANAA", "ISLAMABAD","MAJURO","HELSINGFORS","WELLINGTON"],
        // secretList: ["FRANKRIKE", "SVERIGE", "NORGE", "FINLAND", "DANMARK", "TYSKLAND", "MEXIKO", "UGANDA", "INDIEN", "THAILAND"],
        secret: "",
        guess:"",
        drawArray:[
            {
                id: "right foot",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(300,247);
                    ctx.lineTo(300,247);
                    ctx.lineTo(320,247);
                    ctx.stroke();
                }
            },
            {
                id: "right leg",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(250,153);
                    ctx.lineTo(250,153);
                    ctx.lineTo(300,247);
                    ctx.stroke();
                }
            },
            {
                id: "left foot",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(200,247);
                    ctx.lineTo(200,247);
                    ctx.lineTo(180,247);
                    ctx.stroke();
                }
            },
            {
                id: "left leg",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(250,153);
                    ctx.lineTo(250,153);
                    ctx.lineTo(200,247);
                    ctx.stroke();
                }
            },
            {
                id: "right arm",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(250,96);
                    ctx.lineTo(250,96);
                    ctx.lineTo(300,147);
                    ctx.stroke();
                }
            },
            {
                id: "left arm",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(250,96);
                    ctx.lineTo(250,96);
                    ctx.lineTo(200,147);
                    ctx.stroke();
                }
            },
            {
                id: "body",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(250,88);
                    ctx.lineTo(250,88);
                    ctx.lineTo(250,153);
                    ctx.stroke();
                }
            },
            {
                id: "head",
                draw(ctx){
                    ctx.beginPath();
                    ctx.arc(250, 68, 20, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            },
            {
                id: "rope",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(250,20);
                    ctx.lineTo(250,20);
                    ctx.lineTo(250,47);
                    ctx.stroke();
                }
            },
            {
                id: "bracket",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(150,20);
                    ctx.lineTo(150,20);
                    ctx.lineTo(100,50);
                    ctx.stroke();
                }
            },
            {
                id: "crossbeam",
                draw(ctx){
                    ctx.beginPath();
                    ctx.moveTo(100,20);
                    ctx.lineTo(100,20);
                    ctx.lineTo(250,20);
                    ctx.stroke();
                }
            },
            {
                id:"beam", 
                draw (ctx){
                    ctx.beginPath();
                    ctx.moveTo(100,250);
                    ctx.lineTo(100,250);
                    ctx.lineTo(100,20);
                    ctx.stroke()
                }
            },
            {
                id:"hill", 
                draw (ctx){
                    ctx.beginPath();
                    ctx.arc(100, 320, 70,Math.PI,0, false);
                    ctx.stroke();
                }
            }],
            
            guessComplete: [],
            winDisplay: document.querySelector("#finished"),
            counter: 13,
            canvas: document.querySelector("#graph"),
            
            init(){
                let guessBtn = document.querySelector(".btn")
                let guessValue = document.querySelector("#guess")
                temp=Math.floor(Math.random()*this.secretList.length)
                this.secret = this.secretList[temp];
                // console.log(this.secret)
                this.drawBoxes(this.secret)
                guessBtn.addEventListener("click", event=>{
                    this.guess = "";
                    this.guess = guessValue.value;
                    this.guessHandler(this.guess)
                    guessValue.value = ""
                    guessValue.focus();
                    
                })
                guessValue.addEventListener("keyup", e=>{
                    if(e.key==="Enter"){
                        this.guess = "";
                        this.guess = guessValue.value;
                        this.guessHandler(this.guess)
                        guessValue.value = ""
                    }
                })
            },
            
            drawBoxes(word){
                const displayArea = document.querySelector(".word-display");
                let times = word.length
                for (let i=0; i<times; i++){
                    let charContainer = document.createElement("div");
                    charContainer.className = "char"
                    displayArea.appendChild(charContainer);
                    
                }
            },
            
            updateBoxes(word){
                let charContainer = document.querySelectorAll(".char");
                
                for (let i=0; i<charContainer.length; i++){
                    if(word[i]==this.guess){
                        charContainer[i].innerText = this.guess;
                        this.checkComplete(charContainer)
                    }
                    
                }
            },
            
            guessHandler(guess){
                this.guess = guess.toUpperCase();
                if(this.secret.includes(this.guess)){
                    this.updateBoxes(this.secret);
                }else{
                    let prev = document.querySelector(".prev");
                    let guessChar = document.createElement("p");
                    prev.appendChild(guessChar);
                    guessChar.innerText = this.guess;
                    this.counter += -1;
                    if(this.counter>=0){
                        const ctx = this.canvas.getContext('2d');
                        ctx.lineWidth = 1.5;
                        this.drawArray[this.counter].draw(ctx)
                    }
                    if(this.counter<=0){
                        this.gameOver();
                    }
                }
            },
            
            checkComplete(correctGuesses){
                this.guessComplete=[]
                let checkWord
                for(let item of correctGuesses){
                    if(!item.innerText==""){
                        this.guessComplete.push(item.innerText)
                        checkWord = this.guessComplete.join("") 
                        if(checkWord === this.secret) {
                            this.youWon(); 
                            
                        }
                    }
                }
            },
            
            youWon(){
                this.winDisplay.className = "finished"
                let victory = document.createElement("h1")
                this.winDisplay.append(victory);
                victory.innerText = this.win;
            },
            
            gameOver(){
                this.winDisplay.className = "red"
                let loss = document.createElement("h1")
                this.winDisplay.append(loss);
                loss.innerText = this.loose;
            },
            
            
            
        }
    }
    
    let game = new Game();
    
    game.init()