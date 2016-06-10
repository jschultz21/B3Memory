var deck=[];
var baseCard="";
var secondCard;
var paths=[];
var score=0;
var seconds=0;
var minutes=0;
var deckValue=0;   //what does x represent? maybe rename?
var deckChosen=false;
var timing=false;

//sets up the gameboard with sixteen divs
for(i = 0; i < 16; i++) {
  $(".gameboard").append('<div class="hidden card"/>');
  var hidden = $(".hidden");
}

$(document).ready(function() {
  $(".selectable .buttonSelector:first").click();
});

//the function below is long buuuut it seems good. You could split into indivdual functions if wanted.
//lets user choose a deck before starting
$(".deckChoice").on("click",function(){

  if (timing==true) {    //unsure how timing becomes true at the moment
    alert("game in progress");
  }
  else {
    $('button').removeClass('selectedButton');
    $(this).addClass('selectedButton');
    deckChosen=true;
    if ($(".card:contains('img')")) { //if the board contains images, clear them
      $(".card").children("img").remove(); //removes all images from the .card divs
      deckValue = $(this).val(); //get value of deck clicked
      generateDeck();
    }
    else { //otherwise, generate the deck
      deckChosen=true;
      deckValue = $(this).val();
      generateDeck();
    }

    //assigns an image to each div
    $(".hidden").each(function() {
      $(this).append(randomCard);
    });
  }
});

// //generates the deck with two copies of each image
function generateDeck() {
  for(var i =1; i < 9; i++) {
    deck.push("images"+deckValue+"/img"+ i + ".jpg");
    deck.push("images"+deckValue+"/img"+ i + ".jpg");
  }
}

// appending a random image to each div
function randomCard () {
  var randomNumber = Math.floor(Math.random() * deck.length);
  var url = deck[randomNumber];
  deck.splice(randomNumber,1);
  imageUrl='<img src="' + url + '" value=randomNumber/>'
  return imageUrl;
};

// when a hidden div is clicked, check if the board has images, and check if timer is NOT at 0

//this section  is handling the click event then passing off to the revealCard function is board selected and timer going
hidden.on("click", function(){
  if ((deckChosen==true) && (timing==true)) {
      revealCard();
  }
  else if ((deckChosen==true) && (timing==false)) {
    startTimer();
    timing = true;
    revealCard();
    // gameInProgress=true;
  }
  else if (deckChosen==false) {
    alert("please choose a deck!");
    return;
  }
});

//when card is clicked, the background image is revealed

//attempted to split to revealcard function into multiple seb-functions, called by the function below depending on the input
function revealCard() {
  if ($(this).hasClass("hidden")) {   //seems to be an error on this line; images not displaying
    debugger
    revealCard2()    // can rename revealcard2 etc as something more semantic
    console.log("hidden class " +this)
  }
  else if (baseCard === secondCard) {
    revealCard3()
  }
  else timesATicken()
  console.log("nope try again")
}

function revealCard2() {
    $(this).toggleClass("hidden selected"); //removes hidden class and adds selected class so image is revealed
    var path = $('img', this).attr('src'); //sets clicked img src to variable 'path'
    paths.push(path); //pushes path variable into paths array

    baseCard=paths[paths.length-2];
    secondCard=paths[paths.length-1];

    console.log(baseCard, secondCard)
    timesATicken()
    // if (typeof(baseCard) === 'undefined') { //if there is no basecard yet, do nothing after first card is selected
    // }
  }

//might be able to split this into a separate function
function revealCard3() {
  //if the second selected card and the base card match, do these things:
  console.log("hooray!");
  $(this).toggleClass("selected matched");
  $('img[src="' + baseCard + '"]').parent(".selected").toggleClass("matched selected");
  score ++ //add one to the score
  $("h2").html("Total Matches: "+score); //replace the scoreboard with new score
  doWeHaveaWinner(); //check for winner
}

function timesATicken() {
//if the second selected card and base card do not match, do these things:
setTimeout(function(){
  $('img[src="' + secondCard + '"]').parent(".selected").toggleClass("hidden selected"); //adds the hidden class and removes selected classs so the second selected card becomes hidden again
  $('img[src="' + baseCard + '"]').parent(".selected").toggleClass("hidden selected"); //adds the hidden class so the base card becomes hidden again
  }, 1000);
  paths=[]; //resets the array
}


$("#reset").on("click", function(){
  $(".card").children("img").remove(); //removes all images from the .card divs
  generateDeck(); //generates the deck
  $(".card").addClass("hidden");  //resets all .card divs to hidden
  $(".card").removeClass("selected matched");  //resets all .card divs to hidden
  $(".card").append(randomCard); //assigns a random card to each div
  score=0;
  $("h2").html("Total Matches: "+score); //replace the scoreboard with new score
  // deckChosen=false;
  // gameInProgress=false;
  timing=false;
  resetTimer();
});

function doWeHaveaWinner() {
  if (score === 8){
    alert("U WIN GR8 JB!");
    gameInProgress=false;
  }
  else{
    console.log("no winner yet");
  }
}

function startTimer(){
  timing=true;
  timer=setInterval(updateTimer, 1000);
}

//I like the timing function! Must cleaner code than mine.
function updateTimer() {
  seconds ++;
  if (seconds >=60) {
    seconds=0;
    minutes ++
  }
  $("#timer").text(minutes+"m "+seconds+"s");
}

function resetTimer(){
  clearInterval(timer);
  seconds=0;
  $("#timer").text("0m 0s");
}
