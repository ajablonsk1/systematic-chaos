import React from 'react'
import { useLocation } from 'react-router-dom'
import Requirements from '../../GameManagement/Requirements/Requirements'
import ChapterService from '../../../../services/chapter.service'

function ChapterRequirements() {
  const location = useLocation()
  const chapterId = location.state.chapterId

  return (
    <div className={'py-4'}>
      <Requirements
        id={chapterId}
        getRequirementsCallback={ChapterService.getRequirements}
        updateRequirementsCallback={ChapterService.setRequirements}
        tableTitle={'Lista wymagań, których spełnienie jest wymagane, aby rozdział był widoczny dla studentów.'}
      />
    </div>
  )
}

export default ChapterRequirements
