import { getNodePosition } from '../../components/student/GameMapPage/gameMapHelper'

describe('Calculate node position on the map tests:', () => {
  const exampleIncorrectPositions = [
    undefined,
    { x: 0, y: null },
    { x: null, y: 0 },
    { x: 10, y: null },
    { x: null, y: 10 },
    { x: 10.333, y: null },
    { x: null, y: 0.1 }
  ]

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
  it('should execute correct node position for integer "x" and float "y"', () => {
    // given
    const exampleMapSize = { x: 1333.33, y: 500 }
    const exampleChartPosition = { x: 9, y: 3 }

    // when
    const position = getNodePosition(exampleChartPosition, exampleMapSize)

    // then
    expect(position).toEqual({ x: 1116.33, y: 150 })
  })
  it('should execute correct node position for float "x" and integer "y"', () => {
    // given
    const exampleMapSize = { x: 800, y: 321.73 }
    const exampleChapterPosition = { x: 9, y: 2 }

    // when
    const position = getNodePosition(exampleChapterPosition, exampleMapSize)

    // then
    expect(position).toEqual({ x: 663, y: 56.57 })
  })
})
