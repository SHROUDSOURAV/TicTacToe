const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];


let turnO = true; // storing playerO 's turn -> if true playerO 's turn else playerX's
let boxes = document.querySelectorAll('.box');   // selecting all the boxes having class = box
let resetBtn = document.querySelector('#reset-btn');  // selecting reset button having id = reset-btn
let newgameBtn = document.querySelector('#new-btn');  //selecting new game button having id = new-btn
let msgContainer = document.querySelector('.msg-container');  // selecting msg container
let msg = document.querySelector('#msg'); // selecting para where display message of winner will be shown (element)
let count = 0;  //draw counter variable

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    count++;
    if(turnO){ 
      box.innerText = 'O';
      box.classList.add('neon-o');
      turnO = false;
    }
    else{
      box.innerText = 'X';
      box.classList.add('neon-x');
      turnO = true;
    }
    box.disabled = true;
    winnerCheck();
  })
});

//========================== WINNER CHECKING ===================================

const disableBoxes = () => {
  for(box of boxes){
    box.disabled = true;
  }
}


const displayDraw = () => {
  disableBoxes();
  msg.innerText = `Match is DRAW !!!`;
  msgContainer.classList.remove('hide');
}

const displayWinner = (winner) => {
  disableBoxes();
  msg.innerText = `Congratulations, the Winner is ${winner} !!!`;
  msgContainer.classList.remove('hide');
}

const winnerCheck = () => {
  for(pattern of winPatterns){
    console.log(pattern[0], pattern[1], pattern[2]);
    let pos1Value = boxes[pattern[0]].innerText; 
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;
    if(pos1Value != "" && pos2Value != "" && pos3Value != "")
      if(pos1Value === pos2Value && pos2Value === pos3Value){
        displayWinner(pos1Value);
      }
      else if(count === 9 && (pos1Value !== pos2Value && pos2Value !== pos3Value )){  // draw checking
        displayDraw();
      } 
  }
}




//============================ RESET GAME!!!!!!!!!!!!!!================================

// enable all boxes when new game is started
const enableBoxes = () => {
  for(box of boxes){
    box.disabled = false; //to allow access to the buttons(boxes)
    box.innerText = ""; //resetting the gameboard
  }
}


const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add('hide');
}

resetBtn.addEventListener('click', () => {
  resetGame();
})


//============================= NEW GAME!!!!!!!!!!!!!!!!!!!!!!============================

newgameBtn.addEventListener('click', resetGame);










// I want the same display box but aligned to the side of the game board so that I can see the pattern which led to draw or win both either X or O and also if possible can you give a line effect which cutts through the winning pattern like kids do when either X and O get the winning pattern ?