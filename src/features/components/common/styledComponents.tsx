import styled from 'styled-components';
import {
  grayColor,
  mainBlack,
  mainGreen,
  mainWhite,
  paleGray,
  sunsetOrange,
} from '../../colors';

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
  color: ${(props: { color?: string }) => props.color || grayColor};
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

interface ButtonProps {
  color?: string;
  disabled?: boolean;
  block?: boolean;
}

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.5em 0.7em;
  background-color: transparent;
  width: ${({ block }: ButtonProps) => (block ? '100%' : undefined)};
  gap: 12px;

  font-family: 'Circular Std', serif;
  font-weight: normal;
  font-size: larger;
  color: ${({ color, disabled }: ButtonProps) => {
    return disabled ? grayColor : color || mainBlack;
  }}
  transition: 0.3s ease-in-out;
  
  :hover {
    transition: 0.3s ease-in-out;
    background-color: rgba(100, 100, 100, 0.2);
  }

  &:hover {
    color: ${mainGreen}
  }
`;

export const StyledTextInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  margin: 1rem 0;

  background-color: transparent;

  border-bottom: 2px solid ${mainGreen};
  font-family: 'Circular Std', serif;
  font-weight: normal;
  font-size: larger;

  ::placeholder {
    color: ${grayColor};
  }
`;

export const StyledErrorText = styled.span`
  color: ${sunsetOrange};
  font-family: 'Circular Std', serif;
  font-weight: normal;
  font-size: medium;
`;

export const StyledRangeInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  align-items: center;
  transition: background 450ms ease-in;

  width: 100%;
  height: 18px;
  margin: 15px 0;
  border-radius: 16px;
`;
