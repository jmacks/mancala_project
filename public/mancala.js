




/////global variables
var currentPlayer = 'playerOne';
//counter is used to prevent the board constructor from appending a new board before page is refreshed
var counter = 0;
//setting up div to display info about game like current turn adn winner
var infoDisplay = document.getElementById("info-display");
//save some room in memory for the future lucky winner
var winner = '';

//pit constructor
var Pit = function(currentPlayer){

  //each pit starts with 4 stones
  this.stones = 4;
  //when pit is played, we need to be able remove all of its stones
  this.empty = function(){
    this.stones = 0;
  }
  //when pit is within (# of stones emptied) + (# of div they were picked from) divs, drop 1 stone into it
  this.drop = function(){
    this.stones +=1;
  }
  this.playerHome = currentPlayer;
}
//board constructor
var Board = function(){
  var self = this;
  //NOT DONE -- WINNER WILL BE PUSHED
  //array of pits to be pushed by makePits function
  var winner = '';
  this.pits = [];
  //pushes 14 new pits into the this.pits array with the 7th and 14th pit being assigned to specific players

 //(JQUERY)display the changes is pit.stones after each turn
  this.updateBoard = function () {
    for(var i = 1; i < $('button').length; i++) {
      $($('button')[i]).html(this.pits[i - 1].stones)
    }
    playerSwitch();

  }
//push 14 new pits into the pits array
//designate the 7th and 14th pits as belonging to a respective player
  this.makePits = function(){
    for(var i = 0; i < 14; i++){
      if(i===6){
        this.pits.push(new Pit('playerOne'))
      } else if(i===13){
        this.pits.push(new Pit('playerTwo'))
      } else{
        this.pits.push(new Pit());
      }
    }
  };
  this.makePits();

  this.moveStones = function(pitNumber){
    //assign the pitNumber to the integer within the button ID
      pitNumber = parseInt($(pitNumber).attr('id')
                  .split('n')[1]);
    //create var that sets movingStones to the number of stones in the selected pit
    var movingStones = this.pits[pitNumber].stones;
    //set number of stones in slected pit to zero
    this.pits[pitNumber].empty();
    var i = 1;
    //move around the board adding one stone to each of the following pits until the stones run out
    while(movingStones > 0){
      if(pitNumber + i >= this.pits.length){
        i -= this.pits.length;
      }
      //do not drop stones in opposing players home base
      if (currentPlayer === "playerOne" && pitNumber + i === 13) {
        i++;
      } else if (currentPlayer === "playerTwo" && pitNumber + i === 6) {
        i++;
      } else {
        //drop 1 stone in each of the following pits until the stones run out
        this.pits[pitNumber + i].drop();
        movingStones--;
        i++;
        this.pits[pitNumber].stones;
      }
    }
//update the board displaying the new number of stones in each div
    this.updateBoard();
  };

  this.renderPits = function(){
    var self = this;
   for(var i = 0; i < this.pits.length; i++){
     //every 7 buttons should be divided into a seperate div..creating two sides to the board
     if(i % 7 === 0){
       var sideOfBoard = document.createElement("div");
       var boardDiv = document.getElementById("gameBoard");
       boardDiv.appendChild(sideOfBoard);
     }
     //(JQUERY) create a button, id, class and listener for each div, also displays number of stones in the html
     var $pitButton = $('<button>').attr('id', 'n' + i)
                                   .attr('class', 'gamePit')
                                   //.target was suggestion to fix bug
                                   .on('click', function (e) {
                                     self.moveStones(e.target);
                                   })
                                   .html(self.pits[i].stones)
   //set stone value of home bases to 0
      if(i === 6 || i === 13){
        self.pits[i].stones = 0;
        $pitButton.html(self.pits[i].stones);
      }
//VANILLA VERSION OF ABOVE
      //  var pitButton = document.createElement("button");
       //set the class for each button to gamePit
      //  pitButton.setAttribute("class", "gamePit")
       //set the id to the index number
      //  pitButton.setAttribute("id", "n" + i);
       //inner html should display the number of stones
      //  pitButton.innerHTML = this.pits[i].stones;
       //append the button to the side of the board
       $(sideOfBoard).append($pitButton);
       //event listeners for each div button

      //  document.getElementById("n" + i).addEventListener('click', function() {
       //
      //    self.moveStones(i);
      //  });

      }
    };
//updates universal counter to make sure that start button must restart to work again
    if(window.counter === 0) {
      this.renderPits();
      window.counter++;
    }

//Details win conditions and declares the winner if conditions are met
  this.checkForWin = function(){
    console.log(this.pits[0].stones)
    //if either side of pits is emptied, add all stones on opposing side to oppposing players home pit
    if(this.pits[0].stones === 0 && this.pits[1].stones === 0 && this.pits[2].stones === 0 && this.pits[3].stones === 0 && this.pits[4].stones === 0 && this.pits[5].stones === 0){
      var sumOfPtwoRemainingStones = this.pits[7].stones + this.pits[8].stones + this.pits[9].stones + this.pits[10].stones + this.pits[11].stones + this.pits[12].stones;
      var playerTwoTotal = this.pits[13].stones + sumOfPtwoRemainingStones;
      var playerOneTotal = this.pits[6].stones;
      //count stones in each players home and compare the numbers, delcare winner as player with most stones in home
      if(playerTwoTotal > playerOneTotal){
        alert('player two has won');
        return winner = 'playerTwo';
      }else if(playerOneTotal > playerTwoTotal){
        alert('player one has won');
        return winner = 'playerOne';
      }else {
        return alert('somehow, its a tie???')
      }
    }
    else if (this.pits[7].stones === 0 && this.pits[8].stones === 0 && this.pits[9].stones === 0 && this.pits[10].stones === 0 && this.pits[11].stones === 0 && this.pits[12].stones === 0) {
      var sumOfPoneRemainingStones = this.pits[0].stones + this.pits[1].stones + this.pits[2].stones + this.pits[3].stones + this.pits[4].stones + this.pits[5].stones;
      var playerTwoTotal = this.pits[13].stones;
      var playerOneTotal = this.pits[6].stones + sumOfPoneRemainingStones;
      if(playerTwoTotal > playerOneTotal){
        return alert('player two has won');
      }else if(playerOneTotal > playerTwoTotal){
        return alert('player one has won')
      }else {
        return alert('somehow, its a tie???')
      }
    }
    };

    this.checkForWin();


    var playerSwitch = function(){
      if(currentPlayer === 'playerOne'){
        currentPlayer = 'playerTwo';
        infoDisplay.innerHTML = 'Its your turn ' + currentPlayer;
        self.checkForWin();
        return currentPlayer;
      }else if (currentPlayer === 'playerTwo') {
        currentPlayer = 'playerOne';
        infoDisplay.innerHTML = 'Its your turn ' + currentPlayer;
        self.checkForWin();
        return currentPlayer;
      }
    }

  };




///start a new game
//create new board on click of start button

   var startButton = document.getElementById("startGame");

   startButton.addEventListener('click', function(){
     var newBoard = new Board();
     infoDisplay.innerHTML = 'Its your turn ' + currentPlayer;
   }
  );



     console.log(currentPlayer);
