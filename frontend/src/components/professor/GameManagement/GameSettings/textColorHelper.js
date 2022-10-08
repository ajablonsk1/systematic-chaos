import chroma from 'chroma-js'

export const getTextColor = (bgColor) => {
  if (!bgColor || !isColor(bgColor)) {
    return 'black'
  }

  const MIN_CONTRAST_RATIO = 7
  const contrastWithBlack = chroma.contrast(bgColor, 'black')

  if (contrastWithBlack >= MIN_CONTRAST_RATIO) {
    return 'black'
  }

  return 'white'
}

export const isColor = (strColor) => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}
