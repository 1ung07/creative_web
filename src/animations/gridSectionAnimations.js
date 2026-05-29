import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'

const setupGridGsap = () => {
  gsap.registerPlugin(ScrollTrigger, CustomEase, Flip)

  if (!gsap.parseEase('ease-transition')) {
    CustomEase.create('ease-transition', '0.16, 1, 0.35, 1')
  }
}

const initGuideFlicker = (root) => {
  const guideItems = gsap.utils.toArray(root.querySelectorAll('.grids_guide_item'))

  if (!guideItems.length) return

  const flicker = () => {
    const timeline = gsap.timeline()

    gsap.set(guideItems, {
      opacity: 0,
    })

    guideItems.forEach((item) => {
      const itemTimeline = gsap.timeline()

      itemTimeline
        .to(item, {
          delay: 0.8,
          opacity: 1,
          duration: 0.04,
        })
        .to(item, {
          delay: 0.02,
          opacity: 0,
          duration: 0.03,
        })
        .to(item, {
          opacity: 1,
          duration: 0.04,
        })
        .to(item, {
          opacity: 1,
          duration: 0.05,
          ease: 'none',
        })

      timeline.add(itemTimeline, 0.5 * Math.random())
    })

    return timeline
  }

  ScrollTrigger.create({
    trigger: guideItems[0],
    start: 'top bottom',
    once: false,
    onEnter: flicker,
  })
}

const initLayoutSwitcher = (root, cleanupCallbacks) => {
  const layout = root.querySelector('.grids_flip_content')
  const layoutItems = root.querySelectorAll('.grids_flip_content > *')
  const buttons = root.querySelectorAll('[data-btn-layout]')

  if (!layout || !layoutItems.length || !buttons.length) return

  let activeLayout = 'is-layout1'
  layout.classList.add(activeLayout)

  const switchLayout = (layoutNumber) => {
    const nextLayout = `is-layout${layoutNumber}`

    if (activeLayout === nextLayout) return

    const state = Flip.getState(layoutItems)

    layout.classList.remove(activeLayout)
    layout.classList.add(nextLayout)
    activeLayout = nextLayout

    Flip.from(state, {
      duration: 1,
      ease: 'expo.inOut',
      stagger: {
        amount: 0.2,
        from: 'start',
      },
      scale: true,
    })
  }

  buttons.forEach((button) => {
    const onClick = (event) => {
      event.preventDefault()
      switchLayout(button.getAttribute('data-btn-layout'))
    }

    button.addEventListener('click', onClick)
    cleanupCallbacks.push(() => button.removeEventListener('click', onClick))
  })
}

const initFlipTitleReveal = (root) => {
  const paths = root.querySelectorAll('.grids_flip_h1 path')
  const trigger = root.querySelector('.grids_flip_content')

  if (!paths.length || !trigger) return

  gsap.from(paths, {
    yPercent: 102,
    duration: 1,
    ease: 'ease-transition',
    stagger: 0.05,
    scrollTrigger: {
      trigger,
      start: 'top bottom',
    },
  })
}

const initButtonIntro = (root) => {
  const trigger = root.querySelector('.grids_flip_content')
  const buttons = root.querySelectorAll('.grids_flip_content .button_main_wrap')

  if (!trigger || !buttons.length) return

  gsap
    .timeline({
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reset',
      },
    })
    .from(buttons, {
      y: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    })
    .to(buttons, {
      borderColor: '#ffb700',
      duration: 0.05,
      stagger: 0.1,
    })
    .to(buttons, {
      borderColor: '#515151',
      duration: 0.08,
      stagger: 0.1,
    })
    .to(buttons, {
      borderColor: '#ffb700',
      duration: 0.04,
      stagger: 0.1,
    })
    .to(buttons, {
      borderColor: '#515151',
      duration: 0.06,
      stagger: 0.1,
    })
    .to(buttons, {
      borderColor: '#ffb700',
      duration: 0.03,
      stagger: 0.1,
    })
    .to(buttons, {
      borderColor: '#515151',
      duration: 0.5,
      stagger: 0.1,
      ease: 'power1.out',
    })
}

const initGridParallax = (root) => {
  const triggers = root.querySelectorAll('[data-parallax="trigger"]')

  triggers.forEach((trigger) => {
    const target = trigger.querySelector('[data-parallax="target"]') || trigger
    const direction =
      (trigger.getAttribute('data-parallax-direction') || 'vertical') === 'horizontal'
        ? 'xPercent'
        : 'yPercent'
    const scrub = trigger.getAttribute('data-parallax-scrub')
    const startValue = trigger.getAttribute('data-parallax-start')
    const endValue = trigger.getAttribute('data-parallax-end')
    const scrollStart = trigger.getAttribute('data-parallax-scroll-start') || 'top bottom'
    const scrollEnd = trigger.getAttribute('data-parallax-scroll-end') || 'bottom top'

    gsap.fromTo(
      target,
      {
        [direction]: startValue !== null ? parseFloat(startValue) : 20,
      },
      {
        [direction]: endValue !== null ? parseFloat(endValue) : -20,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: `clamp(${scrollStart})`,
          end: `clamp(${scrollEnd})`,
          scrub: scrub ? parseFloat(scrub) : true,
        },
      },
    )
  })
}

export const initGridSectionAnimations = (scope) => {
  setupGridGsap()

  const cleanupCallbacks = []

  const context = gsap.context(() => {
    const root = document.querySelector('#grids-layouts')

    if (!root) return

    initGuideFlicker(root)
    initLayoutSwitcher(root, cleanupCallbacks)
    initFlipTitleReveal(root)
    initButtonIntro(root)
    initGridParallax(root)
  }, scope)

  ScrollTrigger.refresh()

  return () => {
    cleanupCallbacks.forEach((cleanup) => cleanup())
    context.revert()
  }
}
