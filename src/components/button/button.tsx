import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import cn from 'lib/utils';

import styles from './button.module.scss';

interface Props extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  icon?: ReactNode,
  counter?: number,
  size?: 'large' | 'medium' | 'small',
  variant?: 'outline' | 'primary' | 'accent',
}

export default function Button({
                                 icon,
                                 size = 'medium',
                                 variant = 'primary',
                                 children,
                                 counter,
                                 onClick,
                               }: Props) {
  return (
    <button onClick={onClick} className={cn(styles.button, styles[size], styles[variant])}>
      {icon}
      {children}
      {!!counter && <div className={styles.counter}>
        {counter}
      </div>}
    </button>
  );
}

