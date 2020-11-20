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
          borderWidth: 20,
          backgroundColor: '#FA875C',
          label: 'Bar Dataset',
          data: [10, 15, 30, 15, 10, 10, 30, 10, 50, 5, 30, 50],
        },
        {
          backgroundColor: '#73F3FF',
          label: 'Line Dataset',
          data: [10, 15, 22, 50, 10, 15, 30, 35, 10, 15, 30, 15],
          borderAlign: 'inner',
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
      layout: {
        padding: {},
      },
      title: {
        display: true,
        text: 'Gastos por mes',
      },
    },
  });

  return mychart;
}
