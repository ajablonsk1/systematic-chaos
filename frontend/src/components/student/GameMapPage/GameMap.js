import React from 'react'
import ChaptersNav from './ChaptersList/ChaptersNav'
import { GameContent } from './GameMapStyles'
import Legend from './Legend/Legend'

function GameMap() {
  return (
    <GameContent>
      <ChaptersNav></ChaptersNav>
      <Legend></Legend>
    </GameContent>
  )
}

export default GameMap
