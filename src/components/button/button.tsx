import styles from './button.module.scss';
import cn from 'lib/utils';

import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'large' | 'small',
  type?: 'outline' | 'primary' | 'accent',
  children: ReactNode
}

export default function Button({ variant, type = 'primary', children }: ButtonProps) {
  return (
    <button className={cn(styles.button, variant && styles[variant], styles[type])}>
      {children}
    </button>
  );
}

