window.onload= function(){
    let pads= document.querySelectorAll(".pad");
    let gameStateOn=false;
    let gameStarted = false;
    let gameStrict = false;
    let canClickPad = false;
    let level =1;
    let correctCount=0;
    let totalLevel =20;
    let countText = document.querySelector(".count-text");
    let randomGeneratedPattern;
    const patterns =[0,1,1,2,3,2,4,1,0];
    
    document.querySelector(".start").addEventListener("click",function(){
        if(gameStateOn){
            gameStarted = true;
            PlayPattern(level);
        }
    });
    document.querySelector(".gameStateButton--outer").addEventListener('click',function(){
        gameStateOn=!gameStateOn;
        if(gameStateOn){
            document.querySelector(".gameStateButton--inner").classList.add("right"); // translates the button to right
            updateCountDisplay("- -");
        }else{
            document.querySelector(".gameStateButton--inner").classList.remove("right");
            Reset();
        }
    });

    document.querySelector(".strict--button").addEventListener("click",function(){
        if(!gameStarted){
            gameStrict = !gameStrict;
            if(gameStrict){
                document.querySelector(".strict--glowArea").style.backgroundColor="#dc0d29";
            }else{
                document.querySelector(".strict--glowArea").style.backgroundColor="#32050c";
            }
        }
    })
    function Reset(){
        gameStateOn=false;
        gameStarted=false;
        gameStrict=false;
        level=1;
        correctCount=0;
        document.querySelector(".strict--glowArea").style.backgroundColor="#32050c";
        updateCountDisplay("");
    }
    for(let pad of pads){
        pad.addEventListener('mousedown',onPadClick,false);
        pad.addEventListener('mouseup',removePadClick,false);

        function onPadClick(e){
            if(gameStarted && canClickPad){
                let pad = e.target;
                if(pad.classList.contains("green")){
                    animatePad("green");
                }else if(pad.classList.contains("red")){
                    animatePad("red");
                }else if(pad.classList.contains("yellow")){
                    animatePad("yellow");
                }else if(pad.classList.contains("blue")){
                    animatePad("blue");
                }
                checkCorrectPadClick(e.target.id);
            }
        }
        function removePadClick(e){
                let pad = e.target;
                if(pad.classList.contains("green")){
                    inAnimatePad("green");
                }else if(pad.classList.contains("red")){
                    inAnimatePad("red");
                }else if(pad.classList.contains("yellow")){
                    inAnimatePad("yellow");
                }else if(pad.classList.contains("blue")){
                    inAnimatePad("blue");
                }
        }
    }
    //plays the pattern 
    function PlayPattern(level){
        updateCountDisplay(level);
        canClickPad = false;
        if(!gameStrict){
            var pattern = patterns;
        }else{
            var pattern = generateRandomPattern(level);
            console.log(pattern);
        }
        for(let i=0;i<level;i++){
           let padName = getColourClass(`${pattern[i]}`);
           setTimeout(function(){
               animatePad(padName);
            },i*800);
           setTimeout(function(){
                inAnimatePad(padName);
           },i*800+400);
        }
        canClickPad=true;
    }
    function generateRandomPattern(patternLength){
        var pattern =[];
        for(let i=0;i<patternLength;i++){
            let singlePattern = Math.floor((Math.random()*3)+1);
            pattern.push(singlePattern);
        }
        randomGeneratedPattern=pattern;
        return pattern;
    }
    function checkCorrectPadClick(padID){
        if(!gameStrict){
            var pattern = patterns;
        }else{
            var pattern = randomGeneratedPattern;
        }
            //if a single correct pattern is clicked
            if(pattern[correctCount] ==padID){
                correctCount++;
            }else if(pattern[correctCount] !=padID){ //if correct pattern is not clicked
                updateCountDisplay("! !");
                canClickPad=false;
                level=1;
                correctCount=0;
                setTimeout(function(){
                    PlayPattern(level);
                },3000);
            }
            if(correctCount == level){//if all the correct pattern in a level is clicked 
                level++;
                if(level == totalLevel){
                    updateCountDisplay("Vic");
                    canClickPad = false;
                    gameStarted = false;
                    level=1;
                    correctCount=0;
                    return;
                }
                correctCount =0;
                setTimeout(function(){
                    PlayPattern(level)
                },1000);
            }
    }
    function updateCountDisplay(text){
        countText.textContent=text;
    }
    function getColourClass(padID){
        let element = document.getElementById(padID);
        return element.classList[1];
    }
    function animatePad(padName){
        let pad = document.querySelector(`.${padName}`);
        pad.classList.add(`${padName}-animated`);
        playAudio(`${padName}-sound`);
    }

    function inAnimatePad(padName){
        let pad = document.querySelector(`.${padName}`);
        pad.classList.remove(`${padName}-animated`);
    }
    function playAudio(name){
        let audio = document.getElementById(name);
        audio.play();
    }
 
}