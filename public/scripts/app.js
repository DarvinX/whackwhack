document.addEventListener('DOMContentLoaded', function() {
    const isDebugging = true; //make it false before deploying
    var hitPosition;
    var currentLoc, prevLoc;
    var score = 0;
    var leftTime = 60;
    const moveInterval = 900;
    var timeIn = null;
    var moveMole = null;
    const defaultPic = "https://s1.piq.land/2012/02/04/n8yEHP5FWq4txktHwxbKqA1g_400x400.png";
    const scoreBoard = document.getElementById("scoreBoard");
    const timeLeftElement = document.querySelector("#time-left");

    document.getElementById('start-button').addEventListener('click', StartGame);
    document.getElementById('reset-button').addEventListener('click', ResetGame)

    function StartGame() {
        moveMole = setInterval(function() {
            try {
                document.querySelector(".mole").classList.remove('mole');
            } catch (e) {
                print(e);
            }
            currentLoc = Math.floor(Math.random());
            while (currentLoc == prevLoc) {
                currentLoc = Math.floor(Math.random() * 8);
                print("repeating the randomization");
            }
            print("move location is " + currentLoc);
            document.getElementById(currentLoc).classList.add('mole');
            print("html changed");

            prevLoc = currentLoc;
        }, moveInterval)

        timeIn = setInterval(function() { //countdown of 60 sec
            if (!leftTime) {
                clearInterval(timeIn);
                alert("GAME OVER, your score is " + score);
                ResetGame();
                return;
            }
            leftTime--;
            //print("time decreased");
            timeLeftElement.textContent = leftTime; //write the time left
        }, 1000)
    }

    function print(msg) {
        if (isDebugging)
            console.log('debug message: ' + msg);
    }

    function hit() {
        console.log(this);
        hitPosition = this.getAttribute('id');
        print("hitPosition: " + hitPosition);
        print("currentLoc: " + currentLoc);
        if (hitPosition == currentLoc) {
            score++;
            print("score: " + score);
            scoreBoard.textContent = score;
        }
    }

    document.querySelectorAll(".square").forEach(function(e) {
        console.log(e);
        e.addEventListener('click', hit);
    })

    function ResetGame() {
        clearInterval(timeIn);
        clearInterval(moveMole);

        score = 0;
        leftTime = 60;
        scoreBoard.textContent = 0;
        timeLeftElement.textContent = 60;
        document.querySelector(".mole").classList.remove('mole');
    }

    document.querySelector("input[type='file']").addEventListener('change', function() {
        let img = document.querySelector("#img-preview");
        img.src = URL.createObjectURL(this.files[0]);
        console.log(img.src)
        img.onload = function() {
            img.hidden = false;
            document.querySelector("#select-btn").addEventListener("click", function() {
                print("insile the set this click elent");
                let sheet = document.createElement("style");
                sheet.innerHTML = ".mole {background: URL(" + img.src + ");background-size: 6.5rem;}";
                sheet.id = "moleStyle";
                document.body.appendChild(sheet);
                document.querySelector("#current-pic").src = img.src;
                img.hidden = true;
                document.querySelector("#rst-pic-btn").addEventListener("click", function() {
                    try {
                        document.getElementById("#moleStyle").parentNode.removeChild(document.querySelector("#moleStyle"));
                    } catch {
                        print("tried to delete a default picture");
                    }
                    document.querySelector("#current-pic").src = defaultPic;
                })
            })
        }
    })
})