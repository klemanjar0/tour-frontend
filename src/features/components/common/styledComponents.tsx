import styled from 'styled-components';
import { grayColor, mainBlack } from '../../colors';

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledTitle = styled.h2`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${mainBlack};
`;

export const StyledSubTitle = styled.h4`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${grayColor};
`;

export const StyledText = styled.span`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${mainBlack};
  font-size: ${(props: { size?: string }) => props.size || 'normal'};
`;

export const StyledScrollableDiv = styled.div`
  overflow-y: scroll;
  height: 22rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;
