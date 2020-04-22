document.addEventListener('DOMContentLoaded', function(){
    const isDebugging = true; //make it false before deploying
    var hitPosition;
    var currentLoc,prevLoc;
    var score=0;
    var leftTime = 60;
    var timeIn = null;
    var moveMole = null;
    const scoreBoard = document.getElementById("scoreBoard");

    document.getElementById('start').addEventListener('click', startGame);
    
    function startGame(){
        moveMole = setInterval(function(){
            try{
                document.querySelector(".mole").classList.remove('mole');
            } catch(e){
                print(e);
            }
            currentLoc = Math.floor(Math.random());
            while(currentLoc == prevLoc){
                currentLoc = Math.floor(Math.random()*8);
                print("repeating the randomization");
            }
            print("move location is "+currentLoc);
            document.getElementById(currentLoc).classList.add('mole');
            print("html changed");
            
            prevLoc = currentLoc;
        }, 1000)
    
        timeIn = setInterval(function(){ //countdown of 60 sec
            if(!leftTime){
                clearInterval(timeIn);
                alert("GAME OVER, your score is "+score);
                ResetGame();
                return;
            }
            leftTime--;
            //print("time decreased");
            document.querySelector("#time-left").textContent = leftTime; //write the time left
        }, 1000)    
    }
    function print(msg){
        if(isDebugging)
            console.log('debug message: '+msg);
    }
    function hit(){
        hitPosition = this.getAttribute('id');
        print("hitPosition: "+hitPosition);
        print("currentLoc: "+currentLoc);
        if(hitPosition == currentLoc){
            score++;
            print("score: "+score);
            scoreBoard.textContent = score;
        }
    }

    function DrawBoard(){ // draw the board with the eventlistenrs
        var board=document.querySelector(".board");
        for(var i = 0; i< 9; i++){
            var square = document.createElement("div");
            square.setAttribute('class','square');
            square.setAttribute('id',i);
            square.addEventListener('click', hit)
            board.appendChild(square);
        }
    }
    DrawBoard();
    
    function ResetGame(){
        clearInterval(timeIn);
        clearInterval(moveMole);
        score = 0;
        leftTime = 60;
        document.querySelector(".mole").classList.remove('mole');
    }
    
})