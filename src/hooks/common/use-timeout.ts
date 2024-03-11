import { useEffect, useRef } from "react";

type Args = {
  callback: () => void;
  delay: number;
  startOnMount?: boolean;
};
/**
 * A custom hook that sets a timeout for a given callback function.
 *
 * @param {Object} args - An object containing the following properties:
 *   - {Function} callback: The function to be called after the specified delay.
 *   - {number} delay: The delay (in milliseconds) before the callback is invoked.
 *   - {boolean} startOnMount: (optional) Whether the timeout should start immediately when the component mounts.
 * @return {Object} An object containing the following functions:
 *   - {Function} set: Sets a new timeout with the given callback and delay, canceling the previous timeout if any.
 *   - {Function} clear: Cancels the current timeout, if any.
 */
const useTimeout = ({ callback, delay, startOnMount = false }: Args) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clear = () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
  };
  useEffect(() => {
    if (startOnMount) timeoutRef.current = setTimeout(callback, delay);
    return () => clear();
  }, [delay, startOnMount, callback]);
  const set = () => {
    clear();
    timeoutRef.current = setTimeout(callback, delay);
  };
  return { set, clear };
};

export default useTimeout;
