import React from 'react'

const loaderAttr = (name) => ({ [name]: '' })

const Preloader = () => {
  const loaderTextAttr = loaderAttr('loader-text')
  const loaderBlinkAttr = loaderAttr('loader-blink')

  return (
    <div className="loader_wrap u-width-full">
      <style>{`
        .loader_wrap.u-width-full {
          display: block;
          visibility: visible;
          opacity: 1;
        }

        .loader-mid-wrap,
        .loader-dials,
        .loader_percentt,
        .loader-details-wrap,
        .loader_text {
          visibility: hidden;
          opacity: 0;
        }

        .loader_wrap .loader_percentt {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .loader_wrap .loader-percent-wrap {
          position: absolute;
          inset: auto 0 0 0;
          z-index: 3;
          width: 100%;
          min-height: 32svh;
          color: var(--swatch--white);
        }

        .loader_wrap .loader-percent-contain {
          color: var(--swatch--white);
          position: relative;
          z-index: 4;
        }

        .loader_wrap .loader-percent {
          color: currentColor;
          line-height: 0.85;
          opacity: 1;
          visibility: visible;
        }

        .loader_wrap .loader-percent-icon {
          color: var(--swatch--dark);
        }
      `}</style>

      <div className="loader-mid-wrap">
        <div className="loader-midline"></div>
      </div>

      <p {...loaderBlinkAttr} className="loader_text">
        [<span className="text-span">status</span>:active]
      </p>

      <div className="loader-dials">
        <div className="loader-dial loader-dial-y"></div>
        <div className="loader-dial loader-dial-white"></div>
        <div className="loader-dial loader-dial-white"></div>
        <div className="loader-dial loader-dial-white"></div>
        <div className="loader-dial loader-dial-gray"></div>
        <div className="loader-dial loader-dial-gray"></div>
        <div className="loader-dial loader-dial-gray"></div>
        <div className="loader-dial"></div>
        <div className="loader-dial"></div>
        <div className="loader-dial"></div>
        <div className="loader-dial loader-dial-white"></div>
      </div>

      <div className="loader_percentt">
        <div {...loaderAttr('loader-div')} className="loader-percent-wrap">
          <div className="loader-percent-contain">
            <h1 {...loaderBlinkAttr} {...loaderAttr('loader-percent')} className="loader-percent">
              0
            </h1>
            <h1 {...loaderBlinkAttr} className="loader-percent loader-percent-icon">
              %
            </h1>
          </div>
        </div>
      </div>

      <div className="loader-details-wrap">
        <div className="loader-details-top">
          <div className="loader-details-blocks">
            <div data-pulse="" className="loader-block"></div>
            <div className="loader-block loader-block-stroke"></div>
          </div>

          <p {...loaderTextAttr} className="u-mono">
            ©CWM - FW25
          </p>

          <div className="loader-details-text">
            <p {...loaderTextAttr} className="loader-idk u-mono">
              prjct by
            </p>
            <div className="div-block-7">
              <p {...loaderTextAttr} className="u-mono">
                huy + ivor
              </p>
              <p {...loaderTextAttr} className="u-mono">
                [l] vn.us
              </p>
            </div>
          </div>

          <div className="loader-details-text">
            <p {...loaderTextAttr} className="loader-idk u-mono">
              // site.loading
            </p>
            <div className="div-block-7">
              <p {...loaderTextAttr} className="u-mono">
                [f] Scripts() {'{'}
              </p>
              <p {...loaderTextAttr} className="u-mono loader-text-offset">
                initlenis();
              </p>
              <p {...loaderTextAttr} className="u-mono loader-text-offset">
                initnav();
              </p>
              <p {...loaderTextAttr} className="u-mono loader-text-offset">
                initloader();
              </p>
              <p {...loaderTextAttr} className="u-mono">
                {'}'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader
