import React, { useEffect, useRef } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { GameMap } from './canvasCreator'

export default function CanvasMap() {
  const canvas = useRef(null)

  useEffect(() => {
    const map = new GameMap(canvas.current, 'warrior')
    map.run()
  }, [canvas])

  return (
    <Content className='d-flex justify-content-center align-items-center px-2'>
      <canvas ref={canvas} style={{ border: '1px solid black' }}></canvas>
    </Content>
  )
}
