let numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

// shuffle method defined below
shuffleArray(numberArray)

const blockContainer = document.getElementById("app")

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
