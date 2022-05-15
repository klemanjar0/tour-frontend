import { labels, PAGE } from '../../constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mainGreen } from '../../colors';
import { EventFilterName } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { myEventRequest, setEventFilters } from '../slice';
import useComponentDidUpdate from '../../utils/hooks';
import {
  StyledRangeInput,
  StyledSubTitle,
} from '../../components/common/styledComponents';
import useDebouncedOnChange from '../../utils/useDebouncedOnChange';

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

  transition: 0.3s ease-in-out;

  :hover {
    transition: 0.3s ease-in-out;
    background-color: rgba(100, 100, 100, 0.2);
    color: ${mainGreen};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;

  gap: 1rem;
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
  width: 100%;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
  const dispatch = useDispatch();

  const filterState = useSelector((state: RootState) => state.events.filters);
  const maxValue = useSelector(
    (state: RootState) => state.events.maxEventPrize,
  );

  const [debouncedDispatch] = useDebouncedOnChange({ onChange: dispatch });

  useComponentDidUpdate(() => {
    debouncedDispatch(myEventRequest());
  }, [filterState]);

  const onChange = (fieldName: EventFilterName) => (value: any) => {
    dispatch(
      setEventFilters({
        ...filterState,
        [fieldName]: value,
      }),
    );
  };

  const onRangeChange = (fieldName: EventFilterName) => (value: any) => {
    const max =
      fieldName === EventFilterName.prizeMin &&
      (filterState.prizeMax == null || filterState.prizeMax <= value)
        ? {
            prizeMax: Number(value),
          }
        : {};

    const min =
      fieldName === EventFilterName.prizeMax &&
      (filterState.prizeMin == null || filterState.prizeMin >= value)
        ? {
            prizeMin: Number(value),
          }
        : {};

    dispatch(
      setEventFilters({
        ...filterState,
        [fieldName]: Number(value),
        ...max,
        ...min,
      }),
    );
  };

  return (
    <>
      <CreateButton onClick={createEvent}>{labels.event.create}</CreateButton>
      <FilterContainer>
        <FilterTitle>{labels.common.filters}</FilterTitle>
        <Column>
          <StyledSubTitle>Administration</StyledSubTitle>
          <Row>
            <BodyText>{labels.event.onlyMy}</BodyText>
            <Checkbox
              checked={filterState.onlyMy}
              onChange={(event: any) =>
                onChange(EventFilterName.onlyMy)(event.target.checked)
              }
              type="checkbox"
            />
          </Row>
        </Column>
        <Column>
          <Row>
            <StyledSubTitle>Prize</StyledSubTitle>
            <StyledSubTitle color={mainGreen}>
              ${filterState.prizeMin || 0} - ${filterState.prizeMax || 0}
            </StyledSubTitle>
          </Row>
          <BodyText>From</BodyText>
          <StyledRangeInput
            value={filterState.prizeMin || 0}
            onChange={(event: any) =>
              onRangeChange(EventFilterName.prizeMin)(event.target.value)
            }
            min={0}
            max={maxValue || 0}
            step={1}
            type="range"
          />
          <BodyText>To</BodyText>
          <StyledRangeInput
            value={filterState.prizeMax || maxValue || 0}
            onChange={(event: any) =>
              onRangeChange(EventFilterName.prizeMax)(event.target.value)
            }
            min={0}
            max={maxValue || 0}
            step={1}
            type="range"
          />
        </Column>
      </FilterContainer>
    </>
  );
};

export default EventFilters;
