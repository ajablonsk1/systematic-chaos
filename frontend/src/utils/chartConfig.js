export const barConfig = (datasetLabels, datasets, backgroundColors, labels = [''], xAxisDisplay = false) => {
  const options = {
    responsive: true,
    scales: {
      xAxis: {
        display: xAxisDisplay,
        ticks: {
          color: '#ffffff'
        }
      },
      yAxis: {
        display: false
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#FFFFFF',
          boxWidth: 20
        }
      },
      title: {
        display: false
      }
    }
  }

  const data = {
    labels: labels,
    datasets: datasetLabels.map((label, index) => ({
      label: label,
      data: typeof datasets[index] === 'number' || !datasets[index] ? [datasets[index]] : [...datasets[index]], // Yes, I know - it's stupid and ugly, so... TODO later
      backgroundColor: backgroundColors[index],
      minBarLength: 7
    }))
  }

  return { options, data }
}

export const pieConfig = (labels, datasets, backgroundColors) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#FFFFFF',
          boxWidth: 20
        }
      },
      title: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let actualValue = context.raw
            let sumValue = context.dataset.data.reduce((a, b) => a + b)

            return actualValue + ' - ' + Math.round(100 * (actualValue / sumValue)) + '%'
          },
          title: (tooltipItem) => `${tooltipItem[0]?.label}`
        }
      }
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: datasets,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors
      }
    ]
  }

  return { options, data }
}

export const lineConfig = (labels, datasets, colors) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#FFFFFF',
          boxWidth: 20
        }
      },
      title: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw + '%'
          },
          title: (tooltipItem) => `${tooltipItem[0]?.label}`
        }
      }
    }
  }

  const data = {
    labels: labels,
    datasets: datasets.map((set, index) => {
      return {
        label: set.label,
        data: set.data,
        borderColor: colors[index],
        backgroundColor: colors[index]
      }
    })
  }

  return { options, data }
}
