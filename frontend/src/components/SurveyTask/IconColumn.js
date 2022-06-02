import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'react-bootstrap';

export const IconColumn = props => {
    return (
        <Col>
            {props.icons.map(faIcon => {
                return faIcon && <FontAwesomeIcon icon={faIcon} />;
            })}
        </Col>
    );
};
