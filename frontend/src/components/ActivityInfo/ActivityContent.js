import { Row, Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
//maybe move to shared?
import { getActivityImg } from '../../utils/constants';
import { ActivityImg } from './ActivityImg';
export default function ActivityContent(props) {
    // console.log(props.activity);

    return (
        <Col>
            <Row>
                {/* add type switch later */}
                <ActivityImg src={getActivityImg(props.activity.type)}></ActivityImg>

                <h1>Ekspedycja</h1>

                <h1>{props.activity.name}</h1>
            </Row>

            <h1>LOL</h1>
            <h2>LEL</h2>
            <h3>LMAO</h3>
        </Col>
    );
}
