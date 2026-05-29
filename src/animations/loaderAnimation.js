import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { SplitText } from 'gsap/SplitText'

const setupLoaderGsap = () => {
  gsap.registerPlugin(CustomEase, ScrambleTextPlugin, SplitText)

  if (!gsap.parseEase('ease-preloader')) {
    CustomEase.create('ease-preloader', '.64,.04,.42,.99')
  }
}

const addFlicker = (timeline, targets, timings) => {
  targets.forEach((target) => {
    const flicker = gsap.timeline({ repeat: 0 })

    timings.forEach((step) => {
      flicker.to(target, step)
    })

    timeline.add(flicker, 0.5 * Math.random())
  })
}

const initHeroLoaderAnimation = (delay = 0.15) => {
  const logoPaths = gsap.utils.toArray('.hero_wrap .hero-logo-path')
  const brackets = gsap.utils.toArray('.hero_wrap [data-bracket], .hero_wrap [bracket]')
  const barcodeLines = gsap.utils.toArray('.hero_wrap [data-barcode-line], .hero_wrap [barcodeLine]')
  const monoTexts = gsap.utils
    .toArray('.hero_wrap [data-hero-mono], .hero_wrap [heroMono]')
    .filter((text) => !text.classList.contains('coordinates__p'))
  const originalTexts = monoTexts.map((text) => text.textContent)

  const timeline = gsap.timeline({ delay: 0.15 })

  timeline
    .set(logoPaths, { opacity: 0 }, 0)
    .set(brackets, { opacity: 0 }, 0)
    .set(barcodeLines, { yPercent: -101 }, 0)
    .to(
      monoTexts,
      {
        duration: 0.00001,
        scrambleText: {
          chars: ' ',
          text: ' ',
          speed: 0.6,
          tweenLength: false,
          rightToLeft: false,
        },
      },
      0,
    )

  addFlicker(timeline, logoPaths, [
    { delay: 0.25, opacity: 1, duration: 0.05 },
    { delay: 0.02, opacity: 0, duration: 0.04 },
    { delay: 0.1, opacity: 1, duration: 0.06 },
    { delay: 0.2, opacity: 1, duration: 0.07 },
  ])

  addFlicker(timeline, brackets, [
    { delay: 0.25, opacity: 1, duration: 0.03 },
    { delay: 0.02, opacity: 0, duration: 0.04 },
    { delay: 0.1, opacity: 1, duration: 0.02 },
    { delay: 0.01, opacity: 1, duration: 0.04 },
  ])

  timeline
    .to(
      monoTexts,
      {
        duration: 0.5,
        stagger: 0.1,
        scrambleText: (index) => ({
          chars: ' ',
          text: originalTexts[index],
          speed: 0.5,
          tweenLength: false,
          rightToLeft: false,
        }),
      },
      0.35,
    )
    .to(
      barcodeLines,
      {
        delay: 0.3,
        yPercent: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'ease-preloader',
      },
      0.35,
    )

  return {
    timeline,
    logoPaths,
    brackets,
    barcodeLines,
    monoTexts,
    originalTexts,
  }
}

const initPreloaderAnimation = () => {
  const loader = document.querySelector('.loader_wrap')

  if (!loader) return null

  const visibleParts = loader.querySelectorAll(
    '.loader-mid-wrap, .loader-dials, .loader_percentt, .loader-details-wrap, .loader_text',
  )
  const loaderTexts = loader.querySelectorAll('[loader-text]')
  const loaderTextValues = Array.from(loaderTexts).map((text) => text.textContent)
  const percent = loader.querySelector('[loader-percent]')
  const percentWrap = loader.querySelector('[loader-div]')
  const loaderDials = loader.querySelectorAll('.loader-dial')
  const blinkTargets = Array.from(loader.querySelectorAll('[loader-blink]')).filter(
    (target) => !target.hasAttribute('loader-percent'),
  )
  const blinkSplit = SplitText.create(blinkTargets, {
    type: 'chars',
  })
  const blinkChars = blinkSplit.chars
  const percentValue = {
    value: 0,
  }
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  const timeline = gsap.timeline()

  const updatePercent = () => {
    if (percent) {
      percent.textContent = Math.round(percentValue.value)
    }
  }

  gsap.set(loader, {
    display: 'block',
    autoAlpha: 1,
  })
  gsap.set([percentWrap, percent], {
    autoAlpha: 1,
  })
  if (percent) {
    percent.textContent = '0'
  }
  gsap.set(visibleParts, {
    autoAlpha: 0,
  })
  gsap.set(blinkChars, {
    opacity: 0,
  })

  addFlicker(timeline, blinkChars, [
    { delay: 0.4, opacity: 1, duration: 0.04 },
    { delay: 0.02, opacity: 0, duration: 0.03 },
    { opacity: 1, duration: 0.04 },
    { opacity: 1, duration: 0.05, ease: 'power4.out' },
  ])

  timeline
    .to(
      visibleParts,
      {
        autoAlpha: 1,
        duration: 0.5,
      },
      0,
    )
    .from(
      percentWrap,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'steps(2)',
      },
      0,
    )
    .to(
      loaderTexts,
      {
        duration: 0.00001,
        scrambleText: {
          chars: ' ',
          text: ' ',
          speed: 0.6,
          tweenLength: false,
          rightToLeft: false,
        },
      },
      0,
    )
    .to(
      loaderTexts,
      {
        delay: 0.6,
        duration: 0.2,
        stagger: 0.14,
        scrambleText: (index) => ({
          chars: ' ',
          text: loaderTextValues[index],
          speed: 0.5,
          tweenLength: false,
          rightToLeft: false,
        }),
      },
      0,
    )
    .to(
      percentValue,
      {
        delay: 1.2,
        onStart: updatePercent,
        onUpdate: updatePercent,
        ease: 'ease-preloader',
        value: 100,
        duration: 2,
      },
      0,
    )
    .to(
      percentWrap,
      {
        delay: 1.2,
        duration: 1.8,
        ease: 'ease-preloader',
        ...(isMobile ? { y: '-88dvh' } : { height: '100%' }),
      },
      0,
    )
    .to(loaderDials, {
      duration: 0.4,
      xPercent: 100,
      stagger: 0.07,
      ease: 'ease-preloader',
    })
    .to(
      loaderTexts,
      {
        duration: 0.1,
        stagger: 0.03,
        scrambleText: () => ({
          chars: ' ',
          text: ' ',
          speed: 0.5,
          tweenLength: false,
          rightToLeft: true,
        }),
      },
      3,
    )
    .to(
      blinkChars,
      {
        stagger: {
          amount: 0.1,
          from: 'random',
        },
        duration: 0.4,
        ease: 'steps(4)',
        opacity: 0,
      },
      3.2,
    )
    .to(
      loader,
      {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'steps(7)',
      },
      3.6,
    )
    .set(loader, {
      display: 'none',
    })

  return {
    timeline,
    loader,
    blinkSplit,
    loaderTexts,
    loaderTextValues,
    percent,
  }
}

export const initLoaderAnimation = () => {
  setupLoaderGsap()

  const preloaderAnimation = initPreloaderAnimation()
  const heroAnimation = initHeroLoaderAnimation(preloaderAnimation ? 3.5 : 0.15)

  return () => {
    preloaderAnimation?.timeline.kill()
    preloaderAnimation?.blinkSplit.revert()
    if (preloaderAnimation?.loader) {
      gsap.set(preloaderAnimation.loader, { clearProps: 'all' })
    }
    preloaderAnimation?.loaderTexts.forEach((text, index) => {
      text.textContent = preloaderAnimation.loaderTextValues[index]
    })
    if (preloaderAnimation?.percent) {
      preloaderAnimation.percent.textContent = '0'
    }

    heroAnimation.timeline.kill()
    gsap.set([...heroAnimation.logoPaths, ...heroAnimation.brackets], { clearProps: 'opacity' })
    gsap.set(heroAnimation.barcodeLines, { clearProps: 'transform' })
    heroAnimation.monoTexts.forEach((text, index) => {
      text.textContent = heroAnimation.originalTexts[index]
    })
  }
}
