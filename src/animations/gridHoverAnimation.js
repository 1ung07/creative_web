import { gsap } from 'gsap'

const debounce = (callback, delay) => {
  let timeout

  return (...args) => {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(() => callback(...args), delay)
  }
}

const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0

const parseGridColors = (grid, fallback) => {
  const colors = grid.getAttribute('data-grid-colors')

  if (!colors) return fallback

  try {
    return JSON.parse(colors)
  } catch {
    try {
      return JSON.parse(colors.replace(/'/g, '"'))
    } catch {
      return fallback
    }
  }
}

const initGrid = (grid) => {
  const config = {
    gridBackground: 'transparent',
    gridSizeDesktop: 64,
    gridSizeMobile: 8,
    gridBorderSize: 0.15,
    gridBorderColor: '#0C0C0C',
    gridColors: ['#EAEAEA'],
  }

  const background = grid.getAttribute('data-grid-background') || config.gridBackground
  const desktopColumns = parseInt(grid.getAttribute('data-grid-size-desktop'), 10) || config.gridSizeDesktop
  const mobileColumns = parseInt(grid.getAttribute('data-grid-size-mobile'), 10) || config.gridSizeMobile
  const borderSize = parseFloat(grid.getAttribute('data-grid-border-size')) || config.gridBorderSize
  const borderColor = grid.getAttribute('data-grid-border-color') || config.gridBorderColor
  const colors = parseGridColors(grid, config.gridColors)

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  let columns = desktopColumns
  let rows = 0
  let cellSize = 0
  let cells = []
  let activeIndex = null
  let frameId

  grid.style.backgroundColor = background
  grid.appendChild(canvas)

  const resize = () => {
    canvas.width = grid.offsetWidth
    canvas.height = grid.offsetHeight
    columns = window.innerWidth < 768 ? mobileColumns : desktopColumns
    cellSize = canvas.width / columns
    rows = Math.ceil(canvas.height / cellSize)
    cells = []

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        cells.push({
          x: column * cellSize,
          y: row * cellSize,
          color: 'white',
          alpha: 0,
        })
      }
    }
  }

  const fadeCell = (cell) => {
    gsap.to(cell, {
      alpha: 0,
      duration: 0.5,
      delay: 0.2,
      ease: 'power1.out',
    })
  }

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    cells.forEach((cell) => {
      context.fillStyle = cell.color
      context.globalAlpha = cell.alpha
      context.fillRect(cell.x, cell.y, cellSize, cellSize)
      context.globalAlpha = 1
      context.strokeStyle = borderColor
      context.lineWidth = borderSize
      context.strokeRect(cell.x, cell.y, cellSize, cellSize)
    })

    frameId = window.requestAnimationFrame(draw)
  }

  const onMouseMove = (event) => {
    const bounds = canvas.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    const index = cells.findIndex(
      (cell) => x >= cell.x && x < cell.x + cellSize && y >= cell.y && y < cell.y + cellSize,
    )

    if (index === -1 || index === activeIndex) return

    const cell = cells[index]
    cell.color = colors[Math.floor(Math.random() * colors.length)]
    gsap.to(cell, {
      alpha: 1,
      duration: 0.1,
      overwrite: true,
    })
    fadeCell(cell)
    activeIndex = index
  }

  const onResize = debounce(resize, 200)

  resize()
  draw()

  if (!isTouchDevice()) {
    canvas.addEventListener('mousemove', onMouseMove)
  }

  window.addEventListener('resize', onResize)

  return () => {
    window.cancelAnimationFrame(frameId)
    window.removeEventListener('resize', onResize)
    canvas.removeEventListener('mousemove', onMouseMove)
    gsap.killTweensOf(cells)
    canvas.remove()
  }
}

export const initFooterGridAnimations = () => {
  const xTargets = Array.from(document.querySelectorAll('[data-coordinates-x]'))
  const yTargets = Array.from(document.querySelectorAll('[data-coordinates-y]'))
  const gridCleanups = Array.from(document.querySelectorAll('[data-grid]')).map(initGrid)

  const onMouseMove = (event) => {
    const x = Math.round(event.pageX)
    const y = Math.round(event.pageY)

    xTargets.forEach((target) => {
      target.textContent = x
    })

    yTargets.forEach((target) => {
      target.textContent = y
    })
  }

  if (xTargets.length && yTargets.length) {
    document.addEventListener('mousemove', onMouseMove)
  }

  return () => {
    document.removeEventListener('mousemove', onMouseMove)
    gridCleanups.forEach((cleanup) => cleanup())
  }
}
