square_colors = [];
var num_squares = 9;
var actualColor;
var pickedColor;
var h3 = document.querySelector("#colorDisp");
var message = document.querySelector("#message");
var menu = document.querySelector(".menu");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
hard.classList.add("current");
var accomplished = new Audio("accomplished.mp3"); // buffers automatically when created
var highfive = new Audio("highfive.mp3"); // buffers automatically when created
var legendary = new Audio("legendary.mp3"); // buffers automatically when created

var cnt = 0;

reset.addEventListener("click", generate);
easy.addEventListener("click", levelChange);
hard.addEventListener("click", levelChange);
function levelChange() {
    hard.classList.add("current");
    easy.classList.remove("current");
    num_squares = 9;
    if (this.innerText == "EASY") {
        num_squares = 6;
        hard.classList.remove("current");
        easy.classList.add("current");
    }
    generate();
}

generate();

function stopIt(sound_var) {
    sound_var.pause();
    sound_var.currentTime = 0;
}

function generate() {
    stopIt(accomplished);
    stopIt(highfive);
    legendary.play();
    squares_list = document.querySelectorAll(".square");
    square_colors = [];
    for (i = 0; i < num_squares; i++) {
        var a1 = randNumber(255);
        var a2 = randNumber(255);
        var a3 = randNumber(255);
        var colorStr = "rgb(" + a3 + ", " + a2 + ", " + a1 + ")";
        //colorStr=`rgb(${[1,2,3].map(x=>Math.random()*256|0)})`;
        console.log(colorStr);
        square_colors.push(colorStr);
        squares_list[i].style.display = "block";
        squares_list[i].style.background = colorStr;
        squares_list[i].addEventListener("click", judgeChoice);
        //console.log(squares_list[i].getAttribute("background-color"));
        //console.log(colorStr);
    }
    for (i = num_squares; i < 9; i++) {
        squares_list[i].style.display = "none";
    }
    var idx = randNumber(num_squares - 1);
    pickedColor = square_colors[idx];
    h3.innerText = pickedColor;
    message.innerText = "";
    menu.style.background = "steelblue";
    reset.innerText = "RESET COLORS";
}


function randNumber(limit) {
    var a = Math.floor(Math.random() * (limit + 1));
    return a;
}

function judgeChoice() {
    var status = false;
    console.log("CHECKING");
    console.log(this.style.background);
    console.log(pickedColor);

    if (this.style.background === pickedColor) {
        status = true;
    }
    if (status == false) {
        message.innerText = "TED is disappointed!";
        this.style.background = "#232323";

    }
    else {
        message.innerText = "AWESOME";
        cnt++;
        stopIt(accomplished);
        stopIt(highfive);
        stopIt(legendary);
        if (cnt % 2 == 0) {
            accomplished.play();
        }
        else {
            highfive.play();
        }


        for (i = 0; i < num_squares; i++) {
            squares_list[i].style.background = pickedColor;
        }

        menu.style.background = pickedColor;
        reset.innerText = "PLAY AGAIN ?"
    }
    console.log(status);
}