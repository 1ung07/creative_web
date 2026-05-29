import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

const setupMenuGsap = () => {
  gsap.registerPlugin(CustomEase, ScrambleTextPlugin)

  if (!gsap.parseEase('ease-secondary')) {
    CustomEase.create('ease-secondary', '0.31,0.75,0.22,1')
  }
}

export const animateNavbarMenu = ({ menu, navTexts, isOpen, onCloseComplete }) => {
  setupMenuGsap()

  if (!menu) return null

  const targets = Array.from(navTexts || [])
  gsap.killTweensOf([menu, '.page_main', ...targets])

  if (isOpen) {
    document.body.dataset.navigationStatus = 'is-open'

    return gsap
      .timeline()
      .set(menu, {
        display: 'flex',
        overflow: 'hidden',
      })
      .fromTo(
        menu,
        {
          opacity: 0,
          height: 0,
        },
        {
          opacity: 1,
          height: 'auto',
          delay: 0.3,
          duration: 0.8,
          ease: 'ease-secondary',
          clearProps: 'height,overflow',
        },
        0,
      )
      .to(
        targets,
        {
          stagger: 0.1,
          duration: 0.8,
          scrambleText: {
            tweenLength: true,
            text: '{original}',
            chars: '-_x0$9',
          },
        },
        0,
      )
      .to(
        '.page_main',
        {
          delay: 0.2,
          opacity: 0.6,
          duration: 0.6,
          ease: 'ease-secondary',
        },
        0,
      )
  }

  document.body.dataset.navigationStatus = 'is-open'

  return gsap
    .timeline({
      onComplete: () => {
        gsap.set(menu, {
          clearProps: 'height,opacity,overflow',
        })
        gsap.set('.page_main', {
          clearProps: 'opacity',
        })
        document.body.dataset.navigationStatus = 'is-closed'
        onCloseComplete?.()
      },
    })
    .to(
      menu,
      {
        opacity: 0,
        height: 0,
        duration: 0.55,
        ease: 'ease-secondary',
        overflow: 'hidden',
      },
      0,
    )
    .to(
      '.page_main',
      {
        opacity: 1,
        duration: 0.45,
        ease: 'ease-secondary',
      },
      0,
    )
}
