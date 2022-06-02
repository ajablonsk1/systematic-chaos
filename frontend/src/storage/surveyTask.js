// To i combatTask raczej nie odpowiadają temu jak to będzie ogarnięte w bazie, po prostu zastąpimy to wszystko
// jakimś getActivity(chapterID, taskID) w Api.js jak będzie prawidłowa implementacja na backu, na razie jako mock przejdzie

const surveyTask = [
    {
        id: 2,
        name: 'Feedback - rozdział 1',
        description: 'Prześlij swoją opinię na temat tego rozdziału aby zdobyć dodatkowe punkty',
        points: 20,
        type: 'survey',
    },
];

export function getSurveyTask(chapterID, taskId) {
    return surveyTask.find(task => task.id === taskId);
}
