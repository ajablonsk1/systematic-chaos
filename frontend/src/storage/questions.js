const DifficultyLvl = {
    EASY: "łatwy",
    MEDIUM: "średni",
    HARD: "trudny"
}

const QuestionCategories = {
    CABLES: "kable",
    CODING: "kodowanie",
    DHCP: "DHCP",
    SURPRISE: "?"
}

export const QuestionsList = [
    {
        DIFFICULTY: DifficultyLvl.EASY,
        QUESTION_CONTENT: "",
        ANSWERS: [
            "odpowiedź 1",
            "odpowiedź 2",
            "jakaś tam 3",
            "tutaj 4"
        ],
        CORRECT_ANSWER: [0], // list of correct answer ids in ANSWERS array
        CLOSED_QUESTION: true,
        CATEGORY: QuestionCategories.CODING,
        POINTS: 20
    },
    {
        DIFFICULTY: DifficultyLvl.HARD,
        QUESTION_CONTENT: "",
        ANSWERS: [
            "coś 1",
            "cośtam 2",
            "next 3",
            "tutaj 4"
        ],
        CORRECT_ANSWER: [0, 1], // correct answer id in ANSWERS array
        CLOSED_QUESTION: false,
        CATEGORY: QuestionCategories.CABLES,
        POINTS: 100
    },
    {
        DIFFICULTY: DifficultyLvl.MEDIUM,
        QUESTION_CONTENT: "",
        ANSWERS: [
            "odpowiedź 1",
            "odpowiedź 2",
            "jakaś tam 3",
            "tutaj 4"
        ],
        CORRECT_ANSWER: [0], // correct answer id in ANSWERS array
        CLOSED_QUESTION: true,
        CATEGORY: QuestionCategories.DHCP,
        POINTS: 40
    }
]
