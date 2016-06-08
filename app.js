
var deck=[];
var baseCard="";
var secondCard;
var paths=[];
var score=0;
var seconds=0;
var minutes=0;
var x=0;
var deckChosen=false;

//sets up the gameboard with sixteen divs
for(i = 0; i < 16; i++) {
  $(".gameboard").append('<div class="hidden card"/>');
  var hidden = $(".hidden");
}

//lets user choose a deck before starting
$(".deckChoice").on("click",function(){
  deckChosen=true;
  if ($(".card:contains('img')")) { //if the board contains images, clear them
    $(".card").children("img").remove(); //removes all images from the .card divs
    x = $(this).val(); //get value of deck clicked
    generateDeck();
  }
  else { //otherwise, generate the deck
    deckChosen=true;
    x = $(this).val();
    generateDeck();
  }

  //assigns an image to each div
  $(".hidden").each(function() {
    $(this).append(randomCard);
  });
});

// //generates the deck with two copies of each image
function generateDeck() {
  for(var i =1; i < 9; i++) {
    deck.push("images"+x+"/img"+ i + ".jpg");
    deck.push("images"+x+"/img"+ i + ".jpg");
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
hidden.on("click", function(){
  if ((deckChosen==true) && (seconds==0)) {
      startTimer();
    }
    else{
      console.log("timer not starting")
    }
});

//when card is clicked, the background image is revealed
hidden.on("click", revealCard);

function revealCard() {

  if (deckChosen==false) {
    alert("please choose a deck!");
    return;
  }

   if ($(this).hasClass("hidden")){

    $(this).toggleClass("hidden selected"); //removes hidden class and adds selected class so image is revealed
    var path = $('img', this).attr('src'); //sets clicked img src to variable 'path'
    paths.push(path); //pushes path variable into paths array

    baseCard=paths[paths.length-2];
    secondCard=paths[paths.length-1];

    if (typeof(baseCard) === 'undefined') { //if there is no basecard yet, do nothing after first card is selected
    }

    else { //if the second selected card and the base card match, do these things:
      if (baseCard === secondCard) {
        console.log("hooray!");
        $(this).toggleClass("selected matched");
        $('img[src="' + baseCard + '"]').parent(".selected").toggleClass("matched selected");
        score ++ //add one to the score
        $("h2").html("Total Matches: "+score); //replace the scoreboard with new score
        doWeHaveaWinner(); //check for winner
      }

      else { //if the second selected card and base card do not match, do these things:
        alert("no match! try again.");
        $(this).toggleClass("hidden selected");  //adds the hidden class and removes selected classso the second selected card becomes hidden again
        $('img[src="' + baseCard + '"]').parent(".selected").toggleClass("hidden selected"); //adds the hidden class so the base card becomes hidden again
      }
      paths=[]; //resets the array
    }
  }
}


$(".reset").on("click", function(){
  $(".card").children("img").remove(); //removes all images from the .card divs
  deck=[]; //resets the deck
  generateDeck(); //generates the deck
  $(".card").addClass("hidden");  //resets all .card divs to hidden
  $(".card").removeClass("selected matched");  //resets all .card divs to hidden
  $(".card").append(randomCard); //assigns a random card to each div
  score=0;
  $("h2").html("Total Matches: "+score); //replace the scoreboard with new score
  resetTimer();
});

function doWeHaveaWinner() {
  if (score === 8){
    alert("U WIN GR8 JB!");
  }
  else{
    console.log("no winner yet");
  }
}

function startTimer(){
  timer=setInterval(updateTimer, 1000);
}

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
  timing=false;
}
