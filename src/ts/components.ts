interface IProps {
  elem: string;
  className: string;
  children: HTMLElement | string;
}

export default function Component(props: IProps): HTMLElement {
  const { elem, className, children } = props;
  const component = document.createElement(elem) as HTMLElement;
  component.classList.add(className);
  component.append(children);

  return component;
}
