import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import cn from 'lib/utils';

interface Props
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  icon?: ReactNode;
  counter?: number;
  size?: 'large' | 'medium' | 'small';
  variant?: 'outline' | 'primary' | 'accent';
}

export default function Button({
  icon,
  size = 'medium',
  variant = 'primary',
  children,
  className,
  counter,
  onClick,
}: Props) {
  const options = {
    size: {
      small: '',
      medium: 'py-3 px-4',
      large: 'min-w-[140px] py-4 px-7',
    },
    variant: {
      outline:
        'border-2 border-red-900 text-red-900 lg:hover:text-white lg:hover:bg-red-900 active:bg-red-900 active:text-white',
      primary: 'bg-red-900 lg:hover:bg-red-800 active:bg-red-800',
      accent: 'bg-neutral-800 lg:hover:bg-neutral-700 active:bg-neutral-700',
    },
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex items-center justify-center gap-2 rounded-full p-1 font-bold leading-normal duration-300',
        options.size[size],
        options.variant[variant],
        className
      )}
    >
      {icon}
      {children}
      {!!counter && (
        <div
          className={cn(
            'flex aspect-square min-h-3 items-center justify-center rounded-full bg-red-900 p-2 text-xs font-bold text-white duration-300 group-active:bg-white group-active:text-red-800 lg:group-hover:bg-white lg:group-hover:text-red-800'
          )}
        >
          {counter}
        </div>
      )}
    </button>
  );
}
