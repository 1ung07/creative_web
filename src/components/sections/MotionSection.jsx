import React from 'react'

const SpecRow = ({ label, value }) => (
  <div className="g_specs_wrap">
    <div className="g_specs_text u-mono">{label}</div>
    <div className="g_specs_text u-mono">{value}</div>
  </div>
)

const Eyebrow = ({ children, pulse = false, className = '' }) => (
  <div className={`eyebrow_wrap u-mb-5 ${className}`.trim()}>
    <div className="eyebrow_layout">
      <div data-pulse={pulse ? '' : undefined} className="eyebrow_marker"></div>
      <div className="u-mono w-richtext">
        <p>{children}</p>
      </div>
    </div>
  </div>
)

const ArrowIcon = ({ hover = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 145 145" fill="none" className={`anims_bento_arrow ${hover ? 'anims_arrow_hover' : ''}`.trim()}>
    <g clipPath="url(#clip0_389_2286)">
      <path d="M72.1283 144.843L62.5908 135.387L118.846 79.2122H7.08839L6.99255 72.3134L7.08775 65.6327L118.846 65.6334L62.5908 9.45901L72.1283 0.00233188L144.549 72.4228L72.1283 144.843Z" fill="currentColor"></path>
    </g>
    <defs>
      <clipPath id="clip0_389_2286">
        <rect width="102" height="102" fill="currentColor" transform="translate(72.125) rotate(45)"></rect>
      </clipPath>
    </defs>
  </svg>
)

const MotionSection = () => {
  return (
    <>
      <section id="motion" className="animations_wrap u-flex-vertical-nowrap">
        <div className="animations_hero_wrap u-flex-vertical-nowrap u-justify-content-between">
          <div className="anims_hero_top u-flex-vertical-nowrap u-gap-8">
            <Eyebrow pulse>chapter 2.4</Eyebrow>
            <div data-marquee-duplicate="2" data-marquee-scroll-direction-target="" data-marquee-direction="left" data-marquee-status="normal" data-marquee-speed="15" data-marquee-scroll-speed="10" className="marquee-advanced">
              <div data-marquee-scroll-target="" className="marquee-advanced__scroll">
                <div data-marquee-collection-target="" className="marquee-advanced__collection">
                  {['Motion', 'Animation', 'Interaction'].map((label) => (
                    <div key={label} className="marquee-advanced__item">
                      <h2 className="marquee__advanced__p u-text-style-display">{label}</h2>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 90 91" fill="none" className="svg-6"><rect y="0.5" width="90" height="90" rx="45" fill="currentColor"></rect></svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="anims_hero_focus">
            <div className="practice_contain_line"></div>
            <div className="practice_contain_line is-duplicate"></div>
          </div>

          <h2 data-split="heading" className="anims_hero_heading u-text-style-h2">
            <span className="paragraph_indent">Animations</span> can truly make a website come to life. It can tastefully enhance the user experience by drawing attention and establishing a feeling of a website.
          </h2>
        </div>

        <div className="animations_types_wrap u-flex-vertical-nowrap u-width-full">
          <div className="anims_types_text u-flex-vertical-nowrap u-gap-6 u-width-full">
            <h1 className="anims_types_h1 u-text-style-h1">Methods</h1>
            <div className="anim_types_p_wrap u-width-full u-flex-horizontal-nowrap">
              <p className="anims_types_p u-text-style-h4">Any element can be animated, but here are some of the most common ways to  implement motion for the web.</p>
            </div>
          </div>

          <div className="anims_bento_wrap u-width-full">
            <div className="anims_bento_left u-width-full u-height-full u-flex-vertical-nowrap u-justify-content-between">
              <div className="anims_bento_top u-flex-horizontal-nowrap u-height-full u-width-full">
                <div className="anims_bento_content u-flex-vertical-nowrap u-width-full u-justify-content-between u-height-full u-gap-4">
                  <p className="anims_bento_eyebrow u-mono">01</p>
                  <div className="anims_bento_icon u-width-full u-flex-horizontal-nowrap u-justify-content-center u-height-full">
                    <h1 data-anim="number" className="anims_bento_num u-text-style-h1">34</h1>
                  </div>
                  <Eyebrow>text</Eyebrow>
                </div>

                <div className="anims_bento_content u-flex-vertical-nowrap u-width-full u-justify-content-between u-height-full u-gap-4 is-arrow-hover">
                  <p className="anims_bento_eyebrow u-mono">02</p>
                  <div className="anims_bento_icon u-width-full u-flex-horizontal-nowrap u-justify-content-center u-height-full">
                    <div className="anims_arrows_wrap">
                      <ArrowIcon hover />
                      <ArrowIcon />
                    </div>
                  </div>
                  <Eyebrow>hover</Eyebrow>
                </div>
              </div>

              <div className="anims_bento_content u-flex-vertical-nowrap u-width-full u-justify-content-between u-height-full u-gap-4">
                <p className="anims_bento_eyebrow u-mono">03</p>
                <div className="anims_bento_icon u-width-full u-flex-horizontal-nowrap u-justify-content-center u-height-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 160 148" fill="none" data-star="" className="anims_bento_star"><path d="M61.5719 33.4367C62.4035 29.11 68.5965 29.11 69.4281 33.4367L77.1606 73.6663C77.4695 75.2736 78.7264 76.5305 80.3337 76.8394L120.563 84.5719C124.89 85.4035 124.89 91.5965 120.563 92.4281L80.3337 100.161C78.7264 100.469 77.4695 101.726 77.1606 103.334L69.4281 143.563C68.5965 147.89 62.4035 147.89 61.5719 143.563L53.8394 103.334C53.5305 101.726 52.2736 100.469 50.6663 100.161L10.4367 92.4281C6.11004 91.5965 6.11003 85.4035 10.4367 84.5719L50.6663 76.8394C52.2736 76.5305 53.5305 75.2736 53.8394 73.6663L61.5719 33.4367Z" fill="currentColor" data-star="" className="path-6"></path><path d="M126.054 4.32752C126.678 1.08253 131.322 1.08253 131.946 4.32751L134.42 17.1999C134.652 18.4054 135.595 19.348 136.8 19.5797L149.672 22.0539C152.917 22.6776 152.917 27.3224 149.672 27.9461L136.8 30.4203C135.595 30.652 134.652 31.5946 134.42 32.8001L131.946 45.6725C131.322 48.9175 126.678 48.9175 126.054 45.6725L123.58 32.8001C123.348 31.5946 122.405 30.652 121.2 30.4203L108.328 27.9461C105.083 27.3224 105.083 22.6776 108.328 22.0539L121.2 19.5797C122.405 19.348 123.348 18.4054 123.58 17.1999L126.054 4.32752Z" fill="currentColor" data-star=""></path></svg>
                </div>
                <Eyebrow>icons</Eyebrow>
              </div>
            </div>

            <div className="anims_bento_globe u-width-full">
              <div className="anims_bento_content u-flex-vertical-nowrap u-width-full u-justify-content-between u-height-full u-gap-4">
                <p className="anims_bento_eyebrow u-mono">04</p>
                <div className="anims_bento_icon u-width-full u-flex-horizontal-nowrap u-justify-content-center">
                  <div data-accelerating-globe="" className="globe">
                    <div className="globe__before"></div>
                    <div className="globe__back">
                      <div className="globe__back-circle"></div>
                      <div className="globe__back-circle is--1"></div>
                      <div className="globe__back-circle is--2"></div>
                      <div className="globe__back-circle is--3"></div>
                      <div className="globe__back-circle is--4"></div>
                      <div className="globe__back-circle is--5"></div>
                    </div>
                    <div className="globe__front">
                      <div data-accelerating-globe="" className="globe__mirror">
                        {[0, 1, 2, 3].map((item) => (
                          <div key={item} data-accelerating-globe-circle="" className="globe__circle">
                            <div className="globe__circle-inner"></div>
                          </div>
                        ))}
                      </div>
                      <div data-accelerating-globe="circle" className="globe__mirror is--duplicate">
                        {[0, 1, 2, 3].map((item) => (
                          <div key={item} data-accelerating-globe-circle="" className="globe__circle">
                            <div className="globe__circle-inner"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Eyebrow>scrolling</Eyebrow>
              </div>
            </div>
          </div>
        </div>

        <div className="animations_organic_wrap">
          <div className="animations_organic_header">
            <h2 data-split="heading" className="animations_organic_heading u-text-style-h2">Use delays, staggers, and easings to make more organic animations.</h2>
            <div className="animations_organic_bg u-grid-custom">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="animations_organic_bg_column"></div>
              ))}
            </div>
          </div>

          <div className="animations_organic_content u-flex-vertical-wrap">
            <p className="animations_organic_p u-text-style-h5">Just like in nature, nothing moves in straight lines, every motion influences the next. Delays and easings create that organic rhythm, turning motion into flow.</p>
            <div className="animations_organic_inner">
              <SpecRow label="Duration" value="1.5 sec" />
              <SpecRow label="Easing" value="0.23, 0.32, 0.23, 0.2" />
              <SpecRow label="stagger" value="0.025 sec" />
            </div>
          </div>
        </div>
      </section>

      <section className="anims_micro_section">
        <div className="animations_micro_wrap u-flex-vertical-nowrap u-gap-8 u-width-full">
          <div className="anims_micro_text u-width-full">
            <div id="w-node-_5880676a-12fb-4752-d25d-8ea9d95f6bd4-23282b4b" className="anims_micro_eyebrow">
              <Eyebrow>examples of micro-interactions</Eyebrow>
            </div>
            <p id="w-node-c25f5ed2-4ecb-3558-3c4c-335ea4bf94b0-23282b4b" className="anims_micro_h4 u-text-style-h4">Well-crafted micro interactions can turn a plain website into an engaging, memorable experience,making every click, hover, and scroll feel smoother, smarter, and more delightful for your users.</p>
          </div>

          <div className="anims_micro_contain u-width-full u-height-full u-flex-horizontal-nowrap">
            <div className="anims_micro_wrap u-flex-vertical-nowrap u-width-full">
              <button data-button="1" type="button" className="anims_micro_button u-width-full u-flex-horizontal-nowrap u-justify-content-center">
                <div split-hover="" className="anims_micro_inner">
                  <div split-hover-text="" className="micro_btn_text u-text-style-h4">HOVER ME</div>
                </div>
              </button>
              <div className="anims_micro_ease u-width-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 454 455" fill="none"><path d="M0 454.332C357.5 454.332 101.5 0.332031 454 0.332031" stroke="currentColor" strokeWidth="0.664469" data-ease="1"></path></svg>
                <div data-draw="1" className="anims_draw_ease"></div>
              </div>
              <div className="anims_micro_specs u-width-full">
                <SpecRow label="Duration" value=".6 sec" />
                <SpecRow label="easing" value="0.87, 0, 0.13, 1" />
                <SpecRow label="method" value="split-text (gsap)" />
              </div>
            </div>

            <div className="anims_micro_wrap u-flex-vertical-nowrap u-width-full">
              <div className="anims_micro_css w-embed">
                <style>{`
                  @media (hover: hover) and (pointer: fine) {
                    .navbar_btn_container.is-duplicate,
                    .g_btn_container.is-duplicate {
                      transition: transform .45s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .navbar_btn_container,
                    .g_btn_container {
                      transition: transform .45s cubic-bezier(0.16, 1, 0.3, 1);
                      will-change: transform;
                    }
                    .navbar_btn_default:hover .navbar_btn_container.is-duplicate,
                    .g_btn_main:hover .g_btn_container.is-duplicate {
                      transform: translateY(0%);
                    }
                    .navbar_btn_default:hover .navbar_btn_container,
                    .g_btn_main:hover .g_btn_container {
                      transform: scale(0);
                    }
                  }
                `}</style>
              </div>
              <button type="button" data-button="2" className="navbar_btn_default is-overlap">
                <span className="navbar_btn_container">
                  <span className="navbar_btn_text u-text-style-small u-text-transform-uppercase u-weight-bold u-text-style-h4">Hover Me</span>
                </span>
                <span aria-hidden="true" className="navbar_btn_container is-duplicate">
                  <span className="navbar_btn_text u-text-style-small u-text-transform-uppercase u-weight-bold u-text-style-h4 is-duplicate">Hover me</span>
                </span>
              </button>
              <div className="anims_micro_ease u-width-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 454 454" fill="none"><path d="M0.324219 453.832C67.8242 125.354 28.3242 -7.3387 453.824 0.672901" stroke="currentColor" strokeWidth="0.664469" data-ease="2"></path></svg>
                <div data-draw="2" className="anims_draw_ease"></div>
              </div>
              <div className="anims_micro_specs u-width-full">
                <SpecRow label="Duration" value=".45 sec" />
                <SpecRow label="Easing" value="0.16, 1, 0.3, 1" />
                <SpecRow label="Method" value="Overlap &amp; Follow through (CSS)" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MotionSection
