import { render, screen } from '@testing-library/react';
import { MainHeader } from './MainHeader';

describe('MainHeader', () => {
  test('отображает корректный заголовок', () => {
    render(<MainHeader />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Лист задач'
    );
  });

  test('совпадает с предыдущей версией снапшота', () => {
    const { container } = render(<MainHeader />);
    expect(container).toMatchSnapshot();
  });
});
