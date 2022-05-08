import React from 'react';
import { EventStatuses, TransformedEvent } from '../types';
import { labels, PAGE } from '../../constants';
import { getEventStatus } from '../utils';
import { useAppDispatch } from '../../store/hooks';
import { getEventRequest } from '../slice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mainBlack, mainGreen, mainWhite, paleGray } from '../../colors';
import { IoSettingsOutline } from 'react-icons/io5';

interface Props {
  event: TransformedEvent;
}

const CardContainer = styled.div`
  border-left: 1px solid ${paleGray};
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8em;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2em;
`;

const CardTitle = styled.h2`
  font-family: 'Circular Std', serif;
  font-weight: bold;
  text-decoration: ${(props: { finished: boolean }) =>
    props.finished ? 'line-through black' : 'none'};
`;
const CardSubtitle = styled.h5`
  font-family: 'Circular Std', serif;
  font-weight: bolder;
  color: gray;
`;
const CardDescription = styled.span`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${mainBlack};
  margin-bottom: 0.8rem;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PrizeTitle = styled.h3`
  font-family: 'Circular Std', serif;
  font-weight: bold;
  color: ${mainGreen};
  margin-top: 0.3rem;
`;

const DetailsButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 1em 1em;

  background: transparent;
  font-family: 'Circular Std', serif;
  font-weight: bolder;
  color: ${mainBlack};

  text-align: center;
  outline: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  border-bottom: 2px solid ${mainGreen};

  :hover {
    color: ${mainGreen};
  }

  :active {
    border-bottom: 2px solid ${mainWhite};
  }
`;

const EventItem: React.FC<Props> = (props) => {
  const { event } = props;
  const status = getEventStatus(event.status);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setEventView = () => {
    dispatch(getEventRequest(event.id));
    navigate(`../${PAGE.MANAGE_EVENT}`);
  };

  return (
    <CardContainer>
      <Header>
        <CardTitle finished={event.status >= EventStatuses.FINISHED}>
          {event.title}
        </CardTitle>
        <CardSubtitle>{status}</CardSubtitle>
      </Header>
      <CardDescription>{event.description}</CardDescription>
      <Footer>
        <PrizeTitle>{`$${event.prizeFund}`}</PrizeTitle>
        <DetailsButton onClick={setEventView}>
          {labels.event.manage}
          <IoSettingsOutline
            className="iconSettings"
            size={24}
            style={{ marginLeft: 18 }}
            color={mainGreen}
          />
        </DetailsButton>
      </Footer>
    </CardContainer>
  );
};

export default EventItem;
