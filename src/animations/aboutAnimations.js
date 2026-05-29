import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

const setupAboutGsap = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, ScrambleTextPlugin)

  if (!gsap.parseEase('ease-primary')) {
    CustomEase.create('ease-primary', '0.87, 0, 0.13, 1')
  }

  if (!gsap.parseEase('ease-transition')) {
    CustomEase.create('ease-transition', '0.16, 1, 0.35, 1')
  }
}

const wrapWordOverlays = (words) => {
  const wrappers = []

  words.forEach((word) => {
    const wrapper = document.createElement('div')
    const overlay = document.createElement('div')

    wrapper.className = 'word-wrapper'
    overlay.className = 'overlay-block'

    word.parentNode.insertBefore(wrapper, word)
    wrapper.appendChild(word)
    wrapper.appendChild(overlay)
    wrappers.push(wrapper)
  })

  return () => {
    wrappers.forEach((wrapper) => {
      const overlay = wrapper.querySelector('.overlay-block')
      const word = Array.from(wrapper.childNodes).find((node) => node !== overlay)

      overlay?.remove()

      if (word && wrapper.parentNode) {
        wrapper.parentNode.insertBefore(word, wrapper)
      }

      wrapper.remove()
    })
  }
}

export const initAboutAnimations = (scope) => {
  setupAboutGsap()

  const splitInstances = []
  const unwrapCallbacks = []

  const context = gsap.context(() => {
    const firstPanel = document.querySelector('.about_card_sticky')
    const card = document.querySelector('.about_p1_contain')
    const creativityHeadings = document.querySelectorAll('[data-about-heading]')
    const technicality = document.querySelector('[data-about-tech]')
    const secondPanel = document.querySelector('.about_p2_sticky')
    const aboutTexts = document.querySelectorAll('.about_p2_text')
    const pixelTransition = document.querySelector('.pixel_transition')

    if (firstPanel && card && creativityHeadings.length && technicality) {
      const creativitySplit = SplitText.create(creativityHeadings, {
        type: 'chars',
      })

      splitInstances.push(creativitySplit)

      ScrollTrigger.create({
        trigger: firstPanel,
        pin: true,
        start: 'top top',
        end: 'bottom bottom',
      })

      gsap.set(creativitySplit.chars, {
        yPercent: -100,
      })

      gsap.to(creativitySplit.chars, {
        yPercent: 0,
        duration: 0.7,
        stagger: {
          amount: 0.2,
        },
        ease: 'ease-primary',
        scrollTrigger: {
          trigger: '.about_h1_t',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      })

      ScrollTrigger.create({
        trigger: technicality,
        start: 'top 40%',
        end: 'bottom 50%',
        onEnter: () => {
          gsap.to(technicality, {
            duration: 1.6,
            scrambleText: {
              chars: '+_1x><*^0!~`',
              text: '</TECHNICALITY>',
              tweenLength: true,
              revealDelay: 0.4,
              speed: 0.1,
            },
          })
        },
        onLeaveBack: () => {
          gsap.to(technicality, {
            duration: 0.8,
            scrambleText: {
              chars: '+_1x><*^0!~`',
              text: '</ >',
              speed: 0.2,
            },
          })
        },
      })

      gsap.to(card, {
        width: '100%',
        height: '100%',
        scrollTrigger: {
          trigger: firstPanel,
          scrub: true,
          start: 'top top',
          end: 'bottom bottom',
        },
      })

      gsap.to('.card-plus', {
        rotation: 180,
        transformOrigin: '50% 50%',
        scrollTrigger: {
          trigger: firstPanel,
          scrub: true,
          start: 'top top',
          end: 'bottom bottom',
        },
      })
    }

    if (secondPanel && aboutTexts.length) {
      const textSplit = SplitText.create(aboutTexts, {
        type: 'words',
      })

      splitInstances.push(textSplit)
      unwrapCallbacks.push(wrapWordOverlays(textSplit.words))

      ScrollTrigger.create({
        trigger: secondPanel,
        pin: true,
        start: 'top top',
        end: 'bottom bottom',
      })

      gsap.to('.overlay-block', {
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: secondPanel,
          start: 'top 20%',
          end: 'bottom 70%',
          scrub: 1,
        },
      })

      document.querySelectorAll('[data-path-group], [path-group]').forEach((group) => {
        const paths = group.querySelectorAll('path')

        gsap.from(paths, {
          opacity: 0,
          ease: 'steps(1)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: secondPanel,
            start: 'top 20%',
            end: 'bottom bottom',
            scrub: 1,
          },
        })
      })
    }

    if (pixelTransition) {
      const pixels = Array.from(pixelTransition.querySelectorAll('.pixel_item'))
      const sortedPixels = pixels
        .map((pixel, index) => ({
          pixel,
          sort: Math.random() + index / pixels.length,
        }))
        .sort((a, b) => b.sort - a.sort)
        .map((item) => item.pixel)

      gsap.set(pixels, {
        opacity: 0,
      })

      gsap.to(sortedPixels, {
        opacity: 1,
        stagger: {
          amount: 1.3,
          grid: [10, 9],
          axis: 'y',
        },
        ease: 'ease-transition',
        scrollTrigger: {
          trigger: pixelTransition,
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
        },
      })
    }
  }, scope)

  ScrollTrigger.refresh()

  return () => {
    context.revert()
    unwrapCallbacks.reverse().forEach((unwrap) => unwrap())
    splitInstances.reverse().forEach((split) => split.revert())
  }
}
