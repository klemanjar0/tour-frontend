import React, { ReactChildren, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { showSpinner } from '../utils';
import { RootState } from '../../store';
import { spinnerStyle } from '../../auth/pages/styles';
import { Spinner } from 'react-bootstrap';

interface Props {
  children: ReactElement | ReactElement[];
}

const GlobalSpinner: React.FC<Props> = (props) => {
  const show = useSelector<RootState>(showSpinner);
  const { children } = props;

  return show ? (
    <>
      <div>{children}</div>
      <div
        style={{
          backgroundColor: 'rgba(100, 100, 100, 0.8)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <Spinner
        style={{ position: 'absolute', top: '50%', left: '50%' }}
        animation="border"
      />
    </>
  ) : (
    <div>{children}</div>
  );
};

export default GlobalSpinner;
