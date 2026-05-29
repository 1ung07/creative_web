import React from 'react'

const resourceGroups = [
  {
    title: 'Books',
    items: [
      { label: 'SANS-in-USE by VIctionary', href: 'https://victionary.com/products/sans-in-use' },
      { label: 'display-in-use by victionary', href: 'https://victionary.com/products/display-in-use' },
      { label: 'Serif-in-use by victionary', href: 'https://victionary.com/products/serif-in-use' },
      { label: 'grid systems in graphic design by Josef Mueller-Brockmann', href: 'https://www.amazon.com.au/dp/3721201450' },
      { label: 'New Utilitarian by VICTIONARY', href: 'https://victionary.com/products/new-utilitarian?variant=44509817176306' },
      { label: 'Thinking with type by ellen lupton', href: 'https://www.amazon.com.au/dp/1797226827' },
      { label: 'The design of everyday things by don norman', href: 'https://www.amazon.com.au/dp/0465050654' },
      { label: "Don't make me think by steve krug", href: 'https://www.amazon.com.au/dp/0321965515' },
    ],
  },
  {
    title: 'Courses and Communities',
    items: [
      { label: "Maxime Heckel's blog (3d blogs)", href: 'https://blog.maximeheckel.com/' },
      { label: 'Three.js Journey', href: 'https://threejs-journey.com/' },
      { label: "oliver larose's youtube", href: 'https://www.youtube.com/@olivierlarose1' },
      { label: "Ilja van ecks's youtube", href: 'https://www.youtube.com/@iljavaneck' },
      { label: 'OSMO', href: 'https://www.osmo.supply/' },
      { label: 'Made with gsap', href: 'https://madewithgsap.com/' },
      { label: '12 Principle of animations', href: 'https://www.youtube.com/watch?v=uDqjIdI4bF4&t=6s' },
    ],
  },
  {
    title: 'Inspiration',
    items: [
      { label: 'INSPO.page', href: 'https://INSPO.page' },
      { label: 'AWWWARDS.com', href: 'https://AWWWARDS.com' },
      { label: 'FOOTER.DESIGN', href: 'https://FOOTER.DESIGN' },
      { label: 'minimal.gallery', href: 'https://minimal.gallery' },
      { label: 'maxibestof', href: 'https://maxibestof.one/' },
      { label: 'muzli.me', href: 'https://muzli.me' },
      { label: 'fontsinuse.com', href: 'https://fontsinuse.com' },
      { label: 'Grids by obys agency', href: 'https://grids.obys.agency/' },
      { label: 'Motion by Zajno', href: 'https://motion.zajno.com/' },
      { label: 'savee.com', href: 'https://savee.com/' },
    ],
  },
]

const ResourcesSection = () => {
  return (
    <section id="resources" className="resources_wrap u-flex-vertical-nowrap">
      <div className="resources_contain_top">
        <div className="resources_eyebrow_contain">
          <div className="eyebrow_wrap u-mb-5">
            <div className="eyebrow_layout">
              <div data-pulse="" className="eyebrow_marker"></div>
              <div className="u-mono w-richtext">
                <p>Put in the reps</p>
              </div>
            </div>
          </div>
        </div>
        <p className="resources_contain_p u-text-style-h4">
          Create passion projects, experiment with animations, and explore new design ideas. The more you build, break, and refine, the sharper your creative instincts get. Make connections, refine your taste, and have fun making websites.
        </p>
      </div>

      <div className="resources_contain_bottom">
        <h3 data-split="heading" className="resources_contain_heading u-text-style-h2">
          <span className="paragraph_indent">We</span> understand the process of a creative website can be overwhelming so here are is a collection of resources for you to learn and use.
        </h3>

        <div className="resources_contain_inner">
          <div className="w-embed">
            <style>{`
              .resources_subitem_link:hover {
                background-color: var(--swatch--white);
              }

              .resources_subitem_link:hover .resources_subitem_text {
                color: var(--swatch--black);
                transform: translateX(10px);
              }

              .resources_subitem_link:hover .resources_subitem_text.is-duplicate {
                transform: translateX(-10px);
              }
            `}</style>
          </div>

          <div className="resources_contain_left">
            <div className="resources_contain_deco">
              <div className="u-mono is-resources">RESOURCES CURATED BY HUY AND IVOR</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 535 714" fill="none">
              <path d="M0 0H286.318C364.133 0 423.325 17.6247 463.895 52.874C504.465 88.1234 524.75 139.002 524.75 205.51C524.75 234.774 519.097 261.71 507.79 286.318C497.149 310.261 481.852 330.546 461.9 347.173C442.612 363.135 420.332 374.109 395.059 380.094V382.09C428.313 388.741 453.586 405.035 470.878 430.973C488.17 456.911 499.477 485.51 504.797 516.769C510.783 547.363 515.106 584.275 517.766 627.505C519.762 654.773 521.757 674.393 523.752 686.365C525.748 698.336 529.405 705.32 534.726 707.315V713.301H437.957C433.966 709.31 431.306 701.662 429.976 690.355C428.645 678.384 427.98 662.089 427.98 641.472C426.65 598.907 423.325 563.325 418.004 534.726C413.349 505.462 401.377 479.857 382.09 457.909C362.802 435.961 333.539 424.988 294.299 424.988H89.7861V713.301H0V0ZM265.368 345.178C301.282 345.178 331.876 339.857 357.149 329.216C382.422 318.574 401.71 302.945 415.011 282.327C428.313 261.71 434.964 236.769 434.964 207.506C434.964 164.94 421.662 133.016 395.059 111.734C369.121 90.4512 326.888 79.8099 268.361 79.8099H89.7861V345.178H265.368Z" fill="currentColor"></path>
            </svg>
          </div>

          <div className="resources_contain_collection w-dyn-list">
            <div role="list" className="resources_contain_list w-dyn-items">
              {resourceGroups.map((group) => (
                <div role="listitem" className="resources_contain_item w-dyn-item" key={group.title}>
                  <div className="resources_contain_header">
                    <div className="resources_contain_circle"></div>
                    <h3 className="resources_contain_subheading u-text-style-large">{group.title}</h3>
                  </div>
                  <div className="resources_subitem_collection w-dyn-list">
                    <div role="list" className="resources_subitem_list w-dyn-items">
                      {group.items.map((item) => (
                        <div role="listitem" className="resources_subitem_item w-dyn-item" key={item.href}>
                          <a href={item.href} className="resources_subitem_link w-inline-block" target="_blank" rel="noreferrer">
                            <div className="resources_subitem_text u-mono">{item.label}</div>
                            <div className="resources_subitem_text is-duplicate">↗</div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourcesSection
