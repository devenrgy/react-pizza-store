import styles from './button.module.scss';
import cn from 'lib/utils';

import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'large' | 'middle' | 'small',
  type?: 'outline' | 'primary' | 'accent',
  children: ReactNode
}

export default function Button({ variant = 'middle', type = 'primary', children }: ButtonProps) {
  return (
    <button className={cn(styles.button, styles[variant], styles[type])}>
      {children}
    </button>
  );
}

