export const cytoscapeStylesheet = [
  {
    selector: 'node',
    style: {
      backgroundColor: 'data(backgroundColor)',
      borderWidth: 'data(borderWidth)',
      borderColor: 'data(borderColor)',
      content: 'data(id)',
      textValign: 'center',
      textHalign: 'center',
      fontSize: 64,
      width: 20,
      height: 20,
      padding: 30,
      textMarginY: 5,
      color: 'data(fontColor)',
      fontFamily: 'Patrick Hand'
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
      lineColor: 'white',
      targetArrowShape: 'none',
      curveStyle: 'unbundled-bezier',
      lineStyle: 'dashed',
      lineDashPattern: [40, 15],
      controlPointWeights: '0.3 0.5 0.8',
      controlPointDistances: '-100 100 -100'
    }
  }
]
