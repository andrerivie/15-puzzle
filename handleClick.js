let space = 16
const moveRight = "translateX(100px)"
const moveLeft = "translateX(-100px)"
const moveDown = "translateY(100px)"
const moveUp = "translateY(-100px)"

document.addEventListener('click', (evt) => {
  const block = evt.target
  console.log(block)

  block.style.transform = moveUp
})

const getOptions = (blockId) => {
  let options = {
    up: [],
    down: [],
    left: [],
    right: [],
  }
}
