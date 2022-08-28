import chroma from 'chroma-js'
import { barConfig, pieConfig } from '../../../../utils/chartConfig'

const colorPalette = (colorsNumber) => chroma.scale(['#eeeeee', '#2a6a99']).mode('lch').colors(colorsNumber)

export const getChartDetails = (data, labelKey, datasetKey) => {
  const labels = data.map((dataValue) => dataValue[labelKey])
  const dataset = data.map((dataValue) => dataValue[datasetKey])

  return { labels, dataset }
}

export const getChartConfig = (chartType, chartDetails) =>
  chartType === 'BAR'
    ? barConfig(chartDetails.labels, chartDetails.dataset, colorPalette(chartDetails.dataset.length))
    : pieConfig(chartDetails.labels, chartDetails.dataset, colorPalette(chartDetails.dataset.length))
