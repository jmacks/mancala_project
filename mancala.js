//pit constructor
var Pit = function(){
  //each pit starts with 4 stones
  this.value = 4;
  //when pit is played, remove all stones...value becomes 0
  this.played = function(){
    this.value = 0;
  }
  //when pit is passed over, drop 1 stone into it
  this.drop = function(){
    this.value +=1;
  }

}

var GameBoard = function(Pit){

}

//variables for each pit div

var firstDivId = document.querySelector('div#n1');
var secondDivId = document.querySelector('div#n2');
var thirdDivId = document.querySelector('div#n3');
var fourthDivId = document.querySelector('div#n4');
var fifthDivId = document.querySelector('div#n5');
var sixthDivId = document.querySelector('div#n6');
var playerOneHome = document.querySelector('div#playerOneHome');
var eighthDivId = document.querySelector('div#n8');
var ninthDivId = document.querySelector('div#n9');
var tenthDivId = document.querySelector('div#n10');
var eleventhDivId = document.querySelector('div#n11');
var twelvthDivId = document.querySelector('div#n12');
var thirteenthDivId = document.querySelector('div#n13');
var playerTwoHome = document.querySelector('div#playerTwoHome');

//variables to retrieve the number of stones in each pit div
var stonesInFirst = parseInt(firstDivId.innerHTML);
var stonesInSecond = parseInt(secondDivId.innerHTML);
var stonesInThird = parseInt(thirdDivId.innerHTML);
var stonesInFourth = parseInt(fourthDivId.innerHTML);
var stonesInFifth = parseInt(fifthDivId.innerHTML);
var stonesInSixth = parseInt(sixthDivId.innerHTML);
var stonesInPlayerOneHome = parseInt(playerOneHome.innerHTML);
var stonesInEighth = parseInt(eighthDivId.innerHTML);
var stonesInNinth = parseInt(ninthDivId.innerHTML);
var stonesInTenth = parseInt(tenthDivId.innerHTML);
var stonesInEleventh = parseInt(eleventhDivId.innerHTML);
var stonesInTwelvth = parseInt(twelvthDivId.innerHTML);
var stonesInThirteenth = parseInt(thirteenthDivId.innerHTML);
var stonesInPlayerTwoHome = parseInt(playerTwoHome.innerHTML);

//variables to retrieve data values of divs in integer form
var firstDivLocation = parseInt(firstDivId.getAttribute('data-val'));
var secondDivLocation = parseInt(secondDivId.getAttribute('data-val'));
var thirdDivLocation = parseInt(thirdDivId.getAttribute('data-val'));
var fourthDivLocation = parseInt(fourthDivId.getAttribute('data-val'));
var fifthDivLocation = parseInt(fifthDivId.getAttribute('data-val'));
var sixthDivLocation = parseInt(sixthDivId.getAttribute('data-val'));
var playerOneHomeDivLocation = parseInt(playerOneHome.getAttribute('data-val'));
var eighthDivLocation = parseInt(eighthDivId.getAttribute('data-val'));
var ninthDivLocation = parseInt(ninthDivId.getAttribute('data-val'));
var tenthDivLocation = parseInt(tenthDivId.getAttribute('data-val'));
var eleventhDivLocation = parseInt(eleventhDivId.getAttribute('data-val'));
var twelvthDivLocation = parseInt(twelvthDivId.getAttribute('data-val'));
var thirteenthDivLocation = parseInt(thirteenthDivId.getAttribute('data-val'));
var playerTwoHomeDivLocation = parseInt(playerTwoHome.getAttribute('data-val'));


//GAME BOARD OBJECT
var board (pitLocation,stonesInPit, whichPlayer)= {
  n1: [firstDivLocation, stonesInFirst, playerOne],
  n2: [secondDivLocation, stonesInSecond, playerOne],
  n3: [thirdDivLocation, stonesInThird, playerOne],
  n4: [fourthDivLocation, stonesInFourth, playerOne],
  n5: [fifthDivLocation, stonesInFifth, playerOne],
  n6: [sixthDivLocation, stonesInSixth, playerOne],
  playerOneHome: [playerOneHomeDivLocation, stonesInPlayerOneHome, playerOne],
  n8: [eighthDivLocation, stonesInEighth, playerTwo],
  n9: [ninthDivLocation, stonesInNinth, playerTwo],
  n10: [tenthDivLocation, stonesInTenth, playerTwo],
  n11: [eleventhDivLocation, stonesInEleventh, playerTwo],
  n12: [twelvthDivLocation, stonesInTwelvth, playerTwo],
  n13: [thirteenthDivLocation, stonesInThirteenth, playerTwo],
  playerTwoHome: [playerTwoHomeDivLocation, stonesInPlayerTwoHome, playerTwo],

}

clicke evnet {
  #n1.addEventListener('click', )
  var playAmount = board[this.id].addEventListener('click');

}


var pitArray = [firstDivId, secondDivId, thirdDivId, fourthDivId, fifthDivId, sixthDivId, playerOneHome, eighthDivId, ninthDivId, tenthDivId, eleventhDivId, twelvthDivId, thirteenthDivId, playerTwoHome];

var pitLocation = [firstDivLocation, secondDivLocation, thirdDivLocation, fourthDivLocation, fifthDivLocation, sixthDivLocation, playerOneHomeDivLocation, eighthDivLocation, ninthDivLocation, tenthDivLocation, eleventhDivLocation, twelvthDivLocation, thirteenthDivLocation, playerTwoHomeDivLocation];

var stonesInPit = [stonesInFirst, stonesInSecond, stonesInThird, stonesInFourth, stonesInFifth, stonesInSixth, stonesInPlayerOneHome, stonesInEighth, stonesInNinth, stonesInTenth, stonesInEleventh, stonesInTwelvth, stonesInThirteenth, stonesInPlayerTwoHome];

var stonesInSelectedPit =

//click functions
var spotsToAdvance = function(clickedLocation){
  for(i = stonesInPit; i = 0; i--){
    pitLocation + stonesInPit[i];
  }
}




///click events
firstDivId.addEventListener('click', ...)

 //
 // var newFcn = function(pit){
 //   //expected input: pit OBJ
 //
 //   pit.value = 10;
 // }

console.log(parseInt(thirteenthDivId.innerHTML) + 1);

var stoneMover = function(){
   var pitId = function(){
     for(i = 0; i < pitArray.length; i++){

       console.log(pitArray[i]);

   }
}
  var pitValue = pitId().value;

  for(i = pitValue; i > 1; i --){
    (pitArray[i] + pitValue) + 1;
  }
 }
