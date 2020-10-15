import Component from '../components/components';
import '@testing-library/jest-dom';

describe('return component', () => {
  test('should return a h1 with text booo', () => {
    const props = { elem: 'h1', className: 'app__title', children: 'booo' };
    const elem = document.createElement('h1');
    elem.classList.add('app__title');
    elem.textContent = 'booo';

    expect(Component(props)).toEqual(elem);
  });

  test('should return a p with text description', () => {
    const props = {
      elem: 'p',
      className: 'description',
      children: 'lorem ipsum',
    };
    const elem = document.createElement('p');
    elem.classList.add('description');
    elem.textContent = 'lorem ipsum';

    expect(Component(props)).toEqual(elem);
  });
});
