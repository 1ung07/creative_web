import React from 'react'

const path = (props) => React.createElement('path', props)
const rect = (props) => React.createElement('rect', props)

export const AboutPlusSvg = ({ className = 'svg' }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: '0 0 95 95',
      fill: 'none',
      className,
    },
    rect({
      width: '94.7523',
      height: '94.7523',
      rx: '47.3762',
      fill: 'currentColor',
      className: 'rect',
    }),
    path({
      d: 'M45.6076 48.9678H22.8529V45.6666H45.6076L45.4897 21.8508H49.2625L49.1446 45.6666H71.8993V48.9678H49.1446L49.2625 72.9015H45.4897L45.6076 48.9678Z',
      fill: 'currentColor',
      className: 'card-plus',
    }),
  )

export const GridDownArrowSvg = ({ className = 'svg-2' }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: '0 0 217 214',
      fill: 'none',
      className,
    },
    path({
      d: 'M74 119.224L76.688 116.536L106.512 143.928V62.7759H110.608V143.928L140.432 116.536L143.12 119.224L108.56 151.224L74 119.224Z',
      fill: 'currentColor',
    }),
  )

export const GridPlusSvg = ({ className = 'svg-8' }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: '0 0 54 56',
      fill: 'none',
      className,
    },
    path({
      d: 'M24.704 29.44H0V25.856H24.704L24.576 0H28.672L28.544 25.856H53.248V29.44H28.544L28.672 55.424H24.576L24.704 29.44Z',
      fill: 'currentColor',
    }),
  )

export const BracketSvg = ({ className }) => {
  const rectsByClass = {
    'bracket-br': [
      { width: '14', height: '1', transform: 'matrix(0 -1 -1 0 14 14)', fill: 'currentColor' },
      { width: '14', height: '1', transform: 'matrix(1 0 0 -1 0 14)', fill: 'currentColor' },
    ],
    'bracket_-bl': [
      { width: '14', height: '1', transform: 'matrix(1 0 0 -1 0 14)', fill: 'currentColor' },
      { width: '14', height: '1', transform: 'matrix(0 1 1 0 0 0)', fill: 'currentColor' },
    ],
    'bracket-tr': [
      { width: '14', height: '1', transform: 'matrix(0 1 -1 0 14 0)', fill: 'currentColor' },
      { width: '14', height: '1', fill: 'currentColor' },
    ],
    'bracket-tl': [
      { width: '14', height: '1', fill: 'currentColor' },
      { width: '14', height: '1', transform: 'matrix(0 -1 1 0 0 14)', fill: 'currentColor' },
    ],
  }

  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: '0 0 14 14',
      fill: 'none',
      bracket: '',
      className,
    },
    ...(rectsByClass[className] || []).map((props, index) => rect({ ...props, key: index })),
  )
}

export const GridFlipArrowSvg = ({ className = 'grids_flip_arrowbtn' }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: '0 0 26 26',
      fill: 'none',
      className,
    },
    rect({ width: '26', height: '26', fill: 'currentColor' }),
    path({
      d: 'M13.4 18.08L16.84 14.42H5.94V12.8H16.84L13.4 9.14L14.58 8.04L19.76 13.62L14.58 19.2L13.4 18.08Z',
      fill: 'currentColor',
      className: 'path-5',
    }),
  )

export const MotionDotSvg = ({ className = 'svg-6' }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: '0 0 90 91',
      fill: 'none',
      className,
    },
    rect({ y: '0.5', width: '90', height: '90', rx: '45', fill: 'currentColor' }),
  )

export const MotionArrowSvg = ({ hover = false }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: '0 0 145 145',
      fill: 'none',
      className: `anims_bento_arrow ${hover ? 'anims_arrow_hover' : ''}`.trim(),
    },
    React.createElement(
      'g',
      { clipPath: 'url(#clip0_389_2286)' },
      path({
        d: 'M72.1283 144.843L62.5908 135.387L118.846 79.2122H7.08839L6.99255 72.3134L7.08775 65.6327L118.846 65.6334L62.5908 9.45901L72.1283 0.00233188L144.549 72.4228L72.1283 144.843Z',
        fill: 'currentColor',
      }),
    ),
    React.createElement(
      'defs',
      null,
      React.createElement(
        'clipPath',
        { id: 'clip0_389_2286' },
        rect({
          width: '102',
          height: '102',
          fill: 'currentColor',
          transform: 'translate(72.125) rotate(45)',
        }),
      ),
    ),
  )

export const MotionStarSvg = ({ className = 'anims_bento_star' }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: '0 0 160 148',
      fill: 'none',
      'data-star': '',
      className,
    },
    path({
      d: 'M61.5719 33.4367C62.4035 29.11 68.5965 29.11 69.4281 33.4367L77.1606 73.6663C77.4695 75.2736 78.7264 76.5305 80.3337 76.8394L120.563 84.5719C124.89 85.4035 124.89 91.5965 120.563 92.4281L80.3337 100.161C78.7264 100.469 77.4695 101.726 77.1606 103.334L69.4281 143.563C68.5965 147.89 62.4035 147.89 61.5719 143.563L53.8394 103.334C53.5305 101.726 52.2736 100.469 50.6663 100.161L10.4367 92.4281C6.11004 91.5965 6.11003 85.4035 10.4367 84.5719L50.6663 76.8394C52.2736 76.5305 53.5305 75.2736 53.8394 73.6663L61.5719 33.4367Z',
      fill: 'currentColor',
      'data-star': '',
      className: 'path-6',
    }),
    path({
      d: 'M126.054 4.32752C126.678 1.08253 131.322 1.08253 131.946 4.32751L134.42 17.1999C134.652 18.4054 135.595 19.348 136.8 19.5797L149.672 22.0539C152.917 22.6776 152.917 27.3224 149.672 27.9461L136.8 30.4203C135.595 30.652 134.652 31.5946 134.42 32.8001L131.946 45.6725C131.322 48.9175 126.678 48.9175 126.054 45.6725L123.58 32.8001C123.348 31.5946 122.405 30.652 121.2 30.4203L108.328 27.9461C105.083 27.3224 105.083 22.6776 108.328 22.0539L121.2 19.5797C122.405 19.348 123.348 18.4054 123.58 17.1999L126.054 4.32752Z',
      fill: 'currentColor',
      'data-star': '',
    }),
  )

export const MotionEaseSvg = ({ variant = 1 }) => {
  const first = variant === 1
  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: first ? '0 0 454 455' : '0 0 454 454',
      fill: 'none',
    },
    path({
      d: first
        ? 'M0 454.332C357.5 454.332 101.5 0.332031 454 0.332031'
        : 'M0.324219 453.832C67.8242 125.354 28.3242 -7.3387 453.824 0.672901',
      stroke: 'currentColor',
      strokeWidth: '0.664469',
      'data-ease': String(variant),
    }),
  )
}

export const PracticeWordSvg = ({ className = 'practice_word_svg' }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      viewBox: '0 0 1387 236',
      fill: 'none',
      className,
    },
    React.createElement(
      'text',
      {
        x: '0',
        y: '218',
        fill: 'currentColor',
        fontFamily: 'PP Neue Montreal, Arial, sans-serif',
        fontSize: '296',
        fontWeight: '400',
        letterSpacing: '-12',
      },
      'PRACTICE',
    ),
  )
