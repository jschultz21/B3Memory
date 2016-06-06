
var deck=[];
var imagesUsed=[];
var hidden = $(".hidden");

//sets up the gameboard with sixteen divs
for(i = 0; i < 16; i++) {
  $(".gameboard").append('<div class="hidden card"/>');
}


generateDeck();

//assigns an image to each div
$(".hidden").each(function() {
  $(this).append(generateBoard);
});

//generates the deck with two copies of each image

//generates the board

function generateDeck() {
  for(var i =1; i < 9; i++) {
  deck.push("images/img"+ i + ".jpg");
  deck.push("images/img"+ i + ".jpg");
  }
  return deck;
  console.log(deck);
}



function generateBoard () {

  //appending a random image to each div
  var randomNumber = Math.floor(Math.random() * deck.length);
  var url = deck[randomNumber];
  deck.splice(randomNumber,1);
  imageUrl='<img src="' + url + '"/>'
  return imageUrl;
};




//when card is clicked, the background image is revealed
var hidden = $(".hidden");
hidden.on("click", revealCard);

function revealCard() {
  console.log("way to go, you clicked a card!")
  $(this).toggleClass("hidden");
  // compareCards();
}






//when page loads, game appears

//array has 8 images, on page load, assign a random image to each of the 16 squares

//the cards must be arranged randomly with two of each card represented
//
//the images must be hidden on page load
//
// when you select a card, the image must appear
//
// //when one card is selected, you can select one more
//
// //if the cards match, counter goes up
//
//
// function: revealCard
//
// function: compareCards
