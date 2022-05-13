import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { PageRoutes, START_GRAPH_NODE_ID } from '../../utils/constants';
import Loader from '../Loader/Loader';

// TODO: widok ekspedycji z opisem i podsumowaniem (task 40)

export default function ExpeditionInfo() {
    const navigate = useNavigate();
    const { expeditionId } = useParams();

    useEffect(() => {
        console.log(expeditionId);
    }, [expeditionId]);

    // in the future we can get expedition from expeditions list using id in props
    return (
        <>
            {expeditionId === undefined ? (
                <Loader />
            ) : (
                <Button
                    onClick={() =>
                        navigate(
                            `${PageRoutes.QUESTION_SELECTION}/${expeditionId}/${START_GRAPH_NODE_ID}`
                        )
                    }
                >
                    Rozpocznij
                </Button>
            )}
        </>
    );
}
