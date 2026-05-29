import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

const setupResourcesGsap = () => {
  gsap.registerPlugin(ScrollTrigger, CustomEase)

  if (!gsap.parseEase('ease-transition')) {
    CustomEase.create('ease-transition', '0.16, 1, 0.35, 1')
  }
}

const initResourcesReveal = (root) => {
  const topItems = root.querySelectorAll('.resources_eyebrow_contain, .resources_contain_p')
  const leftItems = root.querySelectorAll('.resources_contain_deco, .resources_contain_left svg')
  const groupItems = root.querySelectorAll('.resources_contain_item')
  const links = root.querySelectorAll('.resources_subitem_item')

  gsap.from(topItems, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'ease-transition',
    stagger: 0.12,
    scrollTrigger: {
      trigger: root,
      start: 'top 70%',
      once: true,
    },
  })

  gsap.from(leftItems, {
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'ease-transition',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.resources_contain_inner',
      start: 'top 90%',
      once: true,
    },
  })

  gsap.from(groupItems, {
    y: 34,
    opacity: 0,
    duration: 0.8,
    ease: 'ease-transition',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.resources_contain_collection',
      start: 'top 90%',
      once: true,
    },
  })

  gsap.from(links, {
    yPercent: 80,
    opacity: 0,
    duration: 0.7,
    ease: 'ease-transition',
    stagger: 0.025,
    scrollTrigger: {
      trigger: '.resources_contain_collection',
      start: 'top 90%',
      once: true,
    },
  })
}

const initResourcesHover = (root, cleanupCallbacks) => {
  root.querySelectorAll('.resources_subitem_link').forEach((link) => {
    const label = link.querySelector('.resources_subitem_text:not(.is-duplicate)')
    const arrow = link.querySelector('.resources_subitem_text.is-duplicate')

    const onMouseEnter = () => {
      gsap.to(link, {
        backgroundColor: 'var(--swatch--white)',
        duration: 0.35,
        ease: 'ease-transition',
        overwrite: true,
      })

      gsap.to(label, {
        x: 10,
        color: 'var(--swatch--black)',
        duration: 0.35,
        ease: 'ease-transition',
        overwrite: true,
      })

      gsap.to(arrow, {
        x: -10,
        color: 'var(--swatch--black)',
        duration: 0.35,
        ease: 'ease-transition',
        overwrite: true,
      })
    }

    const onMouseLeave = () => {
      gsap.to(link, {
        backgroundColor: 'transparent',
        duration: 0.35,
        ease: 'ease-transition',
        overwrite: true,
      })

      gsap.to([label, arrow], {
        x: 0,
        clearProps: 'color',
        duration: 0.35,
        ease: 'ease-transition',
        overwrite: true,
      })
    }

    link.addEventListener('mouseenter', onMouseEnter)
    link.addEventListener('mouseleave', onMouseLeave)

    cleanupCallbacks.push(() => {
      link.removeEventListener('mouseenter', onMouseEnter)
      link.removeEventListener('mouseleave', onMouseLeave)
    })
  })
}

export const initResourcesAnimations = (scope) => {
  setupResourcesGsap()

  const cleanupCallbacks = []
  const context = gsap.context(() => {
    const root = document.querySelector('#resources')

    if (!root) return

    initResourcesReveal(root)
    initResourcesHover(root, cleanupCallbacks)
  }, scope)

  ScrollTrigger.refresh()

  return () => {
    cleanupCallbacks.forEach((cleanup) => cleanup())
    context.revert()
  }
}
