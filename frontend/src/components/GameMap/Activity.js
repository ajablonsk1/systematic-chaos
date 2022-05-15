import React, { useEffect, useRef } from 'react';
import { getActivityImg } from '../../utils/constants';
import { Square, ActivityImg } from './ActivityStyles';

function Activity(props) {
    const gameSquare = useRef();

    useEffect(() => {
        const updateSize = () => {
            // * 0.90 - prevents rows wrapping
            if (gameSquare != null && gameSquare.current != null) 
            {
                gameSquare.current.style.width = 
                    props.parent.current.offsetWidth / props.mapSizeY * 0.90 + "px";
                gameSquare.current.style.height = 
                    props.parent.current.offsetHeight / props.mapSizeX * 0.90 + "px";
            }
        }

        if (props.parent.current) 
        {
            updateSize();
            window.addEventListener("resize", () => {
                updateSize();
            }, false);
        }
        
    }, [gameSquare, props])

    const isUnlocked = () => {
        // TODO
        return true;
    }

    const getContent = () => {
        if (props.props)
        {
            if (isUnlocked())
            {
                const activity = props.props;
                const type = activity.activityType;
                return <ActivityImg src={getActivityImg(type)}></ActivityImg>
            }
        }
    }

    const startActivity = () => {
        // TODO
    }

    const getBackgroundColor = () => {
        return props.props ? 'white' : 'transparent'
    }

    return (
        <Square 
            variant="outline-light" 
            style={{background: getBackgroundColor()}} 
            onClick={startActivity}
            ref={gameSquare}
        >
            {getContent()}
        </Square>
    );
}

export default Activity;