import answers from '../storage/questionAnswers.json';

function compare(arr1, arr2) {
    return arr1.reduce((a, b) => a + arr2.includes(b), 0);
}

export function getUserPoints() {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    if (userAnswers.length === 0) return 0;

    let scoredPoints = 0;

    // TODO: wygląda jak klejone taśmą, znaleźć lepszy pomysł na liczenie punktów
    userAnswers.forEach(answer => {
        const correctAnswerObj = answers.find(a => a.questionId === answer.questionId);
        const noUserAnswers = answer.answers.length;
        const noCorrectAnswers = compare(correctAnswerObj.answers, answer.answers);
        const noIncorrectAnswers = noUserAnswers - noCorrectAnswers;
        const noAllCorrectAnswers = correctAnswerObj.answers.length;
        const noAllIncorrectAnswers = correctAnswerObj.options.length;
        const allPoints = correctAnswerObj.points;

        scoredPoints += Math.max(
            0,
            (noCorrectAnswers / noAllCorrectAnswers) * allPoints -
                (noIncorrectAnswers / noAllIncorrectAnswers) * allPoints
        );
    });

    return scoredPoints;
}

/* 
Do obliczania punktów wykorzystałem wzór:
(userCorrect / allCorrect) * p - (userIncorrect / allIncorrect) * p

gdzie:
p - liczba punktów za całe zadanie
userCorrect - liczba poprawnych odpowiedzi zaznaczonych przez użytkownika
userIncorrect - liczba niepoprawnych odpowiedzi zaznaczonych przez użytkownika
allCorrect - wszystkie poprawne odpowiedzi w zadaniu
allIncorrect - wszystkie niepoprawne odpowiedzi w zadaniu
*/
