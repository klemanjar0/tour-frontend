import debounce from 'lodash/debounce';
import { useCallback } from 'react';

interface Props {
  onChange: (...args: any) => any | void;
  delay?: number;
  deps?: Array<any>;
}

const useDebouncedOnChange = (props: Props) => {
  const { onChange, delay = 500, deps } = props;
  const debounced = useCallback(
    debounce(onChange, delay, { leading: false, trailing: true }),
    [onChange, deps],
  );
  return [debounced, debounced.flush];
};

export default useDebouncedOnChange;
