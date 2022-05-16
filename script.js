let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let canvasParent = document.querySelector(".canvas-parent");

let parentHeight = canvasParent.clientHeight;
let parentWidth = canvasParent.clientWidth;

canvas.height = parentHeight;
canvas.width = parentWidth;

context.textAlign = "center";
context.textBaseline = "middle";
context.fillText("KLiknij na tą powierzchnię", canvas.width / 2, canvas.height / 2);


let start = document.getElementById("start");
let timeText = document.getElementById("time-text");

let GameStatus = {
    STOP: 1,
    START: 2,
}

let status = GameStatus.STOP;
var timeout1;
var timeout2;
let timeNow;
let timeLater;
let playTime;

function getRandomTime(min, max){
    let result = Math.floor(Math.random() * Math.floor(max)) + min;
    result = result * 1000;
    return result;
}

function endGame(){
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    canvas.style.background = "aqua";
    start.innerHTML = "Zacznij grę";
    status = GameStatus.STOP;
}

function timeout1Function(time){
    timeout1 = setTimeout(function(){
        canvas.style.background = "green";
        let date1 = new Date();
        timeNow = date1.getTime();
        
        canvas.addEventListener("click", function(){
            let date2 = new Date();
            timeLater = date2.getTime();
            playTime = (timeLater - timeNow);
            timeText.innerHTML = playTime + " ms";
        });
    }, time);
}

function timeout2Function(time){
    timeout2 = setTimeout(function(){
        endGame();
    }, time);
}

function startGame(){
    let changeTime = getRandomTime(1, 8);
    let endTime = changeTime + 5000;
    status = GameStatus.START;
    canvas.style.background = "red";

    timeout1Function(changeTime);
    timeout2Function(endTime);
    
}

start.addEventListener("click", function(){
    if (status === GameStatus.START){
        endGame();
    }else{
        startGame();
        this.innerHTML = "Zatrzymaj grę";
    }
});

canvas.addEventListener("click", function(){
    endGame();
});
