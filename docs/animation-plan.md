# Creative Web Animation Plan

This plan is based on the original Webflow/Slater animation files:

- `site/assets/slater/load-custom-animations.js`
- `site/assets/slater/custom-animations/core-interactions-and-page-animations.js`
- `site/assets/slater/custom-animations/section-practice-colors-layout-type.js`
- `site/assets/slater/custom-animations/custom-animation-styles.css`

The original site loads GSAP, ScrollTrigger, SplitText, CustomEase, MotionPathPlugin, ScrambleTextPlugin, Flip, Draggable, DrawSVGPlugin, and Lenis. The React project already has `gsap` and `lenis` installed, and the GSAP package includes the needed plugin files.

## Current React Status

- UI is being built first, without JS animations.
- Animation modules in `src/animations` currently exist but are empty.
- `src/index.css` now contains the needed original Webflow and animation CSS directly; `src/styles` was removed.
- Most original animation hooks are already present in JSX: `data-split`, `data-section-end`, `data-btn-layout`, `data-video-on-hover`, `data-stack-list`, `data-stack-item`, `data-animate`, `data-sticker`, `data-marquee`, `data-button`, `data-ease`, `data-draw`, `data-anim`, `data-grid`, `data-coordinates`.
- Missing before full animation: `PracticeSection`, mounted `Loader`, and exact handling for the original `[star]` selector because React currently uses `data-star`.

## Start Here

1. Finish all remaining UI first.
   - Add `PracticeSection` between `MotionSection` and `ResourcesSection`.
   - Mount `Loader` if we want the original opening preloader.
   - Confirm Footer/hero markup has all `heroMono`, `barcodeLine`, `bracket`, `hero-logo-path`, `data-grid`, and coordinate hooks.

2. Create GSAP setup.
   - Add `src/animations/gsapSetup.js`.
   - Import and register:
     - `gsap`
     - `ScrollTrigger`
     - `SplitText`
     - `CustomEase`
     - `MotionPathPlugin`
     - `ScrambleTextPlugin`
     - `Flip`
     - `Draggable`
     - `DrawSVGPlugin`
   - Create original eases:
     - `ease-primary`: `0.87, 0, 0.13, 1`
     - `ease-secondary`: `0.31,0.75,0.22,1`
     - `ease-fade`: `0.76, 0, 0.24, 1`
     - `ease-preloader`: `.64,.04,.42,.99`
     - `ease-transition`: `0.16, 1, 0.35, 1`

3. Use React-safe animation hooks.
   - Put one animation initializer per file in `src/animations`.
   - Run each initializer from the matching component with `useLayoutEffect` or `useGSAP`.
   - Use `gsap.context()` and return cleanup with `context.revert()`.
   - Do not attach raw listeners without removing them on cleanup.
   - Avoid jQuery; replace `$(node).text(value)` with `node.textContent = value`.

4. Confirm animation CSS.
   - Animation-only helper styles are already consolidated into `src/index.css`.
   - Keep any new animation CSS in `src/index.css` unless the project reintroduces a dedicated style folder.

## Global Animations

### Lenis Smooth Scroll

Source: `initLenis()`

React file: `src/hooks/useLenis.js` or `src/animations/scrollAnimations.js`

Behavior:
- Creates Lenis with `duration: 0.7`.
- Original uses `infinite: true`; decide if we still want infinite scroll in React.
- Calls `ScrollTrigger.update` on Lenis scroll.
- Drives Lenis through `gsap.ticker`.

Implementation notes:
- Start this after all section heights are stable.
- Destroy Lenis and remove ticker callback on cleanup.
- Refresh ScrollTrigger after images and fonts are loaded.

### Basic Page Functions

Source: `initBasicFunctions()`

React file: `src/animations/layoutAnimations.js`

Behavior:
- Video-on-hover: finds `[data-video-on-hover]`, sets video `src` from `data-video-src`, plays on hover, pauses/resets on leave.
- Sticky stacks: finds `[data-stack-list]` and positions each `[data-stack-item]` as sticky with increasing `top` values.

Used by:
- `TypographySection`
- `ColorsSection`

### Global Heading Reveals

Source: `initHeadings()` and `initGlobalSplit()`

React file: `src/animations/layoutAnimations.js`

Behavior:
- `[data-split="heading"]`: SplitText by words, mask words, animate words from `yPercent: 101` on first scroll into view.
- `[data-split="global"]`: SplitText by lines, animate lines from `yPercent: 100`.

Used by:
- About copy
- Grids final heading
- Colors heading
- Motion headings
- Resources heading

### Section End Pin/Shrink

Source: `initSectionEnd()`

React file: `src/animations/layoutAnimations.js`

Behavior:
- Targets all `[data-section-end]`.
- Pins section when its bottom reaches viewport bottom.
- Scales to `.85` and fades to `.1` while scrolling.
- Splits `[data-split="sectionEnd"]` into chars and randomly fades chars.

Used by:
- `DesignDevSection`
- `ColorsSection`

### Grid Hover Canvas

Source: `initGridHover()`

React file: `src/animations/gridHoverAnimation.js`

Behavior:
- For each `[data-grid]`, appends a canvas.
- Draws a small grid.
- On mouse move, tiles light up and fade back out.

Used by:
- Footer/bottom hero grid.

Implementation notes:
- Cleanup must remove the appended canvas and resize/mouse listeners.

### Cursor Coordinates

Source: `initCursorCoordinates()`

React file: `src/animations/layoutAnimations.js` or `src/components/ui/CursorCoordinates.jsx`

Behavior:
- Updates `[data-coordinates-x]` and `[data-coordinates-y]` with mouse page coordinates.

Used by:
- Footer/bottom hero.

## Loader Animation

Source: `initLoader()`

React files:
- `src/components/ui/Loader.jsx`
- `src/animations/loaderAnimation.js`

Needed UI:
- `.loader_wrap`
- `.loader-mid-wrap`
- `.loader-dials`
- `.loader_percentt`
- `.loader-details-wrap`
- `.loader_text`
- `[loader-blink]`
- `[loader-percent]`
- `[loader-div]`
- `[loader-text]`
- `.loader-dial`

Behavior:
- Starts hidden parts with `autoAlpha: 0`.
- Splits loader blinking text into chars.
- Animates loader percentage from `0` to `100`.
- Scrambles loader detail text in/out.
- Slides/fills loader percent block differently on mobile and desktop.
- Flickers hero logo paths and brackets.
- Scrambles footer/hero mono text and reveals barcode lines.
- Hides the loader at the end.

Implementation notes:
- Original uses jQuery for percentage text; replace with DOM `textContent`.
- Run only once on initial page load.
- Add a reduced-motion bypass later if needed.

## Navbar/Menu Animation

Source: `animateMenuOpen()`

React files:
- `src/components/layout/Navbar.jsx`
- `src/animations/menuAnimation.js`

Behavior:
- Opens `.nav_menu` from height `0` and opacity `0`.
- Scrambles `[data-nav-text]` into original text.
- Dims `.page_main` opacity to `.6`.
- Reverses timeline on close.

Implementation notes:
- Current Navbar already uses React state for open/close. Prefer a state-driven GSAP timeline instead of original raw `[navbtn]` click listeners.
- Remove or avoid inline `display` conflicts once GSAP controls `display`.
- Keep body `data-navigation-status` for CSS.

## About Section

Source: `initAboutSection()`

React file:
- `src/animations/aboutAnimations.js`

Component:
- `src/components/sections/AboutSection.jsx`

Behavior:
- Pins `.about_card_sticky`.
- Splits `[data-about-heading]` into chars and reveals chars from `yPercent: -100`.
- Scrambles `[data-about-tech]` from `</ >` to `</TECHNICALITY>`.
- Expands `.about_p1_contain` to full width/height during scroll.
- Rotates `.card-plus` 180 degrees during scroll.
- Pins `.about_p2_sticky`.
- Splits `.about_p2_text` into words, wraps each word, adds `.overlay-block`, fades overlays out on scroll.
- Staggers SVG paths inside `[path-group]`.
- Reveals `.pixel_item` grid with randomized stagger in `.pixel_transition`.

Missing/check:
- Confirm `card-plus` is present in React About SVG.
- Confirm large `[path-group]` SVG exists in `AboutSection`.

## Design + Dev Section

Source:
- `initSectionEnd()`
- `initHeadings()` where relevant

React file:
- `src/animations/layoutAnimations.js`

Component:
- `src/components/sections/DesignDevSection.jsx`

Behavior:
- Section pins and shrinks/fades after bottom reaches viewport bottom.
- `Design & Development` and `02` split into chars and randomly fade.

## Grids & Layouts Section

Sources:
- `initLayoutsSection()`
- `initGridSection()`
- `initGlobalParallax()`
- `initHeadings()`

React files:
- `src/animations/gridHoverAnimation.js`
- `src/animations/layoutAnimations.js`

Component:
- `src/components/sections/GridsLayoutsSection.jsx`

Behavior:
- Layout buttons `[data-btn-layout]` change `.grids_flip_content` classes:
  - `is-layout1`
  - `is-layout2`
  - `is-layout3`
- GSAP Flip animates children to new layout positions.
- `.grids_flip_h1 path` enters from `yPercent: 102`.
- `.button_main_wrap` controls enter with a border flicker.
- `.grids_guide_item` flickers into view when scrolled in.
- Elements with `[data-parallax="trigger"]` move vertically/horizontally during scroll.

Implementation notes:
- Need cleanup for button click listeners.
- Recalculate Flip after fonts/images load.

## Typography Section

Source: `initTypeSection()`

React file:
- `src/animations/typographyAnimations.js`

Component:
- `src/components/sections/TypographySection.jsx`

Behavior:
- Desktop only, `min-width: 992px`.
- Splits `[data-animate="font-weight"]` into chars.
- Mouse proximity changes each char font weight from `300` to `800`.
- Draggable stickers:
  - `[data-sticker="item"]` constrained inside `[data-sticker="wrap"]`.
  - On press, scale to `1.2`, random rotation, shadow.
  - On release, return to scale `1`, rotation `0`.
- Also uses global sticky stack and video hover.

Implementation notes:
- Cleanup Draggable instances on unmount.
- Refresh after SplitText reverts.

## Colors Section

Source: `initColorsSection()`

React file:
- `src/animations/colorAnimations.js`

Component:
- `src/components/sections/ColorsSection.jsx`

Behavior:
- Animates six `.colors_visual_gradient` layers with scroll-based `clipPath`.
- Uses sticky stack and video hover from global basic functions.
- Uses global heading reveal.
- Uses section-end pin/shrink because section has `data-section-end`.

Implementation notes:
- Keep clip-path values exactly from original.
- Confirm all six gradient divs exist.

## Motion Section

Source: `initAnimationSection()`

React file:
- `src/animations/motionAnimations.js`

Component:
- `src/components/sections/MotionSection.jsx`

Behavior:
- Accelerating globe:
  - Targets `[data-accelerating-globe]`.
  - Animates eight `[data-accelerating-globe-circle]` widths in a looping timeline.
  - Speeds timeline up based on scroll velocity, then eases back to normal speed.
- Number counter:
  - Targets `[data-anim="number"]`.
  - Animates value between `0` and `50`, repeat/yoyo.
  - Original trigger selector is `.animation_types-wrap`; React class is likely `.animations_types_wrap`, so use the React class.
- Star rotation:
  - Original selector is `[star]`.
  - React has `data-star`; use `[data-star]` or restore a compatible custom attribute.
  - Rotates in 3D forever.
- Marquee:
  - Targets `[data-marquee-scroll-direction-target]`.
  - Duplicates collections based on `data-marquee-duplicate`.
  - Loops horizontally and flips direction based on scroll direction.
  - Adds slight scroll scrub movement.
- Micro interactions:
  - Button 1 splits `[split-hover-text]` chars and moves them up on hover.
  - `data-draw="1"` follows `data-ease="1"` path with MotionPathPlugin.
  - Button 2 moves `data-draw="2"` along `data-ease="2"`.
- Organic columns:
  - `.animations_organic_bg_column` yoyo wave with stagger from center.

Implementation notes:
- Replace original `[star]` selector.
- Use pointer/mouse listeners with cleanup.
- Original uses `$(n).text(e)`; replace with `n.textContent = e`.

## Practice Section

Source: `initPracticeSection()`

React files:
- `src/components/sections/PracticeSection.jsx`
- `src/animations/motionAnimations.js` or `src/animations/layoutAnimations.js`

Location:
- Mount after `MotionSection` and before `ResourcesSection`.

Behavior:
- Targets `.practice_contain_inner.u-position-absolute`.
- On scroll through `.practice_contain_content`, each absolute SVG layer scales down using powers of `.85`.
- Uses `.practice_contain_focus` crosshair lines.

Implementation notes:
- This UI is not yet built in React.
- The SVG paths are large; prefer extracting repeated SVG into a local component to avoid duplication.

## Resources Section

Source:
- `initHeadings()`
- CSS hover from original embedded style

React file:
- `src/animations/layoutAnimations.js` for heading only

Component:
- `src/components/sections/ResourcesSection.jsx`

Behavior:
- Heading word reveal through `[data-split="heading"]`.
- Link hover handled by CSS.

## Footer / Bottom Hero

Sources:
- `initLoader()`
- `initGridHover()`
- `initCursorCoordinates()`

React files:
- `src/animations/loaderAnimation.js`
- `src/animations/gridHoverAnimation.js`
- `src/animations/layoutAnimations.js`

Component:
- `src/components/layout/Footer.jsx`

Behavior:
- Hero logo paths flicker during loader.
- Brackets flicker during loader.
- Barcode lines reveal during loader.
- Mono hero text scrambles during loader.
- Cursor coordinates update on mouse move.
- Background grid canvas lights up on hover.

Implementation notes:
- Confirm attribute casing: React lowercases unknown attributes like `heromono`; original selector is `[heroMono]`. Prefer changing animation selector to include `[heroMono], [heromono]`, or normalize JSX to `data-hero-mono`.

## Recommended Implementation Order

1. Add missing UI: `PracticeSection` and `Loader`.
2. Add `gsapSetup.js` and import animation CSS.
3. Add Lenis and ScrollTrigger refresh plumbing.
4. Add global utilities: headings, global split, sticky stack, video hover, cursor coordinates.
5. Add navbar animation in a React state-driven way.
6. Add loader animation.
7. Add About section animation.
8. Add Design + Dev section-end animation.
9. Add Grids & Layouts animations: Flip layout, guide flicker, parallax.
10. Add Typography animations: font-weight proximity and draggable stickers.
11. Add Colors animations: gradient clip-path and stack/video behavior.
12. Add Motion animations: globe, marquee, number, stars, micro interactions, organic columns.
13. Add Practice scroll scaling.
14. Run full cleanup pass:
    - Kill ScrollTriggers on unmount.
    - Revert SplitText.
    - Kill Draggable instances.
    - Remove event listeners and appended canvases.
    - Test React StrictMode for duplicate timelines.
15. Verify:
    - `npm run build`
    - desktop and mobile page load
    - menu open/close
    - scrolling through every section
    - hover video, buttons, grids
    - no console errors
    - no duplicate canvases after navigation/re-render
