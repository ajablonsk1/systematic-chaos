import React, { useEffect, useRef, useState } from 'react'
import { Tab } from 'react-bootstrap'
import ChapterMap from '../Map/ChapterMap'
import { TabColored } from './ChaptersNavStyle'
import Loader from '../../../general/Loader/Loader'
import { ERROR_OCCURRED } from '../../../../utils/constants'
import ChapterService from '../../../../services/chapter.service'

function ChaptersNav() {
  const [chaptersList, setChaptersList] = useState(undefined)
  const [mapsContainerSize, setMapsContainerSize] = useState({})
  let refs = useRef([React.createRef(), React.createRef()])

  useEffect(() => {
    setMapsContainerSize({
      x: refs.current[0].current?.offsetWidth ?? 0,
      y: refs.current[0].current?.offsetHeight ?? 0
    })
    refs.current[0].current?.focus()
  }, [chaptersList])

  useEffect(() => {
    const updateContainerSize = () =>
      setMapsContainerSize({
        x: refs.current[0].current?.offsetWidth ?? 0,
        y: refs.current[0].current?.offsetHeight ?? 0
      })

    window.addEventListener('resize', updateContainerSize)

    return () => {
      window.removeEventListener('resize', updateContainerSize)
    }
  }, [])

  useEffect(() => {
    if (chaptersList) {
      const listLength = chaptersList.length ?? 0
      refs.current = refs.current.splice(0, listLength)
      for (let i = 0; i < listLength; i++) {
        refs.current[i] = refs.current[i] || React.createRef()
      }
      refs.current = refs.current.map((item) => item || React.createRef())
    }
  }, [chaptersList])

  useEffect(() => {
    ChapterService.getChaptersList()
      .then((response) => {
        setChaptersList(response)
      })
      .catch(() => {
        setChaptersList(null)
      })
  }, [])

  return chaptersList === undefined ? (
    <Loader />
  ) : chaptersList == null ? (
    <p className={'text-center text-danger h3'}>{ERROR_OCCURRED}</p>
  ) : (
    <TabColored defaultActiveKey={chaptersList[0]?.id ?? 0} id='chaptersNav' className='mb-3 justify-content-center'>
      {chaptersList?.map((chapter, index) => (
        <Tab key={index + Date.now()} eventKey={chapter.id} title={chapter.name}>
          <div style={{ maxHeight: '90vh', height: '90vh', width: '100%' }} ref={refs.current[index]}>
            <ChapterMap chapterId={chapter.id} marginNeeded mapClickable parentSize={mapsContainerSize} />
          </div>
        </Tab>
      ))}
    </TabColored>
  )
}

export default ChaptersNav
