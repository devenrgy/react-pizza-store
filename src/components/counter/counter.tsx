import styles from './counter.module.scss';

interface CounterProps {
  value: number;
}

export default function Counter({ value }: CounterProps) {
  return (
    <div className={styles.counter} data-name={'counter'}>
      {value}
    </div>
  );
}