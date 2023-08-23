var myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
myModal.show();

function fun(p) {
  let sh = document.getElementById("playerWonName");
  if (p === 0) {
    sh.textContent = "Player 1 You Won!!!";
    sh.style.color = "red";
  } else {
    sh.textContent = "Player 2 You Won!!!";
    sh.style.color = "black";
  }
  var myModal = new bootstrap.Modal(document.getElementById("myModal1"), {});
  myModal.show();
  setTimeout(() => {
    myModal.hide();
  }, 3000);
  setTimeout(() => {
    location.reload();
  }, 3500);
}

const startBtn = document.getElementById("startBtn");
const onStart = document.getElementById("onStart");
const endBtn = document.getElementById("endBtn");
const home = document.getElementById("home");
const dice = document.getElementById("dice");
const diceRollBtn = document.getElementById("diceRollBtn");
const sixCountImage = document.getElementById("sixCountImage");
const playerTurnText = document.getElementById("playerTurnText");
const result = document.getElementById("result");
const player1Btn = document.getElementById("player1Btn");
const player2Btn = document.getElementById("player2Btn");
const ladderFrom = [1, 4, 9, 21, 28, 36, 51, 71, 80];
const ladderTo = [38, 14, 31, 42, 84, 44, 67, 91, 100];
const snakeFrom = [16, 47, 49, 56, 62, 63, 87, 93, 95, 98];
const snakeTo = [6, 26, 30, 53, 19, 60, 24, 73, 75, 78];
result.textContent = "";
let player = 0;
let player1sum = 0;
let player2sum = 0;
let sixCount = 0;
let count = 0;
let player1Direction = "right";
let player2Direction = "right";

let player1Left = -85;
let player1Bottom = -50;

let player2Left = -85;
let player2Bottom = -50;

const diceArray = [
  "",
  "dice1.png",
  "dice2.png",
  "dice3.png",
  "dice4.png",
  "dice5.png",
  "dice6.png",
];
startBtn.addEventListener("click", () => {
  let aud = new Audio("gamestart.mp3");
  aud.play();
  if (startBtn.textContent === "Start Game") {
    onStart.style.display = "flex";
    home.style.display = "flex";
    startBtn.textContent = "Restart Game";
    dice.setAttribute("src", "dice.jpg");
  } else {
    startBtn.textContent = "Start Game";
    location.reload();
  }
});
endBtn.addEventListener("click", () => {
  location.reload();
  startBtn.textContent = "Start Game";
  onStart.style.display = "none";
  home.style.display = "none";
});

let sixCountImg = `<div class="sixCount">
<img src="dice6.png" />
</div>`;

var c = 0;
diceRollBtn.addEventListener("click", () => {
  let da = new Audio("diceroll.mp3");
  da.play();
  //home.innerHTML="";
  const n = Math.floor(Math.random() * 6 + 1);
  count += n;

  //const n=6;
  dice.setAttribute("src", diceArray[n]);
  if (player === 0) {
    if (player1sum + count > 100) {
      result.textContent = "You got moves more than required!!!";
      player = 1 - player;
      count = 0;
      showPlayerTurn(player);

      return;
    }
  } else {
    if (player2sum + count > 100) {
      result.textContent = "You got moves more than required!!!";
      player = 1 - player;
      count = 0;
      showPlayerTurn(player);

      return;
    }
  }
  if (n == 6) {
    result.textContent = "Wooohooo you got six!! Roll Dice again";
    sixCount++;
    if (sixCount === 3) {
      let aud = new Audio("error");
      aud.play();
      result.textContent = "You got 3 sixes and move cancelled!!!";
      player = 1 - player;
      count = 0;
      showPlayerTurn(player);
    } else {
      sixCountImage.innerHTML += sixCountImg;
    }
  } else {
    result.textContent = "";
    sixCount = 0;
    if (player === 0) {
      document.getElementById("redInitialButton").style.display = "none";
      //player1Btn.style.display = "block";
    } else {
      document.getElementById("blackInitialButton").style.display = "none";
      //player2Btn.style.display = "block";
    }
    diceRollBtn.disabled = true;
    moveForward(player, count);

    setTimeout(() => {
      //if 100
      if (player1sum === 100) {
        let aud = new Audio("win.mp3");
        aud.play();
        fun(player);
        //location.reload();
        //reload
      } else if (player2sum === 100) {
        let aud = new Audio("win.mp3");
        aud.play();
        //alert("player2won");
        fun(player);
        //location.reload();
      } else if (ladderFrom.includes(player1sum)) {
        let aud = new Audio("ladder.mp3");
        aud.play();
        let index = ladderFrom.indexOf(player1sum);
        let c = ladderTo[index] - player1sum;
        setTimeout(() => {
          moveForward(player, c);
        }, 400);

        setTimeout(() => {
          player = 1 - player;
          count = 0;
          showPlayerTurn(player);
        }, c * 200 + 500);
      } else if (ladderFrom.includes(player2sum)) {
        let aud = new Audio("ladder.mp3");
        aud.play();
        let index = ladderFrom.indexOf(player2sum);
        let c = ladderTo[index] - player2sum;
        setTimeout(() => {
          moveForward(player, c);
        }, 400);

        setTimeout(() => {
          player = 1 - player;
          count = 0;
          showPlayerTurn(player);
        }, c * 200 + 500);
      } else if (snakeFrom.includes(player1sum)) {
        let aud = new Audio("snakebite.mp3");
        aud.play();
        let index = snakeFrom.indexOf(player1sum);
        let c = player1sum - snakeTo[index];
        setTimeout(() => {
          moveBackward(player, c);
        }, 400);

        setTimeout(() => {
          player = 1 - player;
          count = 0;
          showPlayerTurn(player);
        }, c * 200 + 500);
      } else if (snakeFrom.includes(player2sum)) {
        let aud = new Audio("snakebite.mp3");
        aud.play();
        let index = snakeFrom.indexOf(player2sum);
        let c = player2sum - snakeTo[index];
        setTimeout(() => {
          moveBackward(player, c);
        }, 500);

        setTimeout(() => {
          player = 1 - player;
          count = 0;
          showPlayerTurn(player);
        }, c * 200 + 500);
      }

      // ladder

      // snake

      //else
      else {
        console.log("hey");
        player = 1 - player;
        count = 0;
        showPlayerTurn(player);
      }
    }, count * 200 + 200);

    //ladder
    //snake
    //player = 1 - player;
    //count = 0;
    //showPlayerTurn(player);
  }
});
function showPlayerTurn(a) {
  diceRollBtn.disabled = false;
  const id = setTimeout(() => {
    dice.setAttribute("src", "dice.jpg");
    sixCountImage.innerHTML = "";

    if (a === 0) {
      result.textContent = "";
      playerTurnText.textContent = "Player one's turn!!!";
      playerTurnText.style.color = "red";
    } else {
      result.textContent = "";
      playerTurnText.textContent = "Player two's turn!!!";
      playerTurnText.style.color = "black";
    }
  }, 600);
}

function moveForward(player, count) {
  if (count <= 0) {
    return;
  }
  setTimeout(() => {
    if (player == 0) {
      let aud = new Audio("forward.mp3");
      aud.play();
      player1sum++;
      if (player1sum == 1) {
        document.getElementById(
          player1sum
        ).innerHTML += `<div class="redButton" id="player1Btn">
        <i class="fa fa-map-marker"></i>
        </div>`;

        document.getElementById("player1Btn").style.display = "block";
      } else {
        var arr = Array(document.getElementById(player1sum - 1).children)[0];
        for (var x of arr) {
          if (x.id === "player1Btn") {
            x.remove();
            break;
          }
        }
        document.getElementById(
          player1sum
        ).innerHTML += `<div class="redButton" id="player1Btn">
      <i class="fa fa-map-marker"></i>
      </div>`;

        document.getElementById("player1Btn").style.display = "block";
      }
    } else {
      let aud = new Audio("forward.mp3");
      aud.play();
      player2sum++;
      if (player2sum == 1) {
        document.getElementById(
          player2sum
        ).innerHTML += `<div class="blackButton" id="player2Btn">
      <i class="fa fa-map-marker"></i>
      </div>`;

        document.getElementById("player2Btn").style.display = "block";
      } else {
        var arr = Array(document.getElementById(player2sum - 1).children)[0];
        for (var x of arr) {
          if (x.id === "player2Btn") {
            x.remove();
            break;
          }
        }
        document.getElementById(
          player2sum
        ).innerHTML += `<div class="blackButton" id="player2Btn">
      <i class="fa fa-map-marker"></i>
      </div>`;

        document.getElementById("player2Btn").style.display = "block";
      }
    }
    moveForward(player, count - 1);
  }, 200);
}

function moveBackward(player, count) {
  if (count <= 0) {
    return;
  }
  setTimeout(() => {
    if (player == 0) {
      let aud = new Audio("backward.mp3");
      aud.play();
      player1sum--;
      if (player1sum == 1) {
        document.getElementById(
          player1sum
        ).innerHTML += `<div class="redButton" id="player1Btn">
        <i class="fa fa-map-marker"></i>
        </div>`;

        document.getElementById("player1Btn").style.display = "block";
      } else {
        var arr = Array(document.getElementById(player1sum + 1).children)[0];
        for (var x of arr) {
          if (x.id === "player1Btn") {
            x.remove();
            break;
          }
        }
        document.getElementById(
          player1sum
        ).innerHTML += `<div class="redButton" id="player1Btn">
      <i class="fa fa-map-marker"></i>
      </div>`;

        document.getElementById("player1Btn").style.display = "block";
      }
    } else {
      let aud = new Audio("backward.mp3");
      aud.play();
      player2sum--;
      if (player2sum == 1) {
        document.getElementById(
          player2sum
        ).innerHTML += `<div class="blackButton" id="player2Btn">
      <i class="fa fa-map-marker"></i>
      </div>`;

        document.getElementById("player2Btn").style.display = "block";
      } else {
        var arr = Array(document.getElementById(player2sum + 1).children)[0];
        for (var x of arr) {
          if (x.id === "player2Btn") {
            x.remove();
            break;
          }
        }
        document.getElementById(
          player2sum
        ).innerHTML += `<div class="blackButton" id="player2Btn">
      <i class="fa fa-map-marker"></i>
      </div>`;

        document.getElementById("player2Btn").style.display = "block";
      }
    }
    moveBackward(player, count - 1);
  }, 200);
}

//function moveForward(player, count) {
//  //console.log(count, "player", player);
//
//  if (count === 0) {
//    return;
//  }
//  if (player === 0) {
//    //if (player1sum === 0) {
//    //  player1sum++;
//    //  right(player, player1Btn, 50);
//    //  moveForward(player, count - 1);
//    //} else {
//    //  //console.log('hey');
//    //  player1sum++;
//    //  if (player1sum % 10 === 1) {
//    //    up(player, player1Btn, 50);
//    //    moveForward(player, count - 1);
//    //  } else if (player1sum !== 2 && player1sum % 10 == 2) {
//    //    if (player1Direction === "right") {
//    //      player1Direction = "left";
//    //    } else {
//    //      player1Direction === "right";
//    //    }
//    //    if (player1Direction === "right") {
//    //      right(player, player1Btn, 50);
//    //      moveForward(player, count - 1);
//    //    } else {
//    //      left(player, player1Btn, 50);
//    //      moveForward(player, count - 1);
//    //    }
//    //  } else {
//    //    if (player1Direction === "right") {
//    //      right(player, player1Btn, 50);
//    //      moveForward(player, count - 1);
//    //    } else {
//    //      left(player, player1Btn, 50);
//    //      moveForward(player, count - 1);
//    //    }
//    //  }
//    //}
//    player1sum++;
//    document.getElementById(player1sum).textCon
//  } else {
//    if (player2sum === 0) {
//      player2sum++;
//      right(player, player2Btn, 50);
//      moveForward(player, count - 1);
//    } else {
//      player2sum++;
//      if (player2sum % 10 === 1) {
//        console.log("heyupp");
//        up(player, player2Btn, 50);
//        moveForward(player, count - 1);
//      } else if (player2sum !== 2 && player2sum % 10 === 2) {
//        if (player2Direction === "right") {
//          player2Direction = "left";
//        } else {
//          player2Direction === "right";
//        }
//        if (player2Direction === "right") {
//          right(player, player2Btn, 50);
//          moveForward(player, count - 1);
//        } else {
//          left(player, player2Btn, 50);
//          moveForward(player, count - 1);
//        }
//      } else {
//        if (player2Direction === "right") {
//          right(player, player2Btn, 50);
//          moveForward(player, count - 1);
//        } else {
//          left(player, player2Btn, 50);
//          moveForward(player, count - 1);
//        }
//      }
//    }
//  }
//}
//
//function moveBackward() {}
//
////function up(player, pixel) {
////  if (player == 0) {
////    setTimeout(() => {
////      player1Btn.style.bottom = `${player1Bottom + pixel}px`;
////    }, 1000);
////
////    player1Bottom += pixel;
////  } else {
////    console.log("heyyyyyyy");
////
////    setTimeout(() => {
////      player2Btn.style.bottom = `${player2Bottom + pixel}px`;
////    }, 1000);
////
////    player2Bottom += pixel;
////  }
////}
////function down() {}
////
////function right(player, pixel) {
////  if (player == 0) {
////    setTimeout(() => {
////      player1Btn.style.left = `${player1Left + pixel}px`;
////    }, 1000);
////
////    player1Left += pixel;
////  } else {
////    console.log("heyyyyyyy");
////
////    setTimeout(() => {
////      player2Btn.style.left = `${player2Left + pixel}px`;
////    }, 1000);
////
////    player2Left += pixel;
////  }
////}
////var leftcount1 = 0;
////var leftcount2 = 0;
////function left(player, pixel) {
////  if (player == 0) {
////    leftcount1++;
////    setTimeout(() => {
////      if (leftcount1 === 1) {
////        player1Btn.style.left = `${player1Left + 35}px`;
////        player1Left += 35;
////      } else {
////        player1Btn.style.left = `${player1Left - pixel}px`;
////        player1Left -= pixel;
////      }
////    }, 1000);
////  } else {
////    leftcount2++;
////    console.log("heyyyyyyy");
////
////    setTimeout(() => {
////      if (leftcount2 === 1) {
////        player2Btn.style.left = `${player2Left + 35}px`;
////        player2Left += 35;
////      } else {
////        player2Btn.style.left = `${player2Left - pixel}px`;
////        player2Left -= pixel;
////      }
////    }, 1000);
////  }
////}
////
//

//document.getElementById(
//  "1"
//).innerHTML += `<div class="redButton" id="player1Btn">
//<i class="fa fa-map-marker"></i>
//</div>`;
//
//document.getElementById(
//  "1"
//).innerHTML += `<div class="blackButton" id="player2Btn">
//<i class="fa fa-map-marker"></i>
//</div>`;
//
//document.getElementById("player1Btn").style.display = "block";
//document.getElementById("player2Btn").style.display = "block";
//
//var arr = Array(document.getElementById(1).children)[0];
//for (var x of arr) {
//  if (x.id === "player2Btn") {
//    x.remove();
//    break;
//  }
//}
//
//document.getElementById(
//  "2"
//).innerHTML += `<div class="blackButton" id="player2Btn">
//<i class="fa fa-map-marker"></i>
//</div>`;
//document.getElementById("player2Btn").style.display = "block";
//
