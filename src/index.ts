import './styles';

import Component from './components/components';

function createTitle(text: string) {
  const app = document.querySelector('.app') as HTMLElement;
  const props = { elem: 'h1', className: 'app__title', children: text };
  const title = Component(props);

  app.append(title);
}

// createTitle('Todo app!');
