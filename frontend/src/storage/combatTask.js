const combatTask = [
    {
        id: 1,
        name: 'Super zadanie bojowe',
        description:
            'Narysuj przykład sieci składającej się z 3 routerów, 5 komputerów, 4 switchy wraz z wypisanym rodzajem użytych kabli na każdym połączeniu',
        files: [],
        type: 'task',
    },
];

export function getCombatTask(taskId) {
    return combatTask.find(task => task.id === taskId);
}

export function addFile(taskId, file) {
    getCombatTask(taskId).files.push(file);
}

export function removeFile(taskId, fileId) {
    getCombatTask(taskId).files.splice(fileId, 1);
}
