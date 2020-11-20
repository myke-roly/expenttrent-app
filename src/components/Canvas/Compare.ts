import { Chart } from 'chart.js';

const pluguin = {
  afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => {},
};

const ctx = document.querySelector('#byCompare') as HTMLCanvasElement;
ctx.getContext('2d');
const displayTitle = document.querySelector('.compare-title') as HTMLSpanElement;
const totalPriceGasto = document.querySelector('.compare-gasto') as HTMLElement;
const totalPriceIngreso = document.querySelector('.compare-ingreso') as HTMLElement;

export interface CompareI {
  month: string;
  gasto: number;
  ingreso: number;
}

let compare: CompareI[] = [
  {
    month: 'mayo',
    gasto: 300,
    ingreso: 150,
  },
  {
    month: 'Junio',
    gasto: 300,
    ingreso: 150,
  },
  {
    month: 'Julio',
    gasto: 300,
    ingreso: 150,
  },
  {
    month: 'Agosto',
    gasto: 90,
    ingreso: 150,
  },
  {
    month: 'Septiembre',
    gasto: 15,
    ingreso: 454,
  },
  {
    month: 'Noviembre',
    gasto: 90,
    ingreso: 454,
  },
];

export function printCanvasByCompare(title: string = 'Ultimos 6 meses'): Chart {
  const mychart: Chart = new Chart(ctx, {
    plugins: [pluguin, pluguin],
    type: 'bar',
    data: {
      labels: compare.map(({ month }) => month),
      datasets: [
        {
          label: 'Ingreso',
          data: compare.map(({ ingreso }) => ingreso),
          fill: '#009',
          backgroundColor: '#8CE27F',
        },
        {
          label: 'Gasto',
          data: compare.map(({ gasto }) => gasto),
          fill: '#990',
          backgroundColor: '#FF3D67',
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
          bottom: 70,
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

  const priceTotalIngreso = compare.reduce((acc: number, count: CompareI): number => acc + count.ingreso, 0);
  const priceTotalGasto = compare.reduce((acc: number, count: CompareI): number => acc + count.gasto, 0);

  displayTitle.textContent = title;
  totalPriceIngreso.textContent = priceTotalIngreso.toString();
  totalPriceGasto.textContent = priceTotalGasto.toString();

  return mychart;
}
