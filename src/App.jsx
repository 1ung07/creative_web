import React, { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import PageShell from './components/layout/PageShell'
import AboutSection from './components/sections/AboutSection'
import DesignDevSection from './components/sections/DesignDevSection'
import GridsLayoutsSection from './components/sections/GridsLayoutsSection'
import TypographySection from './components/sections/TypographySection'
import ColorsSection from './components/sections/ColorsSection'
import MotionSection from './components/sections/MotionSection'
import PracticeSection from './components/sections/PracticeSection'
import ResourcesSection from './components/sections/ResourcesSection'
import Footer from './components/layout/Footer'
import useLenis from './hooks/useLenis'
import { initHeadingAnimations, initSectionEndAnimations } from './animations/layoutAnimations'
import { initFooterGridAnimations } from './animations/gridHoverAnimation'
import { initLoaderAnimation } from './animations/loaderAnimation'
import { initAboutAnimations } from './animations/aboutAnimations'
import { initGridSectionAnimations } from './animations/gridSectionAnimations'
import { initTypographyAnimations } from './animations/typographyAnimations'
import { initColorAnimations } from './animations/colorAnimations'
import { initMotionAnimations } from './animations/motionAnimations'
import { initPracticeAnimations } from './animations/practiceAnimations'
import { initResourcesAnimations } from './animations/resourcesAnimations'
import { initHoverAnimations } from './animations/hoverAnimations'

const App = () => {
  useLenis()

  useEffect(() => {
    const cleanupHeadings = initHeadingAnimations()
    const cleanupSectionEnd = initSectionEndAnimations()
    const cleanupFooterGrid = initFooterGridAnimations()
    const cleanupLoaderAnimation = initLoaderAnimation()
    const cleanupAboutAnimations = initAboutAnimations()
    const cleanupGridSectionAnimations = initGridSectionAnimations()
    const cleanupTypographyAnimations = initTypographyAnimations()
    const cleanupColorAnimations = initColorAnimations()
    const cleanupMotionAnimations = initMotionAnimations()
    const cleanupPracticeAnimations = initPracticeAnimations()
    const cleanupResourcesAnimations = initResourcesAnimations()
    const cleanupHoverAnimations = initHoverAnimations()

    return () => {
      cleanupHeadings()
      cleanupSectionEnd()
      cleanupFooterGrid()
      cleanupLoaderAnimation()
      cleanupAboutAnimations()
      cleanupGridSectionAnimations()
      cleanupTypographyAnimations()
      cleanupColorAnimations()
      cleanupMotionAnimations()
      cleanupPracticeAnimations()
      cleanupResourcesAnimations()
      cleanupHoverAnimations()
    }
  }, [])

  return (
    <PageShell>
      <Navbar />
      <main className="page_main">
        <Footer id="home" />
        <AboutSection />
        <DesignDevSection />
        <GridsLayoutsSection />
        <TypographySection />
        <ColorsSection />
        <MotionSection />
        <PracticeSection />
        <ResourcesSection />
        <Footer id="footer" />
      </main>
    </PageShell>
  )
}

export default App
