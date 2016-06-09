# JschultzConcentration

Sometimes just called "Memory", it's a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. If you get all the matching cards, you've won!

## Approach Taken

These are the steps I took to build this program:
1. Create index.html, app.js and styles.css pages.
2. Write up html for heading and game board and insert links to .js, styles.css and jquery.
3. write function to create and append 16 divs to the gameb oard. These will be the placeholders for the memory 'cards.' They have the class hidden.
4. 16 images append to the 16 divs on page load, but must be hidden. The hidden class assigns an opacity 0 to each image to accomplish this.
5. For a deck of 16, there must always be 8 pairs, so there can only be two of each image. To achieve this, I used a loop that would push each of the original 8 images into one array twice. Now the array is 16 image sources (two each of 8).
6. Images must append to the divs in a random order each time page loads, but each image can only appear twice. To do this, I took the array of 16 images, and moved one to each div, splicing the image used off of the array each time.  The randomCard function achieves this, and returns a new imageUrl to be appended to each div.
7. Now that the board is set up each time on page load, it's time to work out 'play mode'
8. First, the cards must flip over and reveal the image when clicked. I used an onClick event listener to accomplish this. When a card with the 'hidden' class is clicked, the hidden class is removed so the image is revealed. I added a selected class that is toggled on whenever a card is in play.
9. The variables baseCard and secondCard refer to the cards in play. BaseCard is the first card chosen that the secondCard is compared to.  These variables both refer to the image sources of the card on the div.
10. To assign the variables, we need to 'store' the image source of the card the user clicks. I did this by storing each click the variable 'path' and pushing all path variables into an array called paths, where baseCard refers to the second to last item in the array and secondCard refers to the last item in the array. This allows them to be compared.
11. Then, the cards must be compared to determine presence of a match. If there is no secondCard currently assigned, nothing happens after first card is clicked.
12. If baseCard === secondCard, it's a match! Both cards stay flipped over and are assigned a class 'match' so that they can't be flipped over again. I use 'this' to assign the 'matched' class to the latest clicked item, and a jquery selector that selects the parent div of the baseCard's image source to assign 'matched' to secondCard
13.  Then, the score adds one and replaces the scoreboard with the new score using .html(). Then, the doWeHaveaWinner function is called to determine if the game is over. If the score is 8, then the user is alerted that he/she wins, and the timer is reset.
14. When baseCard and secondCard don't match, I originally had an alert trigger to inform the user there was no match, and to provide a defacto delay to allow the user to see the two cards flipped over for a moment. Later, I introduced a setTimeOut function to make both un-matched cards flip over after 600 miliseconds. After this, the paths array is emptied.
15. Next I introduced a reset button to reset the game at any time. When clicked this button, removes all image that are children of .card divs, adds the 'hidden' class to all .cards, and removes the 'selected' and 'matched' classes from all .card divs. It then appends a random card to each div again, and resets the score to zero. Finally it resets the html to display score:0.
16. Next, I added a timer. The timer starts the first time a 'hidden' card is clicked. I accomplished this by introducing a new variable, timing that is initially set to 'false', but is set to 'true' when the timer starts.  The reset button also sets the timing variable to false and resets the timer.
17. It's annoying to have to choose a deck every time you load the page, so now, on page load, the bears button will be automatically selected.
18. Finally, after feedback from a stranger led me to realize you could cheat by dragging the images and seeing previews, I introduced a function to prevent default on mousedown of any image. TAKE THAT, cheaters.



## Technologies Used
* .css()
* .html()
* on('click') event listeners
* function expressions and declarations
* conditionals (if, else and for)
* boolean variables
* .attr()
* typeof()
* setTimeOut
* setInterval
* arrays
* .append
* .val
* .alert
* debugger
* console.log
* .push

## Unsolved Problems

I can't figure out how to prevent my left div with the deck choices and timer from going under the gameboard when the browser width shrinks (ie on mobile)

## Steps I'd take to advance the game:
1. Add functionality to allow user to choose a challenge level, levels would represent different numbers of cards.
2. The game should store the value of the time it takes for a user to complete the game, and alert the user know when he/she has reached a new personal record. Need to store information locally that is loaded when the page refreshes/reloads.


## Concentration User stories:
1. As a user, I want the page to load when I want to play the game.
2. When the page loads, I expect to see a minimum of 9 cards arranged in a square. The value on all the cards should be hidden.
3. When I select a card, the value on the card should be displayed.
4. When I select 2 cards and they match, I should be awarded a point. If they don't match, they should flip back over.
5. When I start the game, I want a timer to begin so that I can time myself playing the game.
6. Once all of the cards have been matched with their pair, the game should tell me that I have won and the timer should stop.
7. The game should store the value of the time it takes for me to complete the game, and let me know when I’ve reached a new personal record (will this only work when the page isn’t reloaded?)
8. when the page loads, there will be multiple decks for the user to choose from.
9. The user can determine the challenge level of the game (9, 16, 25, or 36). (gold)
