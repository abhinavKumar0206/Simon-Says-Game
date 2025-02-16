let gameSeq = [];
let userSeq = [];

let btns = ['red', 'yellow', 'green', 'purple'];

let started = false;
let level = 0;
let highestScore = 0;

document.addEventListener("keypress", function () {
    if (started == false) {
        document.querySelector("h2").innerText = "Game Started";
        started = true;

        levelUp();
    }
});

let gameFlash = function (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
};

let userFlash = function (btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
};

function levelUp() {
    userSeq = [];
    level++;
    document.querySelector("#level").innerText = level;

    if (level > highestScore) {
        highestScore = level;
        document.querySelector("#highest-score").innerText = highestScore;
    }

    let randomIndx = Math.floor(Math.random() * 4);
    let randomCol = btns[randomIndx];
    let randombtn = document.querySelector(`.btn-${randomCol}`);
    gameSeq.push(randomCol);
    gameFlash(randombtn);
}

function matchSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        document.querySelector('h2').innerHTML = `Try Again!<b> Your Score : ${level}</b> <br>Press any key to start the new game</br>`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnPress() {
    if (started == true) {
        let btn = this;
        userFlash(btn);
        let userColor = btn.getAttribute('id');
        userSeq.push(userColor);
        matchSeq(userSeq.length - 1);
    }
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    document.querySelector("#level").innerText = level;
}