import { Content } from '../../App/AppGeneralStyles';
import { Row } from 'react-bootstrap';
import { FullDivider } from '../../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles';
//import { useLocation, useNavigate } from 'react-router-dom';
import {
    ContentCol,
    ActivityTitle,
    TopInfo,
    TopInfoCard,
    UserInfo,
    AnswerRow,
    AnswerContent,
    ActivityInfo,
    AnswerCol,
    RemarksCol,
    PointsInput,
    PointsMax,
    AcceptButton,
    RemarksTextArea,
    PointsRow,
    RemainingCount,
} from './ActivityAssesmentDetailsStyles';
import { getActivityTypeName } from '../../../utils/constants';
//https://www.flaticon.com/free-icon/user-picture_21104
import userPicture from '../../../utils/resources/user-picture.png';

//example result of GET - returns the first non-reviewed answer for activity of given Id
// todo: remove it and use endpoint
const exampleActivityToGrade = {
    //answerId is an example of the answer identifier - we need to have a way to save points to a given answer somehow, not sure how it works (or will work) on back
    answerId: 1,
    activityType: 'task',
    activityName: 'SuperSystem I',
    userName: 'Jan Kowalski',
    isLate: false,
    activityDetails:
        'Narysuj przykład sieci składającej się z 3 routerów, 5 komputerów, 4 switchy wraz z wypisanym rodzajem użytych kabli na każdym połączeniu.',
    userAnswer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper finibus magna, a pellentesque eros consequat id. Donec vitae tristique purus, quis rutrum felis. Nam ultricies, risus at pharetra fermentum, mi sem blandit lacus, eget vulputate est orci sit amet dui. Aliquam est nunc, faucibus eget congue eu, lobortis non tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean sodales sollicitudin ex, id viverra tellus dictum non. Etiam consectetur magna nec tortor sodales, ac dignissim eros aliquam. Integer sagittis mattis sapien. Curabitur blandit imperdiet suscipit. Phasellus placerat libero sed tristique pulvinar. Vivamus bibendum augue urna, accumsan interdum risus venenatis quis.',
    activityPoints: 30,
    remaining: 29,
};

export default function ActivityAssessmentDetails() {
    // todo: remove it I think
    //const navigate = useNavigate();
    //const location = useLocation();
    //console.log(location);

    //we will get data based on the id
    //const { activityId } = location.state;

    return (
        <Content>
            <ContentCol>
                <ActivityTitle>
                    <h4>
                        {getActivityTypeName(exampleActivityToGrade.activityType) +
                            ' - ' +
                            exampleActivityToGrade.activityName}
                    </h4>
                </ActivityTitle>
                <TopInfo>
                    <TopInfoCard>
                        <h4 style={{ textAlign: 'center' }}>Informacje o użytkowniku</h4>
                        <FullDivider />
                        <Row styles={{ justifyContent: 'center' }}>
                            <img
                                src={userPicture}
                                alt="profile avatar"
                                style={{ paddingLeft: '20px' }}
                            ></img>
                            <UserInfo>
                                <h5 styles={{ width: '100%' }}>
                                    {exampleActivityToGrade.userName}
                                </h5>

                                {/*//TODO: we can do it better, I'm almost sure*/}
                                {!exampleActivityToGrade.isLate && (
                                    <h5 styles={{ width: '100%' }}>zadanie oddane w terminie</h5>
                                )}
                                {exampleActivityToGrade.isLate && (
                                    <h5 styles={{ width: '100%' }}>
                                        zadanie oddane ze spóźnieniem
                                    </h5>
                                )}
                            </UserInfo>
                        </Row>
                    </TopInfoCard>
                    <TopInfoCard>
                        <h4 style={{ textAlign: 'center' }}>Informacje o aktywności</h4>
                        <FullDivider />
                        <p style={{ marginBottom: '1px' }}>Treść:</p>
                        <ActivityInfo>{exampleActivityToGrade.activityDetails}</ActivityInfo>
                        <p style={{ textAlign: 'center' }}>
                            Punkty: {exampleActivityToGrade.activityPoints}
                        </p>
                    </TopInfoCard>
                </TopInfo>
                <AnswerRow>
                    <AnswerCol>
                        <h4>Odpowiedź</h4>
                        <AnswerContent>{exampleActivityToGrade.userAnswer}</AnswerContent>
                    </AnswerCol>
                </AnswerRow>

                <RemarksCol>
                    <h4>Uwagi:</h4>
                    <RemarksTextArea />
                </RemarksCol>

                <PointsRow>
                    <p style={{ top: '50%', position: 'relative', margin: '0' }}>Punkty: </p>
                    <Row style={{ display: 'flex' }}>
                        <PointsInput type="number" min={0} max={20}></PointsInput>
                        <PointsMax>/ {exampleActivityToGrade.activityPoints}</PointsMax>
                    </Row>
                </PointsRow>

                <AcceptButton>Zaakceptuj i przejdź do kolejnej odpowiedzi</AcceptButton>
                <RemainingCount>
                    Pozostało {exampleActivityToGrade.remaining} odpowiedzi do sprawdzenia
                </RemainingCount>
            </ContentCol>
        </Content>
    );
}
