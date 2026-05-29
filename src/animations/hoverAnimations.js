import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

const setupHoverGsap = () => {
  gsap.registerPlugin(CustomEase)

  if (!gsap.parseEase('ease-transition')) {
    CustomEase.create('ease-transition', '0.16, 1, 0.35, 1')
  }

  if (!gsap.parseEase('ease-arrow-hover')) {
    CustomEase.create('ease-arrow-hover', '0.055, 0.72, 0.165, 1')
  }
}

const initVideoHover = (root, cleanupCallbacks) => {
  const timeoutIds = []

  root.querySelectorAll('[data-video-on-hover]').forEach((media) => {
    const video = media.querySelector('video')
    const image = media.querySelector('img')
    const videoSrc = media.getAttribute('data-video-src') || ''

    if (!video || !videoSrc) return

    const playVideo = () => {
      if (!video.getAttribute('src')) {
        video.setAttribute('src', videoSrc)
      }

      media.dataset.videoOnHover = 'active'
      video.play().catch(() => {})

      gsap.to([image, video].filter(Boolean), {
        scale: 1.035,
        duration: 0.6,
        ease: 'ease-transition',
        overwrite: true,
      })
    }

    const resetVideo = () => {
      media.dataset.videoOnHover = 'not-active'

      gsap.to([image, video].filter(Boolean), {
        scale: 1,
        duration: 0.6,
        ease: 'ease-transition',
        overwrite: true,
      })

      const timeoutId = window.setTimeout(() => {
        video.pause()
        video.currentTime = 0
      }, 200)

      timeoutIds.push(timeoutId)
    }

    media.addEventListener('mouseenter', playVideo)
    media.addEventListener('mouseleave', resetVideo)

    cleanupCallbacks.push(() => {
      media.removeEventListener('mouseenter', playVideo)
      media.removeEventListener('mouseleave', resetVideo)
      media.dataset.videoOnHover = 'not-active'
    })
  })

  cleanupCallbacks.push(() => {
    timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId))
  })
}

const initLayoutButtonHover = (root, cleanupCallbacks) => {
  root.querySelectorAll('[data-btn-layout]').forEach((button) => {
    const tooltip = button.querySelector('.button_main_tooltip')

    const onMouseEnter = () => {
      gsap.to(button, {
        y: -2,
        borderRadius: 40,
        duration: 0.28,
        ease: 'ease-transition',
        overwrite: true,
      })

      if (tooltip) {
        gsap.to(tooltip, {
          opacity: 1,
          y: -4,
          duration: 0.28,
          ease: 'ease-transition',
          overwrite: true,
        })
      }
    }

    const onMouseLeave = () => {
      gsap.to(button, {
        y: 0,
        borderRadius: 0,
        duration: 0.28,
        ease: 'ease-transition',
        overwrite: true,
      })

      if (tooltip) {
        gsap.to(tooltip, {
          opacity: 0,
          y: 0,
          duration: 0.28,
          ease: 'ease-transition',
          overwrite: true,
        })
      }
    }

    button.addEventListener('mouseenter', onMouseEnter)
    button.addEventListener('mouseleave', onMouseLeave)

    cleanupCallbacks.push(() => {
      button.removeEventListener('mouseenter', onMouseEnter)
      button.removeEventListener('mouseleave', onMouseLeave)
    })
  })
}

const initMotionArrowHover = (root, cleanupCallbacks) => {
  root.querySelectorAll('.is-arrow-hover').forEach((card) => {
    const hoverArrow = card.querySelector('.anims_arrow_hover')
    const arrows = card.querySelectorAll('.anims_bento_arrow')
    const normalArrow = Array.from(arrows).find((arrow) => arrow !== hoverArrow)

    if (!hoverArrow || !normalArrow) return

    gsap.set(hoverArrow, {
      xPercent: -100,
    })

    const onMouseEnter = () => {
      gsap.to(normalArrow, {
        xPercent: 100,
        duration: 0.9,
        ease: 'ease-arrow-hover',
        overwrite: true,
      })

      gsap.to(hoverArrow, {
        xPercent: 0,
        duration: 0.9,
        ease: 'ease-arrow-hover',
        overwrite: true,
      })
    }

    const onMouseLeave = () => {
      gsap.to(normalArrow, {
        xPercent: 0,
        duration: 0.9,
        ease: 'ease-arrow-hover',
        overwrite: true,
      })

      gsap.to(hoverArrow, {
        xPercent: -100,
        duration: 0.9,
        ease: 'ease-arrow-hover',
        overwrite: true,
      })
    }

    card.addEventListener('mouseenter', onMouseEnter)
    card.addEventListener('mouseleave', onMouseLeave)

    cleanupCallbacks.push(() => {
      card.removeEventListener('mouseenter', onMouseEnter)
      card.removeEventListener('mouseleave', onMouseLeave)
    })
  })
}

export const initHoverAnimations = (scope) => {
  setupHoverGsap()

  const cleanupCallbacks = []
  const context = gsap.context(() => {
    initVideoHover(document, cleanupCallbacks)
    initLayoutButtonHover(document, cleanupCallbacks)
    initMotionArrowHover(document, cleanupCallbacks)
  }, scope)

  return () => {
    cleanupCallbacks.forEach((cleanup) => cleanup())
    context.revert()
  }
}
