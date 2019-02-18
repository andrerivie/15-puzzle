let windowWidth=window.innerWidth,
    windowHeight=window.innerHeight,
    numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    gameWidth = parseInt(windowWidth*.9)
    gameHeight = parseInt(windowHeight*.9)

const blockContainer = document.getElementById("app")
// make a square depending on screen size
if (windowWidth<750) {
  // ensure width is divisible by 4 for integer lengths everywhere
  while (gameWidth%4 !== 0) {
    gameWidth--
  }
  gameHeight = gameWidth
} else {
  while (gameHeight%4 !== 0) {
    gameHeight--
  }
  gameWidth = gameHeight
}
// set width and height for entire game board
blockContainer.setAttribute('style', `width: ${gameWidth}px; height: ${gameHeight}px;`)

// shuffle function defined below
shuffleArray(numberArray)

// create the starting board html elements
for (i = 0; i <= 14; i++) {
  const block = document.createElement("div")
  block.className = "block-item"
  // keep the html ids 1-indexed
  block.id = i + 1
  const blockNumber = document.createElement("h1")
  const blockNumberText = document.createTextNode(`${numberArray[i]}`)
  blockNumber.appendChild(blockNumberText)
  block.appendChild(blockNumber)
  // set width and height for each board element
  block.setAttribute('style', `width: ${(gameWidth/4)}px; height: ${(gameHeight/4)}px;`)
  blockContainer.appendChild(block)
}

// nice ES6 durstenfield shuffle implementation copied from stackoverflow
// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
