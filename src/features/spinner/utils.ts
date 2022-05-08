import some from 'lodash/some';
import { RootState } from '../store';

export const showSpinner = (state: RootState): boolean => {
  return some(
    [state.spinner.globalSpinner, state.balance.state.increasing],
    Boolean,
  );
};
