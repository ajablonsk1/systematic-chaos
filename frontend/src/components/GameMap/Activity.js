import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivityImg } from '../../utils/constants';
import { Square, ActivityImg } from './ActivityStyles';
import { PageRoutes } from '../../utils/constants';

function Activity(props) {
    const gameSquare = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const updateSize = () => {
            // * 0.90 - prevents rows wrapping
             if (gameSquare != null && gameSquare.current != null) {
                gameSquare.current.style.width =
                    (props.parent.current.offsetWidth / props.mapSizeY) * 0.9 + 'px';
                gameSquare.current.style.height =
                    (props.parent.current.offsetHeight / props.mapSizeX) * 0.9 + 'px';
            }
        };

        if (props.parent.current) {
            updateSize();
            window.addEventListener(
                'resize',
                () => {
                    updateSize();
                },
                false
            );
        }
    }, [gameSquare, props]);

    const isUnlocked = () => {
        // TODO
        return true;
    };

    const getContent = () => {
        if (props.props) {
            if (isUnlocked()) {
                const activity = props.props;
                const type = activity.activityType;
                return <ActivityImg src={getActivityImg(type)}></ActivityImg>;
            }
        }
    };

    const startActivity = () => {
        // TODO, currently goes to the hard-coded expedition activity but it should be OK once we implement a 'real' activity getter in API
        navigate(`${PageRoutes.ACTIVITY_INFO}/${props.props.id}/`);
    };

    const getBackgroundColor = () => {
        return props.props ? 'white' : 'transparent';
    };

    return (
        <Square
            variant="outline-light"
            style={{ background: getBackgroundColor() }}
            onClick={startActivity}
            ref={gameSquare}
        >
            {getContent()}
        </Square>
    );
}

export default Activity;
