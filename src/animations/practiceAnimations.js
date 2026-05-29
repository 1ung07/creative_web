import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const setupPracticeGsap = () => {
  gsap.registerPlugin(ScrollTrigger)
}

const initLayerScale = (root) => {
  const trigger = root.querySelector('.practice_contain_content')
  const layers = gsap.utils.toArray(root.querySelectorAll('.practice_contain_inner.u-position-absolute'))

  if (!trigger || !layers.length) return

  layers.forEach((layer, index) => {
    const scaleStep = 0.85
    const targetScale = scaleStep ** (index + 1)

    gsap.to(layer, {
      scale: targetScale,
      ease: 'power2.out',
      transformOrigin: 'center center',
      scrollTrigger: {
        trigger,
        start: 'top center',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

export const initPracticeAnimations = (scope) => {
  setupPracticeGsap()

  const context = gsap.context(() => {
    const root = document.querySelector('.practice_wrap')

    if (!root) return

    initLayerScale(root)
  }, scope)

  ScrollTrigger.refresh()

  return () => {
    context.revert()
  }
}
