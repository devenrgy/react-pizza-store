import { RefObject, useEffect, useRef } from 'react';

function useEventListener(
  eventType: string,
  callback: (e: Event) => void,
  element = document,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

export default function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, cb: (e: Event) => void) {
  useEventListener('click', e => {
    if (ref.current == null || ref?.current.contains(e.target as Node)) return;
    cb(e);
  }, document);
}