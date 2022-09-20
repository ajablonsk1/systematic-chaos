import chroma from 'chroma-js'

export const getTextColor = (bgColor) => {
  const MIN_CONTRAST_RATIO = 7
  const contrastWithBlack = chroma.contrast(bgColor, 'black')

  if (contrastWithBlack >= MIN_CONTRAST_RATIO) {
    return 'black'
  }

  return 'white'
}
