import CSS from 'csstype';

export const navbarStyle: CSS.Properties = {
  width: '80%',
};

export const linkContainer: CSS.Properties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

export const justifySpace: CSS.Properties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

export const linkStyle: CSS.Properties = {
  textDecoration: 'none',
  color: 'black',
  paddingRight: '0.4rem',
  paddingLeft: '0.4rem',
};

export const linkStyleRed: CSS.Properties = {
  textDecoration: 'none',
  color: 'red',
  paddingRight: '0.4rem',
  paddingLeft: '0.4rem',
};

export const alignLeft: CSS.Properties = {
  display: 'flex',
  alignSelf: 'start',
};

export const alignRight: CSS.Properties = {
  display: 'flex',
  alignSelf: 'end',
};

export const flexColumnStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  marginTop: '0.5rem',
};

export const margin: CSS.Properties = {
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
};

export const marginTop: CSS.Properties = {
  marginTop: '0.5rem',
};
