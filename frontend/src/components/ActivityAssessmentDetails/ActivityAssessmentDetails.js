import { Content } from '../App/AppGeneralStyles';
import { Row } from 'react-bootstrap';
import { FullDivider } from '../ActivityInfo/ActivityInfoStyles';
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

//https://www.flaticon.com/free-icon/user-picture_21104
import userPicture from '../../utils/resources/user-picture.png';

export default function ActivityAssessmentDetails() {
    //const navigate = useNavigate();
    //const location = useLocation();
    //console.log(location);

    //we will get data based on the id
    //const { activityId } = location.state;

    return (
        <Content>
            <ContentCol>
                <ActivityTitle>
                    <h4>Zadanie bojowe - SuperSystem I</h4>
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
                                <h5 styles={{ width: '100%' }}>Użytkownik testowy</h5>
                                <h5 styles={{ width: '100%' }}>zadanie oddane w terminie</h5>
                            </UserInfo>
                        </Row>
                    </TopInfoCard>
                    <TopInfoCard>
                        <h4 style={{ textAlign: 'center' }}>Informacje o aktywności</h4>
                        <FullDivider />
                        <p style={{ marginBottom: '1px' }}>Treść:</p>
                        <ActivityInfo>
                            Narysuj przykład sieci składającej się z 3 routerów, 5 komputerów, 4
                            switchy wraz z wypisanym rodzajem użytych kabli na każdym połączeniu.
                        </ActivityInfo>
                        <p style={{ textAlign: 'center' }}>Punkty: 30</p>
                    </TopInfoCard>
                </TopInfo>
                <AnswerRow>
                    <AnswerCol>
                        <h4>Odpowiedź</h4>
                        <AnswerContent>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                            ullamcorper finibus magna, a pellentesque eros consequat id. Donec vitae
                            tristique purus, quis rutrum felis. Nam ultricies, risus at pharetra
                            fermentum, mi sem blandit lacus, eget vulputate est orci sit amet dui.
                            Aliquam est nunc, faucibus eget congue eu, lobortis non tortor. Interdum
                            et malesuada fames ac ante ipsum primis in faucibus. Aenean sodales
                            sollicitudin ex, id viverra tellus dictum non. Etiam consectetur magna
                            nec tortor sodales, ac dignissim eros aliquam. Integer sagittis mattis
                            sapien. Curabitur blandit imperdiet suscipit. Phasellus placerat libero
                            sed tristique pulvinar. Vivamus bibendum augue urna, accumsan interdum
                            risus venenatis quis.
                        </AnswerContent>
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
                        <PointsMax>/ 20</PointsMax>
                    </Row>
                </PointsRow>

                <AcceptButton>Zaakceptuj i przejdź do kolejnej odpowiedzi</AcceptButton>
                <RemainingCount>Pozostało 29 odpowiedzi do sprawdzenia</RemainingCount>
            </ContentCol>
        </Content>
    );
}
