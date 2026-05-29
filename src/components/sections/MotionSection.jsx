import React from 'react'
import {
  MotionArrowSvg,
  MotionDotSvg,
  MotionEaseSvg,
  MotionStarSvg,
} from '../../utils'

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
                      <MotionDotSvg />
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
                      <MotionArrowSvg hover />
                      <MotionArrowSvg />
                    </div>
                  </div>
                  <Eyebrow>hover</Eyebrow>
                </div>
              </div>

              <div className="anims_bento_content u-flex-vertical-nowrap u-width-full u-justify-content-between u-height-full u-gap-4">
                <p className="anims_bento_eyebrow u-mono">03</p>
                <div className="anims_bento_icon u-width-full u-flex-horizontal-nowrap u-justify-content-center u-height-full">
                  <MotionStarSvg />
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
                <MotionEaseSvg variant={1} />
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
                <MotionEaseSvg variant={2} />
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
