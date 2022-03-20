import CSS from 'csstype';

export const navbarStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '80%',
};

export const linkStyle: CSS.Properties = {
  textDecoration: 'none',
  fontFamily: 'sans-serif',
  color: 'black',
  padding: '0.5rem',
};

export const alignRight: CSS.Properties = {
  display: 'flex',
  alignSelf: 'end',
};

export const flexColumnStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
};

export const margin: CSS.Properties = {
  margin: '0.5rem',
};
