import React, { useEffect } from 'react';
import { Button, Card, CloseButton, Container } from 'react-bootstrap';
import { useAppDispatch } from '../../store/hooks';
import { clearEventView } from '../slice';
import { useNavigate } from 'react-router-dom';
import { labels, PAGE } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FaChevronLeft } from 'react-icons/fa';
import { EventRoles } from '../types';
import { getEventStatus } from '../utils';

const EventManager = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const event = useSelector((state: RootState) => state.events.eventView);
  const isUserAdminOnEvent = useSelector(
    (state: RootState) =>
      (state.events?.eventView?.myRole || 0) >= EventRoles.OWNER,
  );

  const onBack = () => {
    navigate(`../${PAGE.MY_EVENTS}`);
    dispatch(clearEventView());
  };

  useEffect(() => {
    return onBack;
  }, []);

  const status = getEventStatus(event?.status);
  return (
    <div>
      <Card body className="mt-3">
        <div className="d-flex flex-row align-items-center">
          <Button
            onClick={onBack}
            variant="outline-dark"
            className="d-flex mb-2 flex-row p-1 align-items-center"
          >
            <FaChevronLeft className="mx-1" />
            <span className="mx-1">{labels.common.back}</span>
          </Button>
          <h3 className="mx-3">{event?.title}</h3>
        </div>
        <hr />
        <div>
          <span>Type: {event?.type}</span> <br />
          <span>Country: {event?.country}</span> <br />
          <span>Prize: {event?.prizeFund}$</span> <br />
          <span>Status: {status}</span> <br />
        </div>
        <hr />
        <div>
          <span>Description: {event?.description}</span>
        </div>
      </Card>
    </div>
  );
};

export default EventManager;
