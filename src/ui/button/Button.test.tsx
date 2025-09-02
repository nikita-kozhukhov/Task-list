import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('рендерит кнопку с переданным label', () => {
    render(<Button label="кнопка" variant="primary" />);

    expect(screen.getByRole('button', { name: /кнопка/i })).toBeInTheDocument();
  });

  test('присваивает правильный CSS класс для primary', () => {
    render(<Button label="кнопка" variant="primary" />);

    const button = screen.getByRole('button', { name: /кнопка/i });

    expect(button).toHaveClass('button--primary');
  });

  test('присваивает правильный CSS класс для secondary', () => {
    render(<Button label="кнопка" variant="secondary" />);

    const button = screen.getByRole('button', { name: /кнопка/i });

    expect(button).toHaveClass('button--secondary');
  });

  test('вызывает onClick при клике', () => {
    const handleClick = jest.fn();

    render(<Button label="кнопка" variant="primary" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /кнопка/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('добавляет disabled класс и отключает кнопку', () => {
    render(<Button label="кнопка" variant="primary" disabled />);

    const button = screen.getByRole('button', { name: /кнопка/i });

    expect(button).toHaveClass('button--disabled');
    expect(button).toBeDisabled();
  });

  test('можно передать дополнительный класс через className', () => {
    render(<Button label="кнопка" variant="primary" className="my-class" />);

    const button = screen.getByRole('button', { name: /кнопка/i });

    expect(button).toHaveClass('my-class');
  });

  test('устанавливает правильный type', () => {
    render(<Button label="кнопка" variant="primary" type="submit" />);

    const button = screen.getByRole('button', { name: /кнопка/i });

    expect(button).toHaveAttribute('type', 'submit');
  });
});
