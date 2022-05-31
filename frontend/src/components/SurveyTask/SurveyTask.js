import { Content } from '../App/AppGeneralStyles';
import {
    HeaderRow,
    HeaderCol,
    ActivityImg,
    ActivityName,
    ActivityType,
    FullDivider,
    ActivityCol,
    SmallDivider,
} from '../ActivityInfo/ActivityInfoStyles';
import { getActivityImg, getActivityTypeName } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { InfoContainer } from '../ActivityInfo/InfoContainer';
import { getSurveyTask } from '../../storage/surveyTask';

export default function FeedbackTask() {
    const location = useLocation();
    //also chapterID later
    const { activityId: taskId } = location.state;
    console.log(taskId);
    //later with correct ids
    const task = getSurveyTask(null, taskId);

    console.log(task);

    return (
        <Content>
            <InfoContainer>
                {taskId === undefined ? (
                    <Loader />
                ) : (
                    <ActivityCol className="invisible-scroll">
                        <HeaderCol>
                            <HeaderRow>
                                <ActivityImg src={getActivityImg(task.type)}></ActivityImg>
                                <ActivityType>{getActivityTypeName(task.type)}</ActivityType>
                                <ActivityName>{task.name}</ActivityName>
                            </HeaderRow>
                            <div>
                                <h5>
                                    Podziel się opinią na temat rozdziału aby zdobyć dodatkowe
                                    punkty.
                                </h5>
                                <SmallDivider />
                                <p>
                                    Przyznane punkty: <strong>nie</strong>
                                </p>{' '}
                                {/* //TODO */}
                                <SmallDivider />
                            </div>
                            <FullDivider />
                        </HeaderCol>
                    </ActivityCol>
                )}
            </InfoContainer>
        </Content>
    );
}
