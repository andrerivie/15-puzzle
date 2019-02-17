const blockContainer = document.getElementById("app")

for (i=1; i<=15; i++) {
  const block = document.createElement("div")
  block.className = "block-item"
  block.id = i
  block.innerHTML = i
  blockContainer.appendChild(block)
}
