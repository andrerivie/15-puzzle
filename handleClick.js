// space variable is initialized to 16 and changes with valid click
let space = 16

// grab a block after the board has been generated
const testBlock = document.getElementById('1')
const blockWidth = testBlock.style.width
// slice off 'px', +2 for border lines
const lengthToMove = Number(blockWidth.slice(0, -2)) + 2

// reference object used for style.transform and html id reassignment once a move
// direction has been determined
const move = {
  right: [lengthToMove, 0],
  rightAdjust: 1,
  left: [(-lengthToMove), 0],
  leftAdjust: -1,
  down: [0, lengthToMove],
  downAdjust: 4,
  up: [0, (-lengthToMove)],
  upAdjust: -4
}

document.addEventListener('click', (evt) => {
  let blockClicked = evt.target
  // adjust blockClicked to parent if text is clicked
  if (!blockClicked.className && blockClicked.parentElement) {
    blockClicked = blockClicked.parentElement
  }
  // gets all possible move options as options[left], options[up], etc
  const options = getOptions(blockClicked.id)
  let directionToMove
  for (direction in options) {
    // determine in which direction the space is
    if (options[direction].includes(space)) {
      directionToMove = direction
    }
  }
  // if directionToMove is truthy there's a move to be made
  // otherwise, just console.log('invalid move')
  if (directionToMove) {
    // get array of blocks towards directionToMove
    let blocksToMove = options[directionToMove]
    // different rules for right/down and left/up
    if (directionToMove === 'right' || directionToMove === 'down') {
      blocksToMove.reverse().push(parseInt(blockClicked.id))
      // filter out the space and anything past the space
      blocksToMove = blocksToMove.filter(blockId => blockId < space)
    } else {
      // add clicked block id to beginning of array
      blocksToMove.unshift(parseInt(blockClicked.id))
      blocksToMove = blocksToMove.filter(blockId => blockId > space)
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
// options object with arrays for up, down, left, right
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
    u-=4
  }
  while (d<=16) {
    options.down.push(d)
    d+=4
  }
  while (l%4>=1) {
    options.left.push(l)
    l-=1
  }
  while (r%4>1 || r%4===0) {
    options.right.push(r)
    r+=1
  }
  return options
}

// helper for grabbing current translate values and adjusting them based on click
const setCurrentTranslate = (currentRule, xyArray) => {
  if (currentRule) {
    // regex will return array of current [x,y] translate values
    let coords = currentRule.match(/[-.\d]+/g)
    // add current values to xyArray (determined by move[right], move[up], etc)
    return `translate(${Number(coords[0]) + Number(xyArray[0])}px, ${Number(coords[1]) + Number(xyArray[1])}px)`
  } else {
    // if no current translate values, just set them
    return `translate(${xyArray[0]}px, ${xyArray[1]}px)`
  }
}

