import React, { useEffect } from 'react'
import Preloader from './Preloader'

const PageShell = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('body')
    document.body.dataset.navigationStatus = 'is-closed'
    document.body.dataset.barba = 'wrapper'

    return () => {
      document.body.classList.remove('body')
      delete document.body.dataset.navigationStatus
      delete document.body.dataset.barba
    }
  }, [])

  return (
    <div data-barba-namespace="home" data-barba="container" className="page_wrap u-theme-dark">
      <Preloader />
      {children}
    </div>
  )
}

export default PageShell
