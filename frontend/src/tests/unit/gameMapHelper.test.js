import { getNodePosition } from '../../components/student/GameMapPage/gameMapHelper'

describe('Calculate node position on the map tests:', () => {
  const exampleIncorrectPositions = [undefined, { x: 0, y: null }, { x: null, y: 0 }]

  it.each(exampleIncorrectPositions)('should return "zero" position for missing data: %s', (position) => {
    // given
    const examplePosition = { x: 1, y: 1 }

    // when
    const position1 = getNodePosition(position, examplePosition)
    const position2 = getNodePosition(examplePosition, position)

    // then
    expect(position1).toEqual({ x: 0, y: 0 })
    expect(position2).toEqual({ x: 0, y: 0 })
  })
  it('should execute correct node position on the map for float values', () => {
    // given
    const exampleMapSize = { x: 1123, y: 437 }
    const exampleChapterPosition = { x: 7, y: 8 }

    // when
    const position = getNodePosition(exampleChapterPosition, exampleMapSize)

    // then
    expect(position).toEqual({ x: 716.95, y: 390.94 })
  })
  it('should execute correct node position on the map for integer values', () => {
    // given
    const exampleMapSize = { x: 1000, y: 500 }
    const exampleChapterPosition = { x: 7, y: 8 }

    // when
    const position = getNodePosition(exampleChapterPosition, exampleMapSize)

    // then
    expect(position).toEqual({ x: 637, y: 450 })
  })
})
