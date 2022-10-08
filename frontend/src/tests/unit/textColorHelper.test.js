import { getTextColor, isColor } from '../../components/professor/GameManagement/GameSettings/textColorHelper'

describe('Text color getter tests:', () => {
  const lightColors = ['#BDB8FF', '#FFAE00', '#CFCFCE', '#E1B3B3', 'white']
  const darkColors = ['#4E2525', '#041888', '#046630', '#C60000', 'black']
  // Fun fact: a color like #1235 is a valid color because the fourth value is transparency
  const incorrectColors = ['test', '#asfff', '#11111', 'E1B3B3']

  it('should return "black" color as a default value when background color is missing', () => {
    // given
    const exampleBgColor = ''

    // when
    const textColor = getTextColor(exampleBgColor)

    // then
    expect(textColor).toBe('black')
  })
  it.each(lightColors)('should return "black" color for light background color: %s', (color) => {
    // when
    const textColor = getTextColor(color)

    // then
    expect(textColor).toBe('black')
  })
  it.each(darkColors)('should return "white" color for dark background color: %s', (color) => {
    // when
    const textColor = getTextColor(color)

    // then
    expect(textColor).toBe('white')
  })
  it.each(incorrectColors)('should return "black" color for incorrect colors string: %s', (color) => {
    // when
    const textColor = getTextColor(color)

    // then
    expect(textColor).toBe('black')
  })
})

describe('Function tests checking if string is a color:', () => {
  const correctColors = ['#BDB8FF', '#111', '#1234', 'rgb(11, 142, 12)', 'rgba(45, 11, 89, 0.4)']
  const incorrectColors = ['', '#', '#aaabbbz', 'rgb(12, 41, s)', 'rgb(12, 41)']

  it.each(correctColors)('should return true if string is a color: %s', (color) => {
    // when
    const stringIsColor = isColor(color)

    // then
    expect(stringIsColor).toBeTruthy()
  })
  it.each(incorrectColors)('should return false if string is not a color: %s', (color) => {
    // when
    const stringIsColor = isColor(color)

    // then
    expect(stringIsColor).toBeFalsy()
  })
})
