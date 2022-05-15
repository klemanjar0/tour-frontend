import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { myEventRequest, clearEvents } from '../slice';
import { RootState } from '../../store';
import { Spinner, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { centerFlex, spinnerStyle } from '../../auth/pages/styles';
import EventItem from './EventItem';
import { TransformedEvent } from '../types';
import { labels, PAGE } from '../../constants';
import EventFilters from './EventFilters';
import {
  StyledSubTitle,
  StyledSubTitleAccent,
} from '../../components/common/styledComponents';

const MyEventsList = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector((state: RootState) => state.events.fetching);
  const events = useAppSelector((state: RootState) => state.events.myEvents);
  const time = useAppSelector(
    (state: RootState) => state.sync.eventsSyncActionTime,
  );

  const renderItem = (item: TransformedEvent) => {
    return <EventItem event={item} key={`event_card${item.id}`} />;
  };
  const onUnmount = () => {
    dispatch(clearEvents());
  };

  useEffect(() => {
    dispatch(myEventRequest());
    return onUnmount;
  }, [time]);

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col sm={3} className="d-flex flex-column mt-1">
            <EventFilters />
          </Col>
          <Col sm={9}>
            {fetching && (
              <div style={centerFlex}>
                <Spinner
                  className="m-5"
                  style={spinnerStyle}
                  animation="border"
                />
              </div>
            )}
            {!!events.length && !fetching ? (
              <div className="mb-1">{events.map(renderItem)}</div>
            ) : (
              <Container className="mt-1" style={centerFlex}>
                <StyledSubTitle>{labels.event.noEvents}</StyledSubTitle>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyEventsList;
