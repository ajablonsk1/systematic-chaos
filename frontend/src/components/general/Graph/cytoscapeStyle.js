import nodeIcon from './node-edit.png'
import labelIcon from './label1.png'

const FONT_FAMILY = 'Patrick Hand'

export const cytoscapeStylesheet = [
  {
    selector: 'node',
    style: {
      backgroundColor: 'data(backgroundColor)',
      borderWidth: 5,
      borderColor: 'data(borderColor)',
      content: 'data(content)',
      textValign: 'center',
      textHalign: 'center',
      fontSize: 'data(fontSize)',
      width: 'data(size)',
      height: 'data(size)',
      padding: 'data(padding)',
      textMarginY: 5
    }
  },
  {
    selector: 'edge',
    style: {
      width: 'data(size)',
      lineColor: 'data(color)',
      targetArrowShape: 'triangle',
      targetArrowColor: 'data(color)',
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
    width: parseFloat(node.data().size) * 6 + 'px',
    height: parseFloat(node.data().size) * 3 + 'px',
    textAlign: 'center',
    padding: parseFloat(node.data().size) * 0.75 + 'px',
    fontSize: parseFloat(node.data().size) * 0.7 + 'px',
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
    width: parseFloat(node.data().size) * 5 + 'px',
    height: parseFloat(node.data().size) * 5 + 'px',
    zIndex: 10,
    fontFamily: FONT_FAMILY,
    opacity: node.data().isBlocked ? 0.5 : 1
  }
}

export const gameNodeChildStyle = (node) => {
  return {
    width: '50%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: parseFloat(node.data().size) * 3 + 'px',
    color: 'white',
    zIndex: 11
  }
}

export const nodeLabelChildStyle = (node) => {
  return {
    width: (parseFloat(node.data().size) * 7) / 2 + 'px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontFamily: FONT_FAMILY
  }
}
