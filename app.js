// $(document).ready(function(){

//set up the gameboard with 16 cards
  for(i = 0; i < 16; i++) {
    $(".gameboard").append('<div class="hidden"/>');

    $(".hidden").each(function() {
    $(this).css("background-color", shuffleDeck);
    // $(this).addClass("frontOfCard");
    });

  }


  var gameboard = $(".gameboard");
  var hidden = $(".hidden");



function shuffleDeck () {
    var deck = ["images/img1.jpg","images/img2.jpg","images/img3.jpg"];
  randomNumber = Math.floor(Math.random() * deck.length);
  imageUrl ="url('"+deck[randomNumber] + "')";
  $(this).css('background-image', imageUrl);
}




//when card is clicked, the background image is revealed
  hidden.on("click", revealCard);


  function revealCard() {
      console.log("way to go, you clicked a card!")
      $(this).toggleClass("hidden");
    }



// });







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
