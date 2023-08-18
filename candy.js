var candy = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];

var rows = 10;
var columns = 10;
var score = 0;

let crushedSound = new Audio("./Twinkle.mp3");

var currTile;
var otherTile;

window.onload = function() {
  startGame();

  window.setInterval(function(){
    crushCandy();
    slideCandy();
    generateCandy();
  }, 100);
}

function randomCandy(){
  return candy[Math.floor(Math.random() * candy.length)];
}
function startGame(){
  for(let r = 0; r < rows; r++){
    let row = [];
    for(let c = 0; c < columns; c++){
      //<img id ="0-0">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./images/" + randomCandy() + ".png";

      //drag functionality
      tile.addEventListener("dragstart", dragStart);//click a candy, intialize drag
      tile.addEventListener("dragover", dragOver);//clicking on candy, moving mouse to drag the candy
      tile.addEventListener("dragenter", dragEnter);//dragging candy onto another candy
      tile.addEventListener("dragleave", dragLeave);//leave candy over another candy
      tile.addEventListener("drop", dragDrop);//dropping a candy over another candy
      tile.addEventListener("dragend", dragEnd);//after drag process completed, we swap candies



      document.getElementById("board").append(tile);
      row.push(tile);
    }

    board.push(row);
  }

  console.log(board);

}

function dragStart(){
  //thisa refers to tile that was clicked on for drag
  currTile = this;
}

function dragOver(e){
  e.preventDefault();
}

function dragEnter(e){
  e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
  otherTile = this;
  
}

function dragEnd(){

  if(currTile.src.includes("blank") || otherTile.src.includes("blank")){
    return;
  }
  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = c2 == c-1 && r == r2;
  let moveRight = c2 == c+1 && r == r2;
  let moveUp = r2 == r-1 && c == c2;
  let moveDown =  r2 == r+1 && c ==  c2 ;

  let isAdjacent = moveDown || moveLeft || moveRight || moveUp;

  if(isAdjacent)
  {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
    let validMove = checkValid();

    if(!validMove){
      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
    else{
      
          crushedSound.play();
          setTimeout(() => {
            crushedSound.pause();
            crushedSound.currentTime = 0;
          }, 2000);
    }
  
  }
  
}

function crushCandy(){
  //crushThree
  crushThree();
  
  document.getElementById("score").innerText = score;
}

function crushThree(){

  //check rows
  for(let r = 0; r < rows; r++){
    for (let c = 0; c < columns-2; c++){
      let candy1 = board[r][c];
      let candy2 = board[r][c+1];
      let candy3 = board[r][c+2];

      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;
      }
    }
  }

  //check columns
  for(let c = 0; c < columns; c++){
    for (let r = 0; r < rows-2; r++){
      let candy1 = board[r][c];
      let candy2 = board[r+1][c];
      let candy3 = board[r+2][c];

      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
      }
    }
  }
}

function checkValid(){
    //check rows
    for(let r = 0; r < rows; r++){
      for (let c = 0; c < columns-2; c++){
        let candy1 = board[r][c];
        let candy2 = board[r][c+1];
        let candy3 = board[r][c+2];
  
        if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
          return true;
        }
      }
    }
  
    //check columns
    for(let c = 0; c < columns; c++){
      for (let r = 0; r < rows-2; r++){
        let candy1 = board[r][c];
        let candy2 = board[r+1][c];
        let candy3 = board[r+2][c];
  
        if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
          return true;
        }
      }
    }
    return false;
}

function slideCandy(){
  for (let c = 0; c < columns; c++){
    let ind = rows - 1;
    for (let r = columns-1; r >= 0; r--){
      if(!board[r][c].src.includes("blank")){
        board[ind][c].src = board[r][c].src;
        ind -= 1 ;
      }
    }

    for (let r = ind; r >= 0 ; r--){
      board[r][c].src = "./images/blank.png";

    }
  }
}

function generateCandy(){
  for (let c = 0; c < columns ; c++){
    if(board[0][c].src.includes("blank")){
      board[0][c].src = "./images/" + randomCandy() + ".png";
    }
  }
}





