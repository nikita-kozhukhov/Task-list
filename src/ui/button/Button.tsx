import classNames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({
  label,
  onClick,
  variant,
  className,
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const classes = classNames(styles['button'], className, {
    [styles['button--primary']]: variant === 'primary',
    [styles['button--secondary']]: variant === 'secondary',
    [styles['button--disabled']]: disabled,
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
