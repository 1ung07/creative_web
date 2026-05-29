import React from 'react'
import { PracticeWordSvg } from '../../utils'

const practiceLayers = [
  { className: '' },
  { className: 'u-position-absolute' },
  { className: 'u-position-absolute is-2' },
  { className: 'u-position-absolute is-3' },
  { className: 'u-position-absolute is-4' },
  { className: 'u-position-absolute is-4' },
  { className: 'u-position-absolute is-4' },
]

const PracticeLayer = ({ className = '' }) => (
  <div className={`practice_contain_inner ${className}`.trim()}>
    <PracticeWordSvg />
    <PracticeWordSvg />
  </div>
)

const PracticeSection = () => {
  return (
    <section className="practice_wrap">
      <header className="practice_contain_header">
        <div className="eyebrow_wrap u-mb-5">
          <div className="eyebrow_layout">
            <div data-pulse="" className="eyebrow_marker"></div>
            <div className="u-mono w-richtext">
              <p>chapter 3: Final word</p>
            </div>
          </div>
        </div>
        <h2 className="practice_contain_heading u-text-style-h2">
          And last but not least,&nbsp;&nbsp;it is important for you to constantly...
        </h2>
      </header>

      <div className="practice_contain_content">
        {practiceLayers.map((layer, index) => (
          <PracticeLayer className={layer.className} key={`${layer.className}-${index}`} />
        ))}

        <div className="practice_contain_focus">
          <div className="practice_contain_line"></div>
          <div className="practice_contain_line is-duplicate"></div>
        </div>
      </div>
    </section>
  )
}

export default PracticeSection
