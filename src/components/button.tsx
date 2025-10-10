import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode | string;
  className?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  className,
  type = 'button',
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-[10px] font-medium text-[14px] leading-[1.42] rounded-xl bg-[#006fee] w-full transition-all duration-300 ease-in-out 
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed active:scale-100'
            : 'cursor-pointer active:scale-[0.95] hover:bg-[#007bff]'
        } 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
