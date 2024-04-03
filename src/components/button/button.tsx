import { ReactEventHandler, ReactNode } from 'react';

import cn from 'lib/utils';

import styles from './button.module.scss';

interface ButtonProps {
  variant?: 'large' | 'medium' | 'small',
  type?: 'outline' | 'primary' | 'accent',
  children: ReactNode,
  onClick?: ReactEventHandler
}

export default function Button({ variant = 'medium', type = 'primary', children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={cn(styles.button, variant && styles[variant], styles[type])}>
      {children}
    </button>
  );
}

