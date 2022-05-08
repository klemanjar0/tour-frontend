import React from 'react';
import './App.css';
import styled from 'styled-components';
import { mainBlack, mainGreen, paleGray } from './features/colors';

const Title = styled.h1`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${mainBlack};
`;

const Text = styled.span`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${mainBlack};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0;
  background-color: ${mainBlack};

  .footer-text {
    color: ${mainGreen};
  }
`;

const App = () => {
  return (
    <div className="App">
      <Title className="mt-4">Tour Service</Title>
      <Text>We're here to deliver best of best.</Text>
      <Footer>
        <Text className="footer-text">Klym Kravchenko ©</Text>
      </Footer>
    </div>
  );
};

export default App;
