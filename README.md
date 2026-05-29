# Creative Web Manual

React/Vite rebuild of the original Webflow site. The UI uses the original CSS split into readable chunks, plus GSAP/Lenis for the motion system.

## Run Project

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

## Style Files

All site CSS is loaded from `src/index.css`.

```css
@import "lenis/dist/lenis.css";
@import "./styles/original-site/chunks/01a-normalize-reset.css";
@import "./styles/original-site/chunks/01b-webflow-framework.css";
@import "./styles/original-site/chunks/01c-fonts.css";
@import "./styles/original-site/chunks/01d-tokens-global-components.css";
@import "./styles/original-site/chunks/01e-themes-text-richtext.css";
@import "./styles/original-site/chunks/01f-layout-utilities.css";
@import "./styles/original-site/chunks/01g-styleguide-helpers.css";
@import "./styles/original-site/chunks/01h-shared-site-ui.css";
@import "./styles/original-site/chunks/02-layout-footer-navbar.css";
@import "./styles/original-site/chunks/03-preloader.css";
@import "./styles/original-site/chunks/04-about.css";
@import "./styles/original-site/chunks/05-design-dev.css";
@import "./styles/original-site/chunks/06-grids-layouts.css";
@import "./styles/original-site/chunks/07-typography.css";
@import "./styles/original-site/chunks/08-colors.css";
@import "./styles/original-site/chunks/09-motion.css";
@import "./styles/original-site/chunks/10-practice.css";
@import "./styles/original-site/chunks/11-resources.css";
@import "./styles/animations/custom-animation-styles.css";
@import "./styles/react-compat.css";
```

## Animation Files

| File | Purpose |
| --- | --- |
| `src/hooks/useLenis.js` | Smooth scrolling setup. |
| `src/animations/loaderAnimation.js` | Preloader counter, text flicker, logo flicker, barcode reveal, hero intro. |
| `src/animations/menuAnimation.js` | Navbar open/close height fade, nav scramble text, page dim. |
| `src/animations/layoutAnimations.js` | Global heading reveal and section-end pin/shrink/fade. |
| `src/animations/aboutAnimations.js` | About section visual and text scroll motion. |
| `src/animations/gridSectionAnimations.js` | Grids & Layouts section animation. |
| `src/animations/typographyAnimations.js` | Typography section split/text motion. |
| `src/animations/colorAnimations.js` | Colors section scroll animation. |
| `src/animations/motionAnimations.js` | Motion section marquee, globe, and button demos. |
| `src/animations/practiceAnimations.js` | Practice section layered SVG/text motion. |
| `src/animations/resourcesAnimations.js` | Resources section list reveal and hover media. |
| `src/animations/gridHoverAnimation.js` | Footer grid hover and coordinate tracking. |
| `src/animations/hoverAnimations.js` | Shared button/link hover animations. |

Animations are initialized in `src/App.jsx`:

```jsx
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
```

## Animation Details

### 1. Smooth Scroll

Lenis runs globally so GSAP ScrollTrigger animations feel closer to the original Webflow site.

```js
import Lenis from 'lenis'

const lenis = new Lenis({
  autoRaf: true,
  lerp: 0.08,
})
```

### 2. Preloader

File: `src/animations/loaderAnimation.js`

Main behavior:

- Shows `.loader_wrap`.
- Reveals loader text and loader dials.
- Animates the counter from `0` to `100`.
- Flickers loader characters with `SplitText`.
- After loading, hides the preloader.
- Starts the footer/hero logo flicker, bracket blink, barcode slide, and mono text scramble.

Important JSX hooks:

```jsx
<div className="loader_wrap u-width-full">
  <p loader-blink="" className="loader_text">
    [<span className="text-span">status</span>:active]
  </p>

  <h1 loader-blink="" loader-percent="" className="loader-percent">
    0
  </h1>
</div>
```

Counter logic:

```js
const percentValue = { value: 0 }

const updatePercent = () => {
  if (percent) {
    percent.textContent = Math.round(percentValue.value)
  }
}

timeline.to(percentValue, {
  value: 100,
  duration: 2.4,
  ease: 'ease-preloader',
  onUpdate: updatePercent,
})
```

Preloader CSS layer:

```css
.loader_wrap.u-width-full {
  z-index: 1000;
  padding: var(--site--margin);
  background-color: var(--swatch--black);
  height: 100svh;
  position: fixed;
}
```

### 3. Global Heading Reveal

File: `src/animations/layoutAnimations.js`

Any heading with `data-split="heading"` reveals word by word when it scrolls into view.

```jsx
<h2 data-split="heading" className="u-text-style-h2">
  The creative process of crafting stand-out websites
</h2>
```

JS:

```js
SplitText.create(heading, {
  type: 'words',
  autoSplit: true,
  mask: 'words',
  wordsClass: 'words-split',
  onSplit: (split) =>
    gsap.from(split.words, {
      duration: 0.9,
      yPercent: 101,
      stagger: 0.02,
      ease: 'ease-transition',
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%',
        once: true,
      },
    }),
})
```

CSS helper:

```css
.word-wrapper .word {
  display: inline-block;
  will-change: transform, opacity;
}

[data-split="heading"] {
  overflow-wrap: anywhere;
}
```

### 4. Section-End Pin/Shrink/Fade

File: `src/animations/layoutAnimations.js`

Sections with `data-section-end` pin near the end, shrink, fade, and scatter the title letters.

```jsx
<section data-section-end="">
  <h2 data-split="sectionEnd">Design + Dev</h2>
</section>
```

JS:

```js
ScrollTrigger.create({
  trigger: section,
  pin: true,
  start: 'bottom bottom',
  end: '+=100%',
  scrub: true,
  animation: gsap.to(section, {
    scale: 0.85,
    opacity: 0.1,
    ease: 'none',
  }),
})
```

Letter fade:

```js
gsap.to(split.chars, {
  opacity: 0,
  stagger: {
    amount: 0.8,
    from: 'random',
  },
  ease: 'steps(5)',
  scrollTrigger: {
    trigger: section,
    start: 'bottom bottom',
    end: '+=150%',
    scrub: true,
  },
})
```

### 5. Navbar Menu Animation

File: `src/animations/menuAnimation.js`

Main behavior:

- Opens `.nav_menu` from height `0` to `auto`.
- Fades menu opacity.
- Scrambles nav text into readable labels.
- Dims `.page_main`.
- Uses `body[data-navigation-status]` for open/closed state.

JS:

```js
gsap
  .timeline()
  .set(menu, {
    display: 'flex',
    overflow: 'hidden',
  })
  .fromTo(
    menu,
    {
      opacity: 0,
      height: 0,
    },
    {
      opacity: 1,
      height: 'auto',
      delay: 0.3,
      duration: 0.8,
      ease: 'ease-secondary',
      clearProps: 'height,overflow',
    },
  )
  .to(
    targets,
    {
      stagger: 0.1,
      duration: 0.8,
      scrambleText: {
        tweenLength: true,
        text: '{original}',
        chars: '-_x0$9',
      },
    },
    0,
  )
```

CSS:

```css
body[data-navigation-status="is-open"] .nav_menu {
  display: flex !important;
}

body[data-navigation-status="is-closed"] .nav_menu {
  display: none !important;
}

body[data-navigation-status="is-open"] .page_main {
  filter: brightness(.42);
}
```

### 6. Footer Grid And Coordinates

File: `src/animations/gridHoverAnimation.js`

Main behavior:

- Footer grid reacts on mouse hover.
- `[X]` and `[Y]` coordinate labels update from cursor position.

Markup hooks:

```jsx
<p className="coordinates__p">[X].<span data-coordinate-x="">000</span>PX</p>
<p className="coordinates__p">[Y].<span data-coordinate-y="">000</span>PX</p>
```

CSS helper:

```css
[data-barcode-line] {
  transform-origin: bottom;
  will-change: transform, opacity;
}
```

### 7. Hover Animations

File: `src/animations/hoverAnimations.js`

Used for buttons, links, and visual hover previews.

CSS:

```css
div[data-button]:hover {
  border-radius: 50px !important;
  background-color: #EAEAEA !important;
  color: #070707 !important;
}

.button_main_wrap {
  transition: all 0.6s cubic-bezier(0.87, 0, 0.13, 1);
}

div .button_main_wrap:hover {
  border-radius: 40px;
}
```

Menu link hover:

```css
a.menu_heading_link {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

a.menu_heading_link:hover {
  background-color: #EAEAEA !important;
  color: #070707 !important;
  padding-left: .333em;
  padding-right: .333em;
}
```

### 8. Resources Reveal

File: `src/animations/resourcesAnimations.js`

Resources list items reveal on scroll and show visual media on hover.

CSS:

```css
[data-video-on-hover="active"] .g_visual_video,
.resources_link:hover .g_visual_video {
  opacity: 1;
}
```

## Adding A New Animation

1. Add a data attribute or class to the JSX component.
2. Create or update the matching file in `src/animations`.
3. Register any needed GSAP plugins inside that animation file.
4. Return a cleanup function from the animation initializer.
5. Import and call the initializer in `src/App.jsx`.
6. Put small helper CSS in `src/styles/animations/custom-animation-styles.css`.

Example:

```js
export const initExampleAnimation = (scope) => {
  const context = gsap.context(() => {
    gsap.from('[data-example]', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: '[data-example]',
        start: 'top 80%',
      },
    })
  }, scope)

  return () => context.revert()
}
```

```css
[data-example] {
  will-change: transform, opacity;
}
```

## Notes

- Do not use Tailwind in this project right now.
- Keep UI styling in `src/styles`.
- Keep animation JS in `src/animations`.
- Use `data-*` attributes for animation hooks when possible.
- Keep the preloader above the navbar with `.loader_wrap { z-index: 1000; }`.
# creative_web
