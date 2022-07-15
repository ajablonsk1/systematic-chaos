import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Activity, getActivityImg, getActivityTypeName } from '../../../../utils/constants'
import {
  ActivityCol,
  ActivityImg,
  ActivityName,
  ActivityType,
  FullDivider,
  HeaderCol,
  HeaderRow,
  SmallDivider
} from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { InfoContainer } from '../ExpeditionTask/ActivityInfo/InfoContainer'
import { Content } from '../../../App/AppGeneralStyles'
import { InformationImage } from './InformationStyles'
import Loader from '../../../general/Loader/Loader'
import InfoTaskService from '../../../../services/infoTask.service'

export default function Information() {
  const location = useLocation()
  const { activityId: informationId } = location.state

  const [information, setInformation] = useState() // todo: endpoint

  useEffect(() => {
    InfoTaskService.getInformation(informationId).then((response) => setInformation(response))
  }, [informationId])

  return (
    <>
      {!information ? (
        <Loader />
      ) : (
        <Content>
          <InfoContainer>
            <ActivityCol>
              <HeaderCol>
                <HeaderRow>
                  <ActivityImg src={getActivityImg(Activity.INFO)}></ActivityImg>
                  <ActivityType>{getActivityTypeName(Activity.INFO)}</ActivityType>
                  <ActivityName>{information.name}</ActivityName>
                </HeaderRow>
                <FullDivider />
              </HeaderCol>
              <div>
                {information.imageUrls.map((image, idx) => (
                  <InformationImage src={image} alt={idx} key={idx} />
                ))}
              </div>
              {information.imageUrls.length ? <SmallDivider /> : <></>}
              <div>
                <p>{information.description}</p>
              </div>
            </ActivityCol>
          </InfoContainer>
        </Content>
      )}
    </>
  )
}
