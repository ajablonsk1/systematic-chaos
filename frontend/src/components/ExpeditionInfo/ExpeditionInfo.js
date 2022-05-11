import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { PageRoutes, START_GRAPH_NODE_ID } from '../../utils/constants';
import Loader from '../Loader/Loader';

// TODO: widok ekspedycji z opisem i podsumowaniem (task 40)

export default function ExpeditionInfo() {
    const navigate = useNavigate();
    const expeditionID = useParams();

    // in the future we can get expedition from expeditions list using id in props
    return (
        <>
            {expeditionID === undefined ? (
                <Loader />
            ) : (
                <Button
                    onClick={() =>
                        navigate(
                            `${PageRoutes.QUESTION_SELECTION}/${expeditionID}/${START_GRAPH_NODE_ID}`
                        )
                    }
                >
                    Rozpocznij
                </Button>
            )}
        </>
    );
}
