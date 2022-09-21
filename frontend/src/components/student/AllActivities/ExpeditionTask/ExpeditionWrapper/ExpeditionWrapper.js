import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap";
import { EXPEDITION_STATUS } from "./ExpeditionWrapperHelpers";
import { StudentRoutes } from "../../../../../routes/PageRoutes";

export function ExpeditionWrapper() {
    const navigate = useNavigate()
    const location = useLocation()
    const {activityId, alreadyStarted} = location.state;

    const [remainingTime, setRemainingTime] = useState(undefined);
    const [score, setScore] = useState(0);
    const [expeditionState, setExpeditionState] = useState(undefined)

    useEffect(() => {
        if(activityId){
            if(alreadyStarted) {
                // no need to start the expedition again, just do getInfo
            } else {
                // else start the expedition and do getInfo then
            }
        }
        
    },[activityId, alreadyStarted])

    const reloadInfo = () => {
        // we will pass this function to "lower" components so that we can reload info from endpoint 
        // in wrapper on changes
    }

    if(expeditionState === undefined) {
        return <Spinner />
    }

    if(expeditionState.status === EXPEDITION_STATUS.CHOOSE){
        // return changed Question Select screen
        
        if(expeditionState.questions.length === 0) {
            //navigate to summary if there are no questions left
            navigate(StudentRoutes.GAME_MAP.GRAPH_TASK.SUMMARY)
        }
    }

    if(expeditionState.status === EXPEDITION_STATUS.ANSWER){
        // return changed Question Answer Screen
        // a thing I missed - we don't return a question type on answer state, for now I'll hardcode all as multiple
    }

    

    return <p>Elo</p>
}