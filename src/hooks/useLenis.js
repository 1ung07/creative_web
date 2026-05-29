import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const useLenis = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 0.7,
      infinite: true,
    })

    window.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => {
      lenis.resize()
      ScrollTrigger.refresh()
    }

    requestAnimationFrame(refresh)
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
      gsap.ticker.remove(raf)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()

      if (window.lenis === lenis) {
        delete window.lenis
      }
    }
  }, [])
}

export default useLenis
