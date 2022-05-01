import CSS from 'csstype';
import { greenColor, lightGrayColor } from '../../colors';

export const dividerGreenStyles: CSS.Properties = {
  height: '2px',
  width: '100%',
  backgroundColor: greenColor,
};

export const formContainer: CSS.Properties = {
  margin: '1rem',
};

export const spinnerStyle: CSS.Properties = {
  marginRight: '0.5rem',
  marginLeft: '0.5rem',
};

export const centerFlex: CSS.Properties = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
