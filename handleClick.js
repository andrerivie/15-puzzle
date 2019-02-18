let space = 16
const move = {
  right: [100, 0],
  rightAdjust: 1,
  left: [-100, 0],
  leftAdjust: -1,
  down: [0, 100],
  downAdjust: +4,
  up: [0, -100],
  upAdjust: -4
}

document.addEventListener('click', (evt) => {
  const blockClicked = evt.target
  const options = getOptions(blockClicked.id)
  let directionToMove = ''

  for (direction in options) {
    if (options[direction].includes(space)) {
      directionToMove = direction
    }
  }

  if (directionToMove) {
    let blocksToMove = options[directionToMove]
    if (directionToMove === 'right' || directionToMove === 'down') {
      blocksToMove.reverse().push(parseInt(blockClicked.id))
      blocksToMove.shift()
      blocksToMove = blocksToMove.filter(ele => ele < space)
    } else {
      blocksToMove.unshift(parseInt(blockClicked.id))
      blocksToMove.pop()
      blocksToMove.sort()
      blocksToMove = blocksToMove.filter(ele => ele > space)
    }
    space = parseInt(blockClicked.id)
    for (blockId in blocksToMove) {
      currentBlockId = blocksToMove[blockId]
      const currentBlock = document.getElementById(currentBlockId)
      const newRule = setCurrentTranslate(currentBlock.style.transform, move[directionToMove])
      currentBlock.style.transform = newRule
      currentBlock.id = currentBlockId + move[`${directionToMove}Adjust`]
      // currentBlock.style.transform = 'none'
    }
  } else {
    console.log('Invalid move!')
  }





  // block.style.transform = moveUp
})

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

const setCurrentTranslate = (currentRule, xyArray) => {
  if (currentRule) {
    console.log(currentRule)
    let coords = currentRule.match(/[-\d]+/g)
    console.log(coords)

  console.log(`translate(${parseInt(coords[0]) + parseInt(xyArray[0])}px, ${parseInt(coords[1]) + parseInt(xyArray[1])}px)`)
  return `translate(${parseInt(coords[0]) + parseInt(xyArray[0])}px, ${parseInt(coords[1]) + parseInt(xyArray[1])}px)`
  } else {
    return `translate(${xyArray[0]}px, ${xyArray[1]}px)`
  }

}

// "translate(0px, 100px)"
