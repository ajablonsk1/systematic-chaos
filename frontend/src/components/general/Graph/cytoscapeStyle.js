export const cytoscapeStylesheet = [
  {
    selector: 'node',
    style: {
      backgroundColor: 'white',
      borderWidth: 5,
      borderColor: 'data(color)',
      content: 'data(id)',
      fontSize: 32,
      width: 20,
      height: 20,
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
      curveStyle: 'bezier'
    }
  }
]
