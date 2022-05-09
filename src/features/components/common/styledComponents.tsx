import styled from 'styled-components';
import { grayColor, mainBlack, mainGreen } from '../../colors';

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledRowSpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const StyledTitle = styled.h2`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${mainBlack};
`;

export const StyledSubTitleAccent = styled.h3`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${mainBlack};
`;

export const StyledSubTitle = styled.h4`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${grayColor};
`;

interface IStyledText {
  size?: string;
  color?: string;
}
export const StyledText = styled.span`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${(props: IStyledText) => props.color || mainBlack};
  font-size: ${(props: IStyledText) => props.size || 'normal'};
`;

export const StyledScrollableDiv = styled.div`
  overflow-y: scroll;
  height: 22rem;

  ::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.5em 0.7em;
  background-color: transparent;

  font-family: 'Circular Std', serif;
  font-weight: normal;
  font-size: larger;
  color: ${({ color, disabled }: { color?: string; disabled?: boolean }) => {
    return disabled ? grayColor : color || mainBlack;
  }}
  transition: 0.2s ease-in-out;
  
  :hover {
    transition: 0.2s ease-in-out;
    background-color: rgba(100, 100, 100, 0.2);
    color: ${mainGreen}
  }
`;
