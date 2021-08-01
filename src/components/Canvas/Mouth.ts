import { Chart } from 'chart.js';
import { filterByMonth, THIS_MONTH } from '../../helpers/filtered-month';
import { Gasto } from '../../components/Gasto/listItems';

const pluguin = {
  afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => {},
};

const ctx = document.querySelector('#byMonth') as HTMLCanvasElement;
ctx.getContext('2d');
const selectElement = document.querySelector('.canvas__months') as HTMLSelectElement;
const totalPrice = document.querySelector('.month-price') as HTMLSpanElement;

export interface CanvasMonthI {
  category: string;
  mount: number;
}

function fiterByCategories(data: Gasto[], filterMonth: string): CanvasMonthI[] {
  let filterC: any = {};

  data.forEach((item) => {
    if (!filterC.hasOwnProperty(item.category)) {
      filterC[item.category] = { items: [] };
    }

    if (filterByMonth(item, filterMonth)) {
      filterC[item.category].items.push({
        title: item.category,
        price: item.finalPrice,
      });
    }
  });

  const priceCategories = Object.values(filterC)
    .map((items: any) => items)
    .map((item: any) => ({
      category: item.items[0]?.title,
      mount: item.items?.reduce((acc: number, count: any) => acc + count?.price, 0),
    }));

  return priceCategories;
}

export function printCanvasByMonth(res: Gasto[], filterMonth: string = THIS_MONTH): Chart {
  const categories = fiterByCategories(res, filterMonth);

  const priceTotal = categories.reduce((acc: number, count: CanvasMonthI): number => acc + count.mount, 0);
  selectElement.value = filterMonth;

  totalPrice.textContent = priceTotal.toString();

  const mychart: Chart = new Chart(ctx, {
    plugins: [pluguin, pluguin],
    type: 'pie',
    data: {
      labels: categories.map((category) => category.category),
      datasets: [
        {
          label: filterMonth,
          data: categories.map((category) => category.mount),
          fill: '#788',
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 50, 86)',
            'rgb(100, 205, 86)',
            'rgb(100, 0, 86)',
            'rgb(190, 0, 1)',
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

  mychart.update();

  return mychart;
}
