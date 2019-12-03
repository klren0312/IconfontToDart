const fs = require('fs')
const path = require('path')

function getDartCode (fontFamily, ttfPath = './iconfont.json') {
  const fontJson = JSON.parse(fs.readFileSync(path.resolve(ttfPath), 'utf8'))

  const FontFamily = fontFamily ? fontFamily : fontJson.font_family
  let fontCode = ''
  fontJson.glyphs.forEach(v => {
    fontCode += `
      static const IconData ${v.font_class} = const IconData(
        0x${v.unicode},
        fontFamily: '${FontFamily}',
        matchTextDirection: true
      );
    `
  })
  return `
    class MyIcons {
      ${fontCode}
    }
  `
}

fs.writeFileSync('./MyIcon.dart', getDartCode('myIcon'))
