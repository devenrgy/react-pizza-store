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
      large: 'min-w-[200px] py-4 px-7',
    },
    variant: {
      outline:
        'border-2 border-red-900 text-red-900 hover:text-white hover:bg-red-900',
      primary: 'bg-red-900 hover:bg-red-800',
      accent: 'bg-neutral-800 hover:bg-neutral-700',
    },
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex items-center justify-center gap-2 rounded-full p-1 font-bold leading-normal transition-colors duration-300',
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
            'flex aspect-square min-h-3 items-center justify-center rounded-full bg-red-900 p-2 text-xs font-bold text-white duration-300 group-hover:bg-white group-hover:text-red-800'
          )}
        >
          {counter}
        </div>
      )}
    </button>
  );
}
