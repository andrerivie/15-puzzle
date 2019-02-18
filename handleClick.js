// global space variable is initialized to 16 and changes with valid click
let space = 16

const testBlock = document.getElementById('1')
const blockWidth = testBlock.style.width
const blockSide = Number(blockWidth.slice(0, -2)) + 2
console.log(blockSide)

// helper object used for style.transform and html id reassignment once a move
// direction has been determined
const move = {
  right: [blockSide, 0],
  rightAdjust: 1,
  left: [-blockSide, 0],
  leftAdjust: -1,
  down: [0, blockSide],
  downAdjust: 4,
  up: [0, -blockSide],
  upAdjust: -4
}

document.addEventListener('click', (evt) => {
  console.log(w,h)
  let blockClicked = evt.target
  // adjust blockClicked to parent if text is clicked
  if (!blockClicked.className && blockClicked.parentElement) {
    blockClicked = blockClicked.parentElement
  }
  // uses helper function explained below
  const options = getOptions(blockClicked.id)
  let directionToMove = ''
  for (direction in options) {
    // determine which direction the space is in based on move options
    if (options[direction].includes(space)) {
      directionToMove = direction
    }
  }
  // if directionToMove is truthy, there's a move to be made
  // otherwise, just console.log('invalid move')
  if (directionToMove) {
    // get array of blocks we need to move based on determined direction
    let blocksToMove = options[directionToMove]
    // different rules for right/down and left/up due to order
    if (directionToMove === 'right' || directionToMove === 'down') {
      blocksToMove.reverse().push(parseInt(blockClicked.id))
      blocksToMove.shift()
      // remove options we don't want to move
      blocksToMove = blocksToMove.filter(ele => ele < space)
    } else {
      // add clicked block id to beginning of array then pop off ending
      blocksToMove.unshift(parseInt(blockClicked.id))
      blocksToMove.pop()
      // remove options we don't want to move
      blocksToMove = blocksToMove.filter(ele => ele > space)
      blocksToMove = blocksToMove.sort((a,b) => a-b)
    }
    // set the new space variable to what was clicked
    space = parseInt(blockClicked.id)
    // loop through blocksToMove array and:
    // 1. set a new style.transform based on move direction/current transform value
    // 2. reassign the block's id based on move direction
    for (blockId in blocksToMove) {
      currentBlockId = blocksToMove[blockId]
      const currentBlock = document.getElementById(currentBlockId)
      const newRule = setCurrentTranslate(currentBlock.style.transform, move[directionToMove])
      currentBlock.style.transform = newRule
      currentBlock.id = currentBlockId + move[`${directionToMove}Adjust`]
    }
  } else {
    console.log('Invalid move!')
  }
})

// gets all move options from any square and returns them in the form of an
// objtions object with arrays for up, down, left, right
const getOptions = (id) => {
  const blockId = parseInt(id)
  let options = {
    up: [],
    down: [],
    left: [],
    right: [],
  }
  let u = blockId-4
  let d = blockId+4
  let l = blockId-1
  let r = blockId+1
  while (u>0) {
    options.up.push(u)
    u=u-4
  }
  while (d<=16) {
    options.down.push(d)
    d=d+4
  }
  while (l%4>=1) {
    options.left.push(l)
    l=l-1
  }
  while (r%4>1 || r%4===0) {
    options.right.push(r)
    r=r+1
  }
  return options
}

// helper for grabbing current translate values and adjusting them based on click
const setCurrentTranslate = (currentRule, xyArray) => {
  if (currentRule) {
    // regex will return array of current [x,y] translate values
    let coords = currentRule.match(/[-.\d]+/g)
    // add current values to xyArray (determined by move[right], move[up], etc)
    console.log(`${Number(coords[0])} + ${Number(xyArray[0])}px, ${Number(coords[1])} + ${Number(xyArray[1])}px)`)
    return `translate(${Number(coords[0]) + Number(xyArray[0])}px, ${Number(coords[1]) + Number(xyArray[1])}px)`
  } else {
    // if no current translate values, just set them
    console.log(`translate(${xyArray[0]}px, ${xyArray[1]}px)`)
    return `translate(${xyArray[0]}px, ${xyArray[1]}px)`
  }
}

