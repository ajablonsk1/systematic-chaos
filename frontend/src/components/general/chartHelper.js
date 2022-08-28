import chroma from 'chroma-js'
import { barConfig, lineConfig, pieConfig } from '../../utils/chartConfig'

export const colorPalette = (colorsNumber) => chroma.scale(['#eeeeee', '#2a6a99']).mode('lch').colors(colorsNumber)

export const getChartDetails = (data, labelKey, datasetKey) => {
  const labels = data.map((dataValue) => dataValue[labelKey])
  const dataset = data.map((dataValue) => dataValue[datasetKey])

  return { labels, dataset }
}

export const getChartConfig = (chartType, chartDetails) => {
  switch (chartType) {
    case 'BAR':
      return barConfig(chartDetails.labels, chartDetails.dataset, colorPalette(chartDetails.dataset.length))
    case 'PIE':
      return pieConfig(chartDetails.labels, chartDetails.dataset, colorPalette(chartDetails.dataset.length))
    case 'LINE':
      return lineConfig(chartDetails.labels, chartDetails.dataset, colorPalette(chartDetails.dataset.length))
    default:
      return
  }
}
