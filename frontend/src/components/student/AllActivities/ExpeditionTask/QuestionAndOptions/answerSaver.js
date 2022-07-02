import {PageRoutes, QuestionType} from "../../../../../utils/constants";
import ExpeditionService from "../../../../../services/expedition.service";

const getAnswerForm = (questionType, userAnswer) => {
    switch (questionType){
        case QuestionType.OPEN_QUESTION:
            return {openAnswer: userAnswer}
        case QuestionType.SINGLE_CHOICE:
            return {option: userAnswer[0]}
        case QuestionType.MULTIPLE_CHOICE:
            return {options: userAnswer}
    }
}

export default function answerSaver(userAnswer, questionType, resultId, questionId, expeditionId, navigate){
    if (!userAnswer) return;

    let acceptWarning = null;

    if (userAnswer.length === 0){
        acceptWarning = window.confirm(
            'Nie podałeś żadnej odpowiedzi. Czy na pewno chcesz przejść dalej?'
        );
    }

    // acceptWarning == null || acceptWarning === true
    if (acceptWarning !== false){
        const result = {
            resultId: resultId,
            questionId: questionId,
            answerForm: getAnswerForm(questionType, userAnswer)
        }

        ExpeditionService.saveAnswer(result).then(() => {
            navigate(`${PageRoutes.QUESTION_SELECTION}`, {
                state: { activityId: expeditionId, nodeId: questionId, taskResultId: resultId },
            })
        })
    }
}
