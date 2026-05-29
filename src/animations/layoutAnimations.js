import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

const setupGsap = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

  if (!gsap.parseEase('ease-transition')) {
    CustomEase.create('ease-transition', '0.16, 1, 0.35, 1')
  }
}

export const initHeadingAnimations = (scope) => {
  setupGsap()

  const context = gsap.context(() => {
    const headings = gsap.utils.toArray('[data-split="heading"]')

    headings.forEach((heading) => {
      SplitText.create(heading, {
        type: 'words',
        autoSplit: true,
        mask: 'words',
        wordsClass: 'words-split',
        onSplit: (split) =>
          gsap.from(split.words, {
            duration: 0.9,
            yPercent: 101,
            stagger: 0.02,
            ease: 'ease-transition',
            scrollTrigger: {
              trigger: heading,
              start: 'top 80%',
              once: true,
            },
          }),
      })
    })
  }, scope)

  return () => context.revert()
}

export const initSectionEndAnimations = (scope) => {
  setupGsap()

  const context = gsap.context(() => {
    const sections = gsap.utils.toArray('[data-section-end]')
    const splitTargets = gsap.utils.toArray('[data-split="sectionEnd"]')

    splitTargets.forEach((target) => {
      const section = target.closest('[data-section-end]') || sections[0]

      SplitText.create(target, {
        type: 'chars',
        autoSplit: true,
        mask: 'chars',
        charsClass: 'chars-split',
        onSplit: (split) =>
          gsap.to(split.chars, {
            opacity: 0,
            stagger: {
              amount: 0.8,
              from: 'random',
            },
            ease: 'steps(5)',
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: '+=150%',
              scrub: true,
            },
          }),
      })
    })

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'bottom bottom',
        end: '+=100%',
        scrub: true,
        onLeave: () => {
          gsap.set(section, {
            scale: 1,
            opacity: 1,
          })
        },
        onEnterBack: () => {
          gsap.set(section, {
            scale: 1,
            opacity: 1,
          })
        },
        animation: gsap.to(section, {
          scale: 0.85,
          opacity: 0.1,
          ease: 'none',
        }),
      })
    })
  }, scope)

  ScrollTrigger.refresh()

  return () => context.revert()
}
