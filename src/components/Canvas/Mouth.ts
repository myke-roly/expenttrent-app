import { Chart } from 'chart.js';

const ctx = document.querySelector('#byMonth') as HTMLCanvasElement;
ctx.getContext('2d');
const title = document.querySelector('.canvas__title') as HTMLElement;
const totalPrice = document.querySelector('.canvas__price') as HTMLSpanElement;

const pluguin = {
  afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => {},
};

const Categories = {
  internet: 1500,
  comida: 5000,
  sport: 700,
  otros: 2500,
  ropa: 2500,
};

export function printCanvasByMonth(categories: {} = Categories, month: string = 'Noviembre', price: number = 2500): Chart {
  const mychart: Chart = new Chart(ctx, {
    plugins: [pluguin, pluguin],
    type: 'pie',
    data: {
      labels: [...Object.keys(categories)],
      datasets: [
        {
          label: 'Filter by month',
          data: [...Object.values(categories)],
          fill: '#788',
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(255, 100, 86)', 'rgb(100, 205, 86)'],
          borderWidth: 1,
          borderDashOffset: 1,
        },
      ],
    },
    options: {
      hover: {
        axis: 'xy',
        mode: 'nearest',
        animationDuration: 300,
        intersect: true,
      },
      layout: {
        padding: {
          right: 25,
          bottom: 20,
          left: 5,
          top: 5,
        },
      },
      legend: {
        display: true,
        position: 'left',
        align: 'start',
      },
    },
  });

  title.textContent = month;
  totalPrice.textContent = price.toString();

  return mychart;
}
