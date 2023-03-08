import { MouseEventHandler, PropsWithChildren } from 'react';

type Props = {
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FunctionComponent<PropsWithChildren<Props>> = ({
  disabled,
  className,
  type = 'button',
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${disabled ? 'cursor-not-allowed' : ''}`}>
      {children}
    </button>
  );
};
