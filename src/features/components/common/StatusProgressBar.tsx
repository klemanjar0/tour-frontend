import React from 'react';
import styled from 'styled-components';
import { mainGreen, paleGray } from '../../colors';

interface Props {
  value: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 20px;
  background-color: transparent;
  border: 1px solid ${paleGray};
  padding: 1px;
`;

const Bar = styled.div`
  display: flex;
  flex: ${(props: Props) => `${props.value * 0.01}`};
  height: 16px;
  background-color: ${mainGreen};
`;

const StatusProgressBar = (props: Props) => {
  const { value } = props;

  return (
    <Container>
      <Bar value={value} />
    </Container>
  );
};

export default StatusProgressBar;
