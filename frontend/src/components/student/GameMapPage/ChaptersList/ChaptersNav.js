import React, { useEffect, useRef, useState } from 'react'
import { Tab } from 'react-bootstrap'
import ChapterMap from '../Map/ChapterMap'
import { TabColored } from './ChaptersNavStyle'
import Loader from '../../../general/Loader/Loader'
import ActivityService from '../../../../services/activity.service'
import { uniqBy } from 'lodash'

function ChaptersNav() {
  const [chaptersMap, setChaptersMap] = useState([])
  const chapterMapParentRef = useRef()

  // TODO: z jakiegos powodu wywolywany jest ten endpoint za kazdym razem gdy sie strona odswiezy
  //  i dlatego zawsze duplikowalo mapy i sie pojawialy nowe pod spodem przy auto-refreshu
  //  na razie dodalem uniqBy ale trzeba zbadać sprawe
  useEffect(() => {
    // todo: set mapId, now we always get first map
    ActivityService.getActivityMap(1).then((response) => {
      return setChaptersMap(uniqBy([...chaptersMap, response], 'id'))
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {chaptersMap.length === 0 ? (
        <Loader />
      ) : (
        <TabColored defaultActiveKey={'Example map'} id='chaptersNav' className='mb-3 justify-content-center'>
          {chaptersMap.map((chapter, index) => (
            <Tab key={index + Date.now()} eventKey={'Example map'} title={'Example map'}>
              <div style={{ maxHeight: '70vh', height: '70vh', width: '100%' }} ref={chapterMapParentRef}>
                <ChapterMap map={chapter} marginNeeded mapClickable parentRef={chapterMapParentRef} />
              </div>
            </Tab>
          ))}
        </TabColored>
      )}
    </>
  )
}

export default ChaptersNav
