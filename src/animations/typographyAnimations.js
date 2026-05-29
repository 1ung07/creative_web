import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { Draggable } from 'gsap/Draggable'

const setupTypographyGsap = () => {
  gsap.registerPlugin(SplitText, CustomEase, Draggable)

  if (!gsap.parseEase('ease-transition')) {
    CustomEase.create('ease-transition', '0.16, 1, 0.35, 1')
  }
}

const initFontWeightInteraction = (root, splitInstances, cleanupCallbacks) => {
  if (!window.matchMedia('(min-width: 992px)').matches) return

  const headings = root.querySelectorAll('[data-animate="font-weight"]')
  const influenceRadius = 300
  const maxWeight = 800
  const minWeight = 300
  const chars = []

  headings.forEach((heading) => {
    const split = new SplitText(heading, {
      type: 'chars',
    })

    splitInstances.push(split)
    chars.push(...split.chars)
  })

  const onMouseMove = (event) => {
    const mouseX = event.pageX
    const mouseY = event.pageY

    chars.forEach((char) => {
      const bounds = char.getBoundingClientRect()
      const charX = bounds.left + bounds.width / 2 + window.scrollX
      const charY = bounds.top + bounds.height / 2 + window.scrollY
      const distance = Math.sqrt((mouseX - charX) ** 2 + (mouseY - charY) ** 2)
      const weight =
        distance < influenceRadius
          ? gsap.utils.mapRange(0, influenceRadius, minWeight, maxWeight, Math.max(0, influenceRadius - distance))
          : minWeight

      gsap.to(char, {
        fontWeight: weight,
        duration: 1,
        ease: 'ease-transition',
      })
    })
  }

  document.addEventListener('mousemove', onMouseMove)
  cleanupCallbacks.push(() => document.removeEventListener('mousemove', onMouseMove))
}

const initStickerDrag = (root, draggableInstances) => {
  const bounds = root.querySelector('[data-sticker="wrap"]')
  const stickers = root.querySelectorAll('[data-sticker="item"]')

  if (!bounds || !stickers.length) return

  stickers.forEach((sticker) => {
    const instances = Draggable.create(sticker, {
      bounds,
      dragResistance: 0.1,
      onPress() {
        gsap.to(this.target, {
          scale: 1.2,
          rotation: gsap.utils.random(-30, 30),
          filter: 'drop-shadow(0px 10px 8px rgba(0,0,0,0.3))',
          duration: 0.1,
        })
      },
      onRelease() {
        gsap.to(this.target, {
          scale: 1,
          rotation: 0,
          ease: 'back.out(3)',
          filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))',
          duration: 0.2,
        })
      },
    })

    draggableInstances.push(...instances)
  })
}

const initStackLists = (root) => {
  root.querySelectorAll('[data-stack-list]').forEach((list) => {
    const items = list.querySelectorAll('[data-stack-item]')
    const startTop = 1.75
    const offset = 3.3

    items.forEach((item, index) => {
      item.style.position = 'sticky'
      item.style.top = `${startTop + index * offset}rem`
    })
  })
}

export const initTypographyAnimations = (scope) => {
  setupTypographyGsap()

  const splitInstances = []
  const draggableInstances = []
  const cleanupCallbacks = []

  const context = gsap.context(() => {
    const root = document.querySelector('#typography')

    if (!root) return

    initFontWeightInteraction(root, splitInstances, cleanupCallbacks)
    initStickerDrag(root, draggableInstances)
    initStackLists(root)
  }, scope)

  return () => {
    cleanupCallbacks.forEach((cleanup) => cleanup())
    draggableInstances.forEach((instance) => instance.kill())
    splitInstances.reverse().forEach((split) => split.revert())
    context.revert()
  }
}
