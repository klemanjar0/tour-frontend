import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { grayColor, mainBlack, mainGreen, paleGray } from '../../colors';
import { IoCloseOutline } from 'react-icons/io5';
import useDebouncedOnChange from '../../utils/useDebouncedOnChange';
import { Overlay, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { StyledText } from '../common/styledComponents';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 18rem;
  border-bottom: 2px solid ${mainGreen};
  z-index: 2;
`;

const Input = styled.input`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  outline: none;
  padding: 0.5em 0.7em;
  border: none;

  ::placeholder:focus {
    color: ${grayColor};
  }
`;

const CrossIconContainer = styled.div`
  align-self: flex-end;
  margin-bottom: 0.4rem;
  padding: 0.2rem;
`;

const Item = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.5em 0.7em;
  background-color: transparent;
  width: 100%;
  
  border-bottom: 1px solid ${paleGray};

  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${mainBlack}

  transition: 0.2s ease-in-out;

  :hover {
    transition: 0.2s ease-in-out;
    background-color: rgba(100, 100, 100, 0.2);
    color: ${mainGreen}
  }
`;

const ResultContainer = styled.div`
  background-color: rgb(233, 233, 233);
  padding: 0.5rem;
  border-radius: 5px;
  width: 100%;
  position: absolute;
  bottom: 40px;
  z-index: 1;
`;

const Layout = styled.div`
  position: relative;
`;

const ScrollableDiv = styled.div`
  overflow-y: scroll;
  height: 5rem;
`;

interface Props {
  items?: string[];
  onTextChange: (value: string) => void;
  onSelectItem: (value: string) => void;
  value: string;
  fetching?: boolean;
  placeholder?: string;
}

const SearchBar = (props: Props) => {
  const { value, onTextChange, items, fetching, placeholder, onSelectItem } =
    props;

  const [searchValue, setSearchValue] = useState(value);
  const [debouncedChange] = useDebouncedOnChange({ onChange: onTextChange });

  const onChange = (event: any) => {
    const data = event.target.value;
    setSearchValue(data);
    debouncedChange(data);
  };

  const onClear = () => {
    setSearchValue('');
    onTextChange('');
  };

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const renderItem = (item: string) => {
    const select = () => {
      onSelectItem(item);
      onTextChange('');
    };

    return (
      <Item onClick={select}>
        <StyledText>{item}</StyledText>
      </Item>
    );
  };

  return (
    <Layout>
      <Container>
        <Input
          value={searchValue}
          onChange={onChange}
          placeholder={placeholder}
        />
        <CrossIconContainer>
          {fetching ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>
              {value && (
                <IoCloseOutline onClick={onClear} size={24} color={grayColor} />
              )}
            </>
          )}
        </CrossIconContainer>
      </Container>
      {items?.length && value.length ? (
        <ResultContainer>
          <ScrollableDiv>{items?.map(renderItem)}</ScrollableDiv>
        </ResultContainer>
      ) : null}
    </Layout>
  );
};

export default SearchBar;
