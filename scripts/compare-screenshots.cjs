const { chromium } = require('@playwright/test')

const pages = [
  ['original', 'http://127.0.0.1:5678/'],
  ['react', 'http://127.0.0.1:5173/'],
]

const anchors = ['about', 'design-dev', 'grids-layouts', 'typography', 'colors', 'motion', 'resources']

async function main() {
  const browser = await chromium.launch()

  for (const [name, url] of pages) {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 930 },
      deviceScaleFactor: 1,
    })

    page.on('console', (message) => {
      console.log(name, 'console', message.type(), message.text().slice(0, 200))
    })

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(2500)
    await page.addStyleTag({
      content: `
        .loader_wrap,
        .loader {
          display: none !important;
          pointer-events: none !important;
        }
      `,
    })
    await page.screenshot({ path: `diagnostics/${name}-home.png`, fullPage: false })

    for (const anchor of anchors) {
      await page.evaluate((id) => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ block: 'start' })
        }
      }, anchor)
      await page.waitForTimeout(700)
      await page.screenshot({ path: `diagnostics/${name}-${anchor}.png`, fullPage: false })
    }

    await page.close()
  }

  await browser.close()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
