import { Chart } from 'chart.js';

const pluguin = {
  afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => {},
};

const ctx = document.querySelector('#byMonth') as HTMLCanvasElement;
ctx.getContext('2d');
const title = document.querySelector('.month-title') as HTMLElement;
const totalPrice = document.querySelector('.month-price') as HTMLSpanElement;

export interface CanvasMonthI {
  category: string;
  mount: number;
}

function fiterByCategories(data: any[]): CanvasMonthI[] {
  let filterC: any = {};

  data.forEach((item) => {
    if (!filterC.hasOwnProperty(item.category)) {
      filterC[item.category] = { items: [] };
    }

    filterC[item.category].items.push({
      title: item.category,
      price: item.finalPrice,
    });
  });

  const priceCategories = Object.values(filterC)
    .map((items: any) => items)
    .map((item: any) => ({
      category: item.items[0].title,
      mount: item.items.reduce((acc: number, count: any) => acc + count?.price, 0),
    }));

  return priceCategories;
}

export function printCanvasByMonth(res: any[], month: string = '2020'): Chart {
  const categories = fiterByCategories(res);

  const mychart: Chart = new Chart(ctx, {
    plugins: [pluguin, pluguin],
    type: 'pie',
    data: {
      labels: categories.map((category) => category.category),
      datasets: [
        {
          label: 'Filter by month',
          data: categories.map((category) => category.mount),
          fill: '#788',
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 50, 86)',
            'rgb(100, 205, 86)',
            'rgb(100, 0, 86)',
          ],
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

  const priceTotal = categories.reduce((acc: number, count: CanvasMonthI): number => acc + count.mount, 0);

  title.textContent = month;
  totalPrice.textContent = priceTotal.toString();

  return mychart;
}
