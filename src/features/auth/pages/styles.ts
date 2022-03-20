import CSS from 'csstype';
import { greenColor, lightGrayColor } from '../../colors';

export const loginBar: CSS.Properties = {
  height: '5rem',
  width: '100%',
  display: 'flex',
  backgroundColor: lightGrayColor,
  marginTop: '10px',
};

export const loginBarH1: CSS.Properties = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: 'whitesmoke',
  marginLeft: '3rem',
  alignSelf: 'end',
};

export const dividerGreenStyles: CSS.Properties = {
  height: '2px',
  width: '100%',
  backgroundColor: greenColor,
};

export const formContainer: CSS.Properties = {
  margin: '1rem',
};
