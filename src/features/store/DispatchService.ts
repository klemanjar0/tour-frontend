import { PayloadAction } from '@reduxjs/toolkit';
import isNull from 'lodash/isNull';
import { AppDispatch } from './index';

class DispatchService {
  private dispatchFn: AppDispatch | null;

  constructor() {
    this.dispatchFn = null;
  }

  setDispatch(fn: AppDispatch) {
    this.dispatchFn = fn;
  }

  dispatch(action: PayloadAction<any>) {
    if (!isNull(this.dispatchFn)) {
      this.dispatchFn(action);
    }
  }
}

export default new DispatchService();
