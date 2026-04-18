import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Configuration for page faults comparison chart
 * @param {object[]} results - Array of algorithm results
 * @returns {object} - Chart.js config
 */
export function getFaultsChartConfig(results) {
  const labels = results.map(r => r.algorithm);
  const data = results.map(r => r.totalFaults);

  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Page Faults',
          data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 12,
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(33, 37, 41, 0.95)',
          titleColor: '#ffffff',
          bodyColor: '#f1f5f9',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(102, 126, 234, 0.12)',
          },
          ticks: {
            color: '#4b5563',
            precision: 0,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#4b5563',
            maxRotation: 0,
            autoSkip: false,
          },
        },
      },
    },
  };
}

/**
 * Configuration for hits vs faults pie chart
 * @param {object} result - Single algorithm result
 * @returns {object} - Chart.js config
 */
export function getHitsFaultsChartConfig(result) {
  return {
    type: 'pie',
    data: {
      labels: ['Page Hits', 'Page Faults'],
      datasets: [
        {
          data: [result.totalHits, result.totalFaults],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 2,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 14,
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 16,
            usePointStyle: true,
            color: '#374151',
            boxWidth: 12,
            boxHeight: 12,
          },
        },
        title: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(33, 37, 41, 0.95)',
          titleColor: '#ffffff',
          bodyColor: '#f1f5f9',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        },
      },
      cutout: '45%',
    },
  };
}