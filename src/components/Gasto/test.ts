import { Chart } from 'chart.js';

const ctx = document.querySelector('#myChart') as HTMLCanvasElement;
ctx.getContext('2d');

const pluguin = {
  afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => {},
};

export function printCanvas(): any {
  const mychart: Chart = new Chart(ctx, {
    plugins: [pluguin, pluguin],
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setpiembre', 'Octubre', 'Novienbre', 'Diciembre'],
      datasets: [
        {
          backgroundColor: '#333',
          label: 'Bar Dataset',
          data: [10, 15, 30, 15, 10, 15, 30, 50, 10, 15, 30, 50],
        },
        {
          backgroundColor: '#888',
          label: 'Bar Dataset',
          data: [10, 15, 30, 50, 10, 15, 30, 50, 10, 15, 30, 15],
        },
      ],
    },
    options: {
      hover: {
        axis: 'xy',
        mode: 'nearest',
        animationDuration: 400,
        intersect: true,
      },
    },
  });

  return mychart;
}
