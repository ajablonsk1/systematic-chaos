export const barConfig = (labels, datasets, backgroundColors) => {
  const options = {
    responsive: true,
    scales: {
      xAxis: {
        display: false
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
    labels: [''],
    datasets: labels.map((label, index) => ({
      label: label,
      data: [datasets[index]],
      backgroundColor: backgroundColors[index]
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
