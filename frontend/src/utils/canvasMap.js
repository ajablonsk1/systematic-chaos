import map1_img from './resources/heroes/map_1_sc.png'

const Map = {
  background: map1_img,
  startRow: 3,
  startCol: 5,
  imgWidth: 640,
  imgHeight: 480,
  binaryRepresentation: [
    [...Array(40).fill(0)],
    [...Array(40).fill(0)],
    [...Array(6).fill(0), 1, 1, 1, 0, 0, 1, 0, ...Array(7).fill(1), ...Array(10).fill(0), 1, 1, 1, ...Array(7).fill(0)],
    [
      ...Array(5).fill(0),
      ...Array(4).fill(1),
      0,
      0,
      ...Array(5).fill(1),
      0,
      0,
      1,
      1,
      ...Array(10).fill(0),
      1,
      1,
      1,
      ...Array(7).fill(0)
    ],
    [...Array(5).fill(0), ...Array(11).fill(1), 0, 0, 1, 1, ...Array(10).fill(0), 1, 1, 1, ...Array(7).fill(0)],
    [...Array(5).fill(0), ...Array(15).fill(1), ...Array(9).fill(0), ...Array(4).fill(1), ...Array(7).fill(0)],
    [...Array(7).fill(0), ...Array(4).fill(1), 0, ...Array(7).fill(1), 0, ...Array(16).fill(1), ...Array(4).fill(0)],
    [...Array(7).fill(0), 1, 1, 1, 0, 0, 0, ...Array(23).fill(1), ...Array(4).fill(0)],
    [...Array(5).fill(0), ...Array(15).fill(1), ...Array(5).fill(0), ...Array(13).fill(1), 0, 0],
    [
      ...Array(5).fill(0),
      1,
      ...Array(8).fill(0),
      ...Array(4).fill(1),
      0,
      1,
      ...Array(5).fill(0),
      1,
      ...Array(4).fill(0),
      ...Array(4).fill(1),
      ...Array(6).fill(0)
    ],
    [...Array(14).fill(0), ...Array(6).fill(1), ...Array(10).fill(0), 1, 1, 1, ...Array(7).fill(0)],
    [...Array(14).fill(0), 1, 1, 1, 0, 0, 1, ...Array(10).fill(0), 1, 1, 1, ...Array(7).fill(0)],
    [...Array(14).fill(0), 1, 1, 1, 0, 0, 1, ...Array(10).fill(0), 1, 1, 1, ...Array(7).fill(0)],
    [...Array(30).fill(0), 1, 1, 1, ...Array(7).fill(0)],
    [...Array(30).fill(0), 1, 1, 1, ...Array(7).fill(0)],
    [...Array(23).fill(0), ...Array(15).fill(1), 0, 0],
    [...Array(17).fill(0), 1, ...Array(5).fill(0), ...Array(15).fill(1), 0, 0],
    [...Array(17).fill(0), 1, ...Array(5).fill(0), ...Array(15).fill(1), 0, 0],
    [...Array(17).fill(0), 1, ...Array(5).fill(0), ...Array(15).fill(1), 0, 0],
    [...Array(17).fill(0), 1, ...Array(6).fill(0), ...Array(14).fill(1), 0, 0],
    [0, 0, ...Array(36).fill(1), 0, 0],
    [...Array(8).fill(0), ...Array(30).fill(1), 0, 0],
    [...Array(8).fill(0), 1, 1, 1, 0, ...Array(5).fill(1), ...Array(6).fill(0), ...Array(15).fill(1), 0, 0],
    [...Array(8).fill(0), 1, 1, 1, ...Array(12).fill(0), ...Array(15).fill(1), 0, 0],
    [...Array(8).fill(0), 1, 1, 1, ...Array(5).fill(0), 1, ...Array(6).fill(0), ...Array(15).fill(1), 0, 0],
    [
      0,
      0,
      1,
      ...Array(4).fill(0),
      ...Array(4).fill(1),
      ...Array(5).fill(0),
      1,
      ...Array(6).fill(0),
      ...Array(11).fill(1),
      0,
      1,
      1,
      1,
      0,
      0
    ],
    [0, 0, 1, ...Array(5).fill(0), 1, 1, 1, ...Array(5).fill(0), 1, ...Array(6).fill(0), ...Array(15).fill(1), 0, 0],
    [0, 0, ...Array(21).fill(1), ...Array(17).fill(0)],
    [0, 0, ...Array(21).fill(1), ...Array(17).fill(0)],
    [0, 0, ...Array(21).fill(1), ...Array(17).fill(0)]
  ]
}

export function getMap() {
  return Map
}
