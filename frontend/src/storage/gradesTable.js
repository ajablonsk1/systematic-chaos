import { percentagesToGrade } from "../utils/constants";

const grades = [
    {
        date: '10.04.2022',
        points: 450,
        maxPoints: 500,
        activityType: 'expedition',
        activityName: 'Kable',
    },
    {
        date: '12.04.2022',
        points: 300,
        maxPoints: 400,
        activityType: 'survey',
        activityName: 'Kodowania',
    },
    {
        date: '20.04.2022',
        points: 500,
        maxPoints: 1000,
        activityType: 'expedition',
        activityName: 'Warstwa 2',
    },
    {
        date: '25.04.2022',
        points: 350,
        maxPoints: 1000,
        activityType: 'expedition',
        activityName: 'IP',
    },
    {
        date: '05.05.2022',
        points: 300,
        maxPoints: 500,
        activityType: 'task',
        activityName: 'ARP',
    },
    {
        date: '10.05.2022',
        points: 500,
        maxPoints: 600,
        activityType: 'survey',
        activityName: 'Ankieta',
    },
    {
        date: '20.05.2022',
        points: 450,
        maxPoints: 1000,
        activityType: 'expedition',
        activityName: 'IPv6',
    },
    {
        date: '25.05.2022',
        points: 400,
        maxPoints: 500,
        activityType: 'task',
        activityName: 'Warstwa 3',
    },
    {
        date: '12.06.2022',
        points: 500,
        maxPoints: 500,
        activityType: 'survey',
        activityName: 'Ankieta końcowa',
    },
    {
        date: '20.06.2022',
        points: null,
        maxPoints: 1000,
        activityType: 'expedition',
        activityName: 'VPN',
    },
    {
        date: '25.06.2022',
        points: null,
        maxPoints: 500,
        activityType: 'task',
        activityName: 'Warstwa aplikacji',
    },
    {
        date: '26.06.2022',
        points: null,
        maxPoints: 500,
        activityType: 'survey',
        activityName: 'Ocena formy zajęć',
    },

];


export function getAverageGrade() {
    const avgGrade = grades.reduce((sum, grade) => {
        return sum + percentagesToGrade(grade.points / grade.maxPoints);
    }, 0) / grades.length;
    return avgGrade.toFixed(1);

}

export function getWeightedAverageGrade() {
    const weightedAvgGrade = grades.reduce((sum, grade) => {
        return sum + percentagesToGrade(grade.points / grade.maxPoints) * grade.maxPoints
    }, 0) / grades.reduce((sum, grade) => {
        return sum + grade.maxPoints;
    }, 0);
    return weightedAvgGrade.toFixed(1);

}

export function getGrades() {
    return grades.filter(grade => grade.points);
}

export function getUnmarkedActivities() {
    return grades.filter(grade => !grade.points);
}