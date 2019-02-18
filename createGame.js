let w=window.innerWidth
let h=window.innerHeight

let numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

// shuffle method defined below
shuffleArray(numberArray)

let gameHeight, gameWidth
console.log(w, h)
if (w<750) {
  gameWidth = parseInt(w*.9)
  gameHeight = gameWidth
} else {
  gameHeight = parseInt(h*.9)
  gameWidth = gameHeight
}


const blockContainer = document.getElementById("app")
blockContainer.setAttribute('style', `width: ${gameWidth}px; height: ${gameHeight}px;`)

console.log('W:', w, 'H:', h)

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
  block.setAttribute('style', `width: ${(gameWidth/4)-2}px; height: ${(gameHeight/4)-2}px;`)
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
