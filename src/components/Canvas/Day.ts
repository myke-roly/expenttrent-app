import { Chart } from 'chart.js';

const pluguin = {
  afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => {},
};

const ctx = document.querySelector('#byDay') as HTMLCanvasElement;
ctx.getContext('2d');
const title = document.querySelector('.day-title') as HTMLElement;
const totalPrice = document.querySelector('.day-price') as HTMLSpanElement;

export interface CanvasDayI {
  day: string;
  mount: number;
}

// function fiterByDay(data: any[]): CanvasMonthI[] {
//   let filterC: any = {};

//   data.forEach((item) => {
//     if (!filterC.hasOwnProperty(item.category)) {
//       filterC[item.category] = { items: [] };
//     }

//     filterC[item.category].items.push({
//       title: item.category,
//       price: item.price,
//     });
//   });
//   return Object.values(filterC)
//     .map((items: any) => items)
//     .map((item: any) => {
//       return {
//         category: item.items[0].title,
//         mount: item.items.reduce((acc: number, count: any) => acc + count.price, 0),
//       };
//     });
// }
const days: CanvasDayI[] = [
  { day: 'lunes', mount: 750 },
  { day: 'martes', mount: 450 },
  { day: 'miercoles', mount: 4654 },
  { day: 'jueves', mount: 5454 },
  { day: 'viernes', mount: 100 },
  { day: 'sabado', mount: 1000 },
  { day: 'domingo', mount: 0 },
];

export function printCanvasByDay(day: string = 'Ultimos 7 days'): Chart {
  const mychart: Chart = new Chart(ctx, {
    plugins: [pluguin, pluguin],
    type: 'bar',
    data: {
      labels: days.map((day) => day.day),
      datasets: [
        {
          label: 'Filter by day',
          data: days.map((day) => day.mount),
          fill: '#009',
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 50, 86)',
            'rgb(100, 205, 86)',
            'rgb(100, 0, 86)',
          ],
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
          right: 10,
          bottom: 60,
          left: 10,
          top: 10,
        },
      },
      legend: {
        display: true,
        position: 'top',
        align: 'start',
      },
    },
  });

  const priceTotal = days.reduce((acc: number, count: CanvasDayI): number => acc + count.mount, 0);

  title.textContent = day;
  totalPrice.textContent = priceTotal.toString();

  return mychart;
}
