import { filterByMonth } from './filtered-month';
import firebase from 'firebase/app';

describe('filtered by month', () => {
  it('actuality month and year', () => {
    const response = { createAt: { toDate: () => new Date('Julio 01, 2021 00:00:00') } };
    const value = filterByMonth(response, 'Jul');

    expect(value).toBe(true);
  });

  it('unactuality month', () => {
    const response = { createAt: { toDate: () => new Date('Junio 01, 2021 00:00:00') } };
    const value = filterByMonth(response, 'Jul');

    expect(value).toBe(false);
  });

  it('unactuality year', () => {
    const response = { createAt: { toDate: () => new Date('Julio 01, 2000 00:00:00') } };
    const value = filterByMonth(response, 'Jul');

    expect(value).toBe(false);
  });
});
