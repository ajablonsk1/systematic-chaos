export const cytoscapeStylesheet = [
  {
    selector: 'node',
    style: {
      backgroundColor: 'data(backgroundColor)',
      borderWidth: 5,
      borderColor: 'data(color)',
      content: 'data(id)',
      textValign: 'center',
      textHalign: 'center',
      fontSize: 48,
      width: 25,
      height: 25,
      padding: 30
    }
  },
  {
    selector: 'edge',
    style: {
      width: 10,
      lineColor: 'black',
      targetArrowShape: 'triangle',
      targetArrowColor: 'black',
      curveStyle: 'bezier',
      lineStyle: 'solid'
    }
  },
  {
    selector: '.gameMapEdge',
    style: {
      lineColor: 'red',
      targetArrowShape: 'none',
      curveStyle: 'unbundled-bezier',
      lineStyle: 'dashed',
      lineDashPattern: [40, 15],
      controlPointWeights: '0.3 0.5 0.8',
      controlPointDistances: '-100 100 -100'
    }
  }
]
