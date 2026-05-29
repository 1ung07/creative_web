import React from 'react'

const DesignDevSection = () => {
  return (
    <section
      id="design-dev"
      data-section-end=""
      className="design-dev_wrap u-flex-vertical-nowrap u-justify-content-between u-zindex-1"
    >
      <div className="dd_chapter_wrap u-flex-horizontal-nowrap u-width-full u-justify-content-end">
        <h2 data-split="sectionEnd" className="dd_chapter_heading u-text-style-display">
          Design &amp;
          <br />
          Development
        </h2>
        <div className="dd_chapter u-flex-horizontal-wrap u-justify-content-between u-align-items-start">
          <p className="u-mono">chapter:</p>
          <p data-split="sectionEnd" className="dd_chapter_num u-text-style-display">
            02
          </p>
        </div>
      </div>

      <div className="dd_info_contain u-width-full">
        <div className="dd_info_wrap u-flex-vertical-nowrap u-justify-content-between u-zindex-1">
          <h3 className="dd_info_head u-text-style-h4 u-text-transform-capitalize">chapters</h3>
          <div className="dd_info_chapters u-width-full">
            <div className="g_specs_wrap specs_2">
              <div className="g_specs_text u-mono">2.1</div>
              <div className="g_specs_text u-mono">grids &amp; layouts</div>
            </div>
            <div className="g_specs_wrap specs_2">
              <div className="g_specs_text u-mono">2.2</div>
              <div className="g_specs_text u-mono">typography</div>
            </div>
            <div className="g_specs_wrap specs_2">
              <div className="g_specs_text u-mono">2.3</div>
              <div className="g_specs_text u-mono">color</div>
            </div>
            <div className="g_specs_wrap specs_2">
              <div className="g_specs_text u-mono">2.4</div>
              <div className="g_specs_text u-mono">animation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DesignDevSection
