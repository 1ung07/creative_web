import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const finalClipPaths = [
  'polygon(0 6%, 100% 40%, 100% 56%, 0 11%)',
  'polygon(0 11%, 100% 56%, 100% 74%, 0 14%)',
  'polygon(0 14%, 100% 74%, 100% 88%, 0 16%)',
  'polygon(0 16%, 100% 88%, 100% 102%, 0 20%)',
  'polygon(0 20%, 100% 102%, 100% 130%, 0 26%)',
  'polygon(0 26%, 100% 130%, 100% 160%, 0 34%)',
]

const setupColorGsap = () => {
  gsap.registerPlugin(ScrollTrigger)
}

const collapsedClipPath = (index) =>
  `polygon(0 ${6 + 5 * index}%, 0 ${40 + 16 * index}%, 0 ${56 + 18 * index}%, 0 ${11 + 5 * index}%)`

const initGradientReveal = (root) => {
  const trigger = root.querySelector('.colors_visual_wrap')
  const gradients = gsap.utils.toArray(root.querySelectorAll('.colors_visual_gradient'))

  if (!trigger || !gradients.length) return

  gradients.forEach((gradient, index) => {
    const fromPath = collapsedClipPath(index)
    const toPath = finalClipPaths[index]

    if (!toPath) return

    gsap.fromTo(
      gradient,
      {
        clipPath: fromPath,
        webkitClipPath: fromPath,
      },
      {
        clipPath: toPath,
        webkitClipPath: toPath,
        ease: 'power2.out',
        scrollTrigger: {
          trigger,
          start: `top ${70 - 8 * index}%`,
          end: `top ${40 - 8 * index}%`,
          scrub: 1,
        },
      },
    )
  })
}

const initStackLists = (root, cleanupCallbacks) => {
  root.querySelectorAll('[data-stack-list]').forEach((list) => {
    const items = list.querySelectorAll('[data-stack-item]')
    const startTop = 1.75
    const offset = 3.3

    items.forEach((item, index) => {
      const previousPosition = item.style.position
      const previousTop = item.style.top

      item.style.position = 'sticky'
      item.style.top = `${startTop + index * offset}rem`

      cleanupCallbacks.push(() => {
        item.style.position = previousPosition
        item.style.top = previousTop
      })
    })
  })
}

export const initColorAnimations = (scope) => {
  setupColorGsap()

  const cleanupCallbacks = []
  const context = gsap.context(() => {
    const root = document.querySelector('#colors')

    if (!root) return

    initGradientReveal(root)
    initStackLists(root, cleanupCallbacks)
  }, scope)

  ScrollTrigger.refresh()

  return () => {
    cleanupCallbacks.forEach((cleanup) => cleanup())
    context.revert()
  }
}
