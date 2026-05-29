import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

const setupMotionGsap = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, MotionPathPlugin)

  if (!gsap.parseEase('ease-primary')) {
    CustomEase.create('ease-primary', '0.87, 0, 0.13, 1')
  }

  if (!gsap.parseEase('ease-button')) {
    CustomEase.create('ease-button', '0.16, 1, 0.3, 1')
  }
}

const initAcceleratingGlobe = (root, cleanupCallbacks) => {
  const globeWidthSteps = [
    ['50%', '37.5%'],
    ['37.5%', '25%'],
    ['25%', '12.5%'],
    ['calc(12.5% + 1px)', 'calc(0% + 1px)'],
    ['calc(0% + 1px)', 'calc(12.5% + 1px)'],
    ['12.5%', '25%'],
    ['25%', '37.5%'],
    ['37.5%', '50%'],
  ]

  root.querySelectorAll('[data-accelerating-globe]').forEach((globe) => {
    const circles = globe.querySelectorAll('[data-accelerating-globe-circle]')

    if (circles.length < 8) return

    const timeline = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 1,
        ease: 'none',
      },
    })

    circles.forEach((circle, index) => {
      const [fromWidth, toWidth] = globeWidthSteps[index]

      timeline.fromTo(
        circle,
        {
          width: fromWidth,
        },
        {
          width: toWidth,
        },
        index === 0 ? 0 : '<',
      )
    })

    let resetTimer
    let previousScrollY = window.scrollY
    let previousTime = performance.now()

    const handleScroll = () => {
      const currentTime = performance.now()
      const scrollDelta = window.scrollY - previousScrollY
      const timeDelta = currentTime - previousTime
      previousScrollY = window.scrollY
      previousTime = currentTime

      const velocity = timeDelta > 0 ? (scrollDelta / timeDelta) * 1000 : 0
      const speed = Math.abs(0.005 * velocity) + 1

      timeline.timeScale(speed)
      window.clearTimeout(resetTimer)

      resetTimer = window.setTimeout(() => {
        gsap.to(timeline, {
          timeScale: 1,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: true,
        })
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    cleanupCallbacks.push(() => {
      window.removeEventListener('scroll', handleScroll)
      window.clearTimeout(resetTimer)
      timeline.kill()
    })
  })
}

const initMarquees = (root, cleanupCallbacks) => {
  root.querySelectorAll('[data-marquee-scroll-direction-target]').forEach((marquee) => {
    const collection = marquee.querySelector('[data-marquee-collection-target]')
    const scrollTarget = marquee.querySelector('[data-marquee-scroll-target]')

    if (!collection || !scrollTarget) return

    const marqueeSpeed = parseFloat(marquee.dataset.marqueeSpeed) || 15
    const direction = marquee.dataset.marqueeDirection === 'right' ? 1 : -1
    const duplicateCount = parseInt(marquee.dataset.marqueeDuplicate || '0', 10)
    const scrollSpeed = parseFloat(marquee.dataset.marqueeScrollSpeed) || 10
    const viewportMultiplier = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1
    const duration = marqueeSpeed * (collection.offsetWidth / window.innerWidth) * viewportMultiplier
    const previousMarginLeft = scrollTarget.style.marginLeft
    const previousWidth = scrollTarget.style.width
    const createdClones = []

    scrollTarget.style.marginLeft = `${-1 * scrollSpeed}%`
    scrollTarget.style.width = `${2 * scrollSpeed + 100}%`

    for (let index = 0; index < duplicateCount; index += 1) {
      const clone = collection.cloneNode(true)
      createdClones.push(clone)
      scrollTarget.appendChild(clone)
    }

    const collections = marquee.querySelectorAll('[data-marquee-collection-target]')
    const loop = gsap
      .to(collections, {
        xPercent: -100,
        repeat: -1,
        duration,
        ease: 'linear',
      })
      .totalProgress(0.5)

    gsap.set(collections, {
      xPercent: direction === 1 ? 100 : -100,
    })

    loop.timeScale(direction)
    loop.play()
    marquee.setAttribute('data-marquee-status', 'normal')

    ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const isScrollingDown = self.direction === 1
        const currentDirection = isScrollingDown ? -direction : direction

        loop.timeScale(currentDirection)
        marquee.setAttribute('data-marquee-status', isScrollingDown ? 'normal' : 'inverted')
      },
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: marquee,
        start: '0% 100%',
        end: '100% 0%',
        scrub: 0,
      },
    }).fromTo(
      scrollTarget,
      {
        x: `${direction === -1 ? scrollSpeed : -scrollSpeed}vw`,
      },
      {
        x: `${direction === -1 ? -scrollSpeed : scrollSpeed}vw`,
        ease: 'none',
      },
    )

    cleanupCallbacks.push(() => {
      loop.kill()
      createdClones.forEach((clone) => clone.remove())
      scrollTarget.style.marginLeft = previousMarginLeft
      scrollTarget.style.width = previousWidth
      marquee.setAttribute('data-marquee-status', 'normal')
    })
  })
}

const initMicroInteractions = (microRoot, splitInstances, cleanupCallbacks) => {
  if (!microRoot) return

  const buttonsOne = microRoot.querySelectorAll('[data-button="1"]')
  const easeOne = microRoot.querySelector('[data-ease="1"]')
  const drawOne = microRoot.querySelector('[data-draw="1"]')

  buttonsOne.forEach((button) => {
    const text = button.querySelector('[split-hover-text]')
    if (!text || !easeOne || !drawOne) return

    const split = new SplitText(text, {
      type: 'chars',
    })
    splitInstances.push(split)

    const handleMouseEnter = () => {
      button.hoverTimeline?.kill()

      button.hoverTimeline = gsap
        .timeline()
        .to(
          button,
          {
            borderRadius: 50,
            backgroundColor: '#EAEAEA',
            color: '#070707',
            duration: 0.6,
            ease: 'ease-primary',
          },
          0,
        )
        .to(
          split.chars,
          {
            yPercent: -93,
            duration: 0.6,
            ease: 'ease-primary',
            stagger: {
              amount: 0.075,
            },
            overwrite: true,
          },
          0,
        )
        .to(
          drawOne,
          {
            duration: 0.57,
            ease: 'ease-primary',
            motionPath: {
              path: easeOne,
              align: easeOne,
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
            },
          },
          0,
        )
    }

    const handleMouseLeave = () => {
      button.hoverTimeline?.reverse()
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)

    cleanupCallbacks.push(() => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.hoverTimeline?.kill()
    })
  })

  const buttonTwo = microRoot.querySelector('[data-button="2"]')
  const easeTwo = microRoot.querySelector('[data-ease="2"]')
  const drawTwo = microRoot.querySelector('[data-draw="2"]')

  if (!buttonTwo || !easeTwo || !drawTwo) return

  const handleButtonTwoEnter = () => {
    buttonTwo.hoverTimeline?.kill()

    buttonTwo.hoverTimeline = gsap.timeline().to(
      drawTwo,
      {
        duration: 0.45,
        ease: 'ease-button',
        motionPath: {
          path: easeTwo,
          align: easeTwo,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0,
    )
  }

  const handleButtonTwoLeave = () => {
    buttonTwo.hoverTimeline?.reverse()
  }

  buttonTwo.addEventListener('mouseenter', handleButtonTwoEnter)
  buttonTwo.addEventListener('mouseleave', handleButtonTwoLeave)

  cleanupCallbacks.push(() => {
    buttonTwo.removeEventListener('mouseenter', handleButtonTwoEnter)
    buttonTwo.removeEventListener('mouseleave', handleButtonTwoLeave)
    buttonTwo.hoverTimeline?.kill()
  })
}

const initOrganicColumns = (root) => {
  gsap.to(root.querySelectorAll('.animations_organic_bg_column'), {
    yPercent: 50,
    duration: 0.6,
    ease: 'power1.inOut',
    transformOrigin: 'bottom',
    stagger: {
      each: 0.08,
      from: 'center',
      repeat: -1,
      yoyo: true,
    },
  })
}

const initNumberLoop = (root, cleanupCallbacks) => {
  const number = root.querySelector('[data-anim="number"]')
  const trigger = root.querySelector('.animations_types_wrap')
  const value = {
    value: 0,
  }

  if (!number) return

  const previousText = number.textContent

  gsap.to(value, {
    delay: 0.2,
    onUpdate: () => {
      number.textContent = Math.round(value.value)
    },
    ease: 'power1.inOut',
    value: 50,
    duration: 3,
    repeat: -1,
    repeatDelay: 0.5,
    yoyo: true,
    scrollTrigger: {
      trigger: trigger || root,
      start: 'top bottom',
    },
  })

  cleanupCallbacks.push(() => {
    number.textContent = previousText
  })
}

const initStarSpin = (root) => {
  const stars = root.querySelectorAll('[star], [data-star]')

  gsap.set(stars, {
    transformPerspective: 1000,
    transformOrigin: 'center center',
  })

  stars.forEach((star) => {
    gsap.to(star, {
      rotationY: 360,
      duration: 4,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    })
  })
}

export const initMotionAnimations = (scope) => {
  setupMotionGsap()

  const splitInstances = []
  const cleanupCallbacks = []

  const context = gsap.context(() => {
    const root = document.querySelector('#motion')
    const microRoot = document.querySelector('.anims_micro_section')

    if (!root) return

    initAcceleratingGlobe(root, cleanupCallbacks)
    initNumberLoop(root, cleanupCallbacks)
    initStarSpin(root)
    initMarquees(root, cleanupCallbacks)
    initMicroInteractions(microRoot, splitInstances, cleanupCallbacks)
    initOrganicColumns(root)
  }, scope)

  ScrollTrigger.refresh()

  return () => {
    cleanupCallbacks.forEach((cleanup) => cleanup())
    splitInstances.reverse().forEach((split) => split.revert())
    context.revert()
  }
}
