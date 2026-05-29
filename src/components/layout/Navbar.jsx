import React, { useEffect, useRef, useState } from 'react'
import Barcode from '../ui/Barcode'
import { animateNavbarMenu } from '../../animations/menuAnimation'

const navItems = [
  { label: 'About', href: '#about' },
  {
    label: 'Design + Dev',
    href: '#design-dev',
    children: [
      { label: '2.1  Grids & layouts', href: '#grids-layouts' },
      { label: '2.2  typography', href: '#typography' },
      { label: '2.3  color', href: '#colors' },
      { label: '2.4  motion', href: '#motion' },
    ],
  },
  { label: 'Resources', href: '#resources' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const hasMountedRef = useRef(false)

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      document.body.dataset.navigationStatus = 'is-closed'
      return
    }

    if (!isOpen && document.body.dataset.navigationStatus !== 'is-open') {
      document.body.dataset.navigationStatus = 'is-closed'
      return
    }

    const timeline = animateNavbarMenu({
      menu: menuRef.current,
      navTexts: menuRef.current?.querySelectorAll('[data-nav-text]'),
      isOpen,
    })

    return () => {
      timeline?.kill()
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <div className="nav">
      <div className="nav_wrap">
        <div className="nav_open_btn">
          <a
            navbtn=""
            href="#"
            className="nav_open_text u-mono"
            onClick={(event) => {
              event.preventDefault()
              setIsOpen(true)
            }}
          >
            Menu [<span className="nav_plus">+</span>]
          </a>
        </div>

        <div ref={menuRef} className="nav_menu u-height-full u-width-full">
          <div className="menu_links_contain">
            <div className="nav_menu_top">
              <a href="#home" className="nav_home u-mono" onClick={closeMenu}>©WM</a>
              <a
                navbtn=""
                href="#"
                className="nav_close_text u-mono"
                onClick={(event) => {
                  event.preventDefault()
                  closeMenu()
                }}
              >
                Close [<span className="nav_plus">x</span>]
              </a>
            </div>

            {navItems.map((item) => (
              <div key={item.label} data-directional-hover="" className="menu_link_wrap">
                <a data-nav-text="" href={item.href} className="menu_heading_link u-text-style-h3" onClick={closeMenu}>
                  {item.label}
                </a>

                {item.children && (
                  <div data-directional-hover="" className="menu_dd_links">
                    {item.children.map((child) => (
                      <a key={child.href} data-nav-text="" href={child.href} className="menu_heading_link u-mono" onClick={closeMenu}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="menu_footer">
            <div className="hero_credits_wrap u-flex-vertical-nowrap u-gap-2 nav_credits u-justify-content-between u-align-items-end">
              <div className="hero_credits_text">
                <p heromono="" className="project-by u-mono mono-gray">project by</p>
                <div className="hero_credits_links u-flex-horizontal-nowrap u-gap-2">
                  <a heromono="" href="https://bymonolog.com/" target="_blank" rel="noreferrer" className="credit_link u-mono">huy</a>
                  <p heromono="" className="u-mono">+</p>
                  <a heromono="" href="https://www.ivorjian.com/" target="_blank" rel="noreferrer" className="credit_link u-mono">ivor</a>
                </div>
              </div>

              <Barcode className="hero_barcode nav_barcode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
