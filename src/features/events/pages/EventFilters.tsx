import { Button, Card, Form } from 'react-bootstrap';
import { labels, PAGE } from '../../constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mainGreen, mainGreenHovered } from '../../colors';

const CreateButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 1em 1em;
  width: 100%;
  margin-bottom: 1em;

  background: ${mainGreen};
  font-family: 'Circular Std', serif;
  font-weight: bolder;
  font-size: large;
  color: white;

  :hover {
    background-color: ${mainGreenHovered};
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  height: auto;
`;

const FilterTitle = styled.h2`
  font-family: 'Circular Std', serif;
  font-weight: normal;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Checkbox = styled.input`
  padding: 1px;
`;

const BodyText = styled.span`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  font-size: medium;
`;

const EventFilters = () => {
  const navigate = useNavigate();
  const createEvent = () => {
    navigate(`../${PAGE.CREATE_EVENT}`);
  };

  return (
    <>
      <CreateButton onClick={createEvent}>{labels.event.create}</CreateButton>
      <FilterContainer>
        <FilterTitle>{labels.common.filters}</FilterTitle>
        <Row>
          <BodyText>{labels.event.onlyMy}</BodyText>
          <Checkbox type="checkbox" />
        </Row>
      </FilterContainer>
    </>
  );
};

export default EventFilters;
