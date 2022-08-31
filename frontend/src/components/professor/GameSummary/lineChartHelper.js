import { getChartConfig } from '../../general/chartHelper'

export const lineChartConfig = (chapterScores) => {
  if (!chapterScores) return {}

  const labels = chapterScores.map((activity) => activity.activityName)

  const datasets = []

  chapterScores.forEach((activity) => {
    activity.scores.forEach((score) => {
      const datasetIndex = datasets.findIndex((dataset) => dataset.label === score.groupName)
      if (datasetIndex === -1) {
        datasets.push({
          label: score.groupName,
          data: [score.score]
        })
      } else {
        datasets[datasetIndex].data.push(score.score)
      }
    })
  })

  return getChartConfig('LINE', { labels: labels, dataset: datasets })
}
