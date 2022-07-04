import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const GameCardButton = props => {
    const navigate = useNavigate();
    return (
        <Card.Footer style={{ paddingTop: '10px' }}>
            <Button
                onClick={() => {
                    navigate(props.route);
                }}
                style={{
                    width: '100%',
                    textAlign: 'center',
                    backgroundColor: '#085454',
                    border: 'none',
                }}
            >
                {props.text}
            </Button>
        </Card.Footer>
    );
};
