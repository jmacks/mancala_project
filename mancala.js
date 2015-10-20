




//global variables
var currentPlayer = 'playerOne';
//counter is used to prevent the board constructor from appending a new board before page is refreshed
var counter = 0;



//pit constructor
var Pit = function(currentPlayer){

  //each pit starts with 4 stones
  this.stones = 4;
  //when pit is played(cooresponding div is clicked), remove all stones...value becomes 0
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
        return currentPlayer;
      }else if (currentPlayer === 'playerTwo') {
        currentPlayer = 'playerOne';
        return currentPlayer;
      }
    }

  };




///start a new game
//create new board on click of start button

   var startButton = document.getElementById("startGame");

   startButton.addEventListener('click', function(){
     var newBoard = new Board();
   }
  );



     console.log(currentPlayer);














// var GameBoard = function(Pit){
//
// }
//
// //variables for each pit div
//
// var firstDivId = document.querySelector('div#n1');
// var secondDivId = document.querySelector('div#n2');
// var thirdDivId = document.querySelector('div#n3');
// var fourthDivId = document.querySelector('div#n4');
// var fifthDivId = document.querySelector('div#n5');
// var sixthDivId = document.querySelector('div#n6');
// var playerOneHome = document.querySelector('div#playerOneHome');
// var eighthDivId = document.querySelector('div#n8');
// var ninthDivId = document.querySelector('div#n9');
// var tenthDivId = document.querySelector('div#n10');
// var eleventhDivId = document.querySelector('div#n11');
// var twelvthDivId = document.querySelector('div#n12');
// var thirteenthDivId = document.querySelector('div#n13');
// var playerTwoHome = document.querySelector('div#playerTwoHome');
//
// //variables to retrieve the number of stones in each pit div
// var stonesInFirst = parseInt(firstDivId.innerHTML);
// var stonesInSecond = parseInt(secondDivId.innerHTML);
// var stonesInThird = parseInt(thirdDivId.innerHTML);
// var stonesInFourth = parseInt(fourthDivId.innerHTML);
// var stonesInFifth = parseInt(fifthDivId.innerHTML);
// var stonesInSixth = parseInt(sixthDivId.innerHTML);
// var stonesInPlayerOneHome = parseInt(playerOneHome.innerHTML);
// var stonesInEighth = parseInt(eighthDivId.innerHTML);
// var stonesInNinth = parseInt(ninthDivId.innerHTML);
// var stonesInTenth = parseInt(tenthDivId.innerHTML);
// var stonesInEleventh = parseInt(eleventhDivId.innerHTML);
// var stonesInTwelvth = parseInt(twelvthDivId.innerHTML);
// var stonesInThirteenth = parseInt(thirteenthDivId.innerHTML);
// var stonesInPlayerTwoHome = parseInt(playerTwoHome.innerHTML);
//
// //variables to retrieve data values of divs in integer form
// var firstDivLocation = parseInt(firstDivId.getAttribute('data-val'));
// var secondDivLocation = parseInt(secondDivId.getAttribute('data-val'));
// var thirdDivLocation = parseInt(thirdDivId.getAttribute('data-val'));
// var fourthDivLocation = parseInt(fourthDivId.getAttribute('data-val'));
// var fifthDivLocation = parseInt(fifthDivId.getAttribute('data-val'));
// var sixthDivLocation = parseInt(sixthDivId.getAttribute('data-val'));
// var playerOneHomeDivLocation = parseInt(playerOneHome.getAttribute('data-val'));
// var eighthDivLocation = parseInt(eighthDivId.getAttribute('data-val'));
// var ninthDivLocation = parseInt(ninthDivId.getAttribute('data-val'));
// var tenthDivLocation = parseInt(tenthDivId.getAttribute('data-val'));
// var eleventhDivLocation = parseInt(eleventhDivId.getAttribute('data-val'));
// var twelvthDivLocation = parseInt(twelvthDivId.getAttribute('data-val'));
// var thirteenthDivLocation = parseInt(thirteenthDivId.getAttribute('data-val'));
// var playerTwoHomeDivLocation = parseInt(playerTwoHome.getAttribute('data-val'));
//
//
// //GAME BOARD OBJECT
// var board = {
//   n1: [firstDivLocation, stonesInFirst, playerOne],
//   n2: [secondDivLocation, stonesInSecond, playerOne],
//   n3: [thirdDivLocation, stonesInThird, playerOne],
//   n4: [fourthDivLocation, stonesInFourth, playerOne],
//   n5: [fifthDivLocation, stonesInFifth, playerOne],
//   n6: [sixthDivLocation, stonesInSixth, playerOne],
//   playerOneHome: [playerOneHomeDivLocation, stonesInPlayerOneHome, playerOne],
//   n8: [eighthDivLocation, stonesInEighth, playerTwo],
//   n9: [ninthDivLocation, stonesInNinth, playerTwo],
//   n10: [tenthDivLocation, stonesInTenth, playerTwo],
//   n11: [eleventhDivLocation, stonesInEleventh, playerTwo],
//   n12: [twelvthDivLocation, stonesInTwelvth, playerTwo],
//   n13: [thirteenthDivLocation, stonesInThirteenth, playerTwo],
//   playerTwoHome: [playerTwoHomeDivLocation, stonesInPlayerTwoHome, playerTwo],
//
// }
//
//
//
//
// clicke evnet {
//   #n1.addEventListener('click', )
//   var playAmount = board[this.id].addEventListener('click');
//
// }
//
//
// var pitArray = [firstDivId, secondDivId, thirdDivId, fourthDivId, fifthDivId, sixthDivId, playerOneHome, eighthDivId, ninthDivId, tenthDivId, eleventhDivId, twelvthDivId, thirteenthDivId, playerTwoHome];
//
// var pitLocation = [firstDivLocation, secondDivLocation, thirdDivLocation, fourthDivLocation, fifthDivLocation, sixthDivLocation, playerOneHomeDivLocation, eighthDivLocation, ninthDivLocation, tenthDivLocation, eleventhDivLocation, twelvthDivLocation, thirteenthDivLocation, playerTwoHomeDivLocation];
//
// var stonesInPit = [stonesInFirst, stonesInSecond, stonesInThird, stonesInFourth, stonesInFifth, stonesInSixth, stonesInPlayerOneHome, stonesInEighth, stonesInNinth, stonesInTenth, stonesInEleventh, stonesInTwelvth, stonesInThirteenth, stonesInPlayerTwoHome];
//
// var stonesInSelectedPit =
//
// //click functions
// var spotsToAdvance = function(clickedLocation){
//   for(i = stonesInPit; i = 0; i--){
//     pitLocation + stonesInPit[i];
//   }
// }
//
//
//
//
// ///click events
// firstDivId.addEventListener('click', ...)
//
//  //
//  // var newFcn = function(pit){
//  //   //expected input: pit OBJ
//  //
//  //   pit.value = 10;
//  // }
//
// console.log(parseInt(thirteenthDivId.innerHTML) + 1);
//
// var stoneMover = function(){
//    var pitId = function(){
//      for(i = 0; i < pitArray.length; i++){
//
//        console.log(pitArray[i]);
//
//    }
// }
//   var pitValue = pitId().value;
//
//   for(i = pitValue; i > 1; i --){
//     (pitArray[i] + pitValue) + 1;
//   }
//  }
//
//
//
//
// ////array method
// var board = {
//  pitOneArray: ['stone', 'stone', 'stone', 'stone'];
//  pitTwoArray: ['stone', 'stone', 'stone', 'stone'];
//  pitThreeArray: ['stone', 'stone', 'stone', 'stone'];
//  pitFourArray: ['stone', 'stone', 'stone', 'stone'];
//  pitFiveArray: ['stone', 'stone', 'stone', 'stone'];
//  pitSixArray: ['stone', 'stone', 'stone', 'stone'];
//  playerOneHomePit: [];
//  pitEightArray: ['stone', 'stone', 'stone', 'stone'];
//  pitNineArray: ['stone', 'stone', 'stone', 'stone'];
//  pitTenArray: ['stone', 'stone', 'stone', 'stone'];
//  pitElevenArray: ['stone', 'stone', 'stone', 'stone'];
//  pitTwelveArray: ['stone', 'stone', 'stone', 'stone'];
//  pitThirteenArray: ['stone', 'stone', 'stone', 'stone'];
//  playerTwoHomePit: [];
// }
//
// document.getElementById("n1").addEventListener('click', function(){
//   for(i = 0; i < board[i].length; i++){
//     board[i].
//
//   }
// })
