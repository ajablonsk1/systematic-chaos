import React, { useEffect, useState } from 'react'
import { Tab } from 'react-bootstrap'
import ChapterMap from '../Map/ChapterMap'
import { TabColored } from './ChaptersNavStyle'
import Loader from '../../../general/Loader/Loader'
import ActivityService from '../../../../services/activity.service'

function ChaptersNav() {
  const [chapterMap, setChapterMap] = useState()
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    // todo: set mapId, now we always get first map
    ActivityService.getActivityMap(1).then((response) => setChapterMap(response))
  }, [])

  useEffect(() => {
    if (chapterMap) {
      setTabs((tabs) => {
        return [
          ...tabs,
          React.cloneElement(
            <Tab key={'Example map'} eventKey={'Example map'} title={'Example map'}>
              <ChapterMap map={chapterMap} />
            </Tab>
          )
        ]
      })
    }
  }, [chapterMap])

  return (
    <>
      {tabs.length === 0 ? (
        <Loader />
      ) : (
        <TabColored
          defaultActiveKey={'Example map'}
          id='chaptersNav'
          className='mb-3 justify-content-center'
          unmountOnExit={true}
        >
          {tabs}
        </TabColored>
      )}
    </>
  )
}

export default ChaptersNav
