export const cytoscapeStylesheet = [
  {
    selector: 'node',
    style: {
      backgroundColor: 'white',
      borderWidth: 5,
      borderColor: 'data(borderColor)',
      content: 'data(id)',
      textValign: 'center',
      textHalign: 'center',
      fontSize: 64,
      width: 20,
      height: 20,
      padding: 30,
      textMarginY: 5
    }
  },
  {
    selector: 'edge',
    style: {
      width: 8,
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
      lineColor: 'white',
      targetArrowShape: 'none',
      curveStyle: 'unbundled-bezier',
      lineStyle: 'dashed',
      lineDashPattern: [40, 15],
      controlPointWeights: '0.3 0.5 0.8',
      controlPointDistances: '-20 100 -20'
    }
  },
  {
    selector: '.gameMapNode',
    style: {
      backgroundColor: '#6b6a6a',
      color: 'white',
      borderColor: 'white',
      borderWidth: 2,
      fontFamily: 'Patrick Hand'
    }
  }
]
