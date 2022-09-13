import nodeIcon from './node-edit.png'
import labelIcon from './label1.png'

const FONT_FAMILY = 'Patrick Hand'

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
      color: 'white',
      borderWidth: 0,
      borderColor: 'transparent'
    }
  }
]

export const nodeLabelStyle = (node) => {
  const styleTransform = `translate(-50%, 15%) translate(${node.position('x').toFixed(2)}px, ${node
    .position('y')
    .toFixed(2)}px)`

  return {
    transform: styleTransform,
    position: 'absolute', // very important !
    background: `url('${labelIcon}') no-repeat center`,
    backgroundSize: 'cover',
    zIndex: 12,
    width: '120px',
    height: '60px',
    textAlign: 'center',
    padding: '15px',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center'
  }
}

export const gameNodeStyle = (node) => {
  const styleTransform = `translate(-50%, -50%) translate(${node.position('x').toFixed(2)}px, ${node
    .position('y')
    .toFixed(2)}px)`

  return {
    transform: styleTransform,
    background: `url('${nodeIcon}') no-repeat center`,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'contain',
    width: '100px',
    height: '100px',
    zIndex: 10,
    fontFamily: FONT_FAMILY
  }
}

export const gameNodeChildStyle = () => {
  return {
    width: '50%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '60px',
    color: 'white',
    zIndex: 11
  }
}

export const nodeLabelChildStyle = () => {
  return {
    width: '70px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontFamily: FONT_FAMILY
  }
}
