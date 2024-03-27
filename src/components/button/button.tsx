import styles from './button.module.scss';
import cn from 'lib/utils';

import { ReactEventHandler, ReactNode } from 'react';

interface ButtonProps {
  variant?: 'large' | 'small',
  type?: 'outline' | 'primary' | 'accent',
  children: ReactNode,
  onClick: ReactEventHandler
}

export default function Button({ variant, type = 'primary', children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={cn(styles.button, variant && styles[variant], styles[type])}>
      {children}
    </button>
  );
}

