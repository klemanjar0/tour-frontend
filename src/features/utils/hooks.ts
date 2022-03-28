import { useEffect, useRef } from 'react';

type Callback = () => void;

const useComponentDidUpdate = (callback: Callback, deps?: any[]) => {
  const ref = useRef({ isComponentDidMount: true });

  useEffect(() => {
    if (ref.current.isComponentDidMount) {
      ref.current.isComponentDidMount = false;
    } else {
      callback();
    }
  }, deps);
};

export default useComponentDidUpdate;
