import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EventStatuses } from '../types';
import {
  IoCheckmark,
  IoChevronBack,
  IoChevronForward,
  IoDesktop,
  IoHourglass,
  IoPersonAdd,
  IoTimeOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import { useAppDispatch } from '../../store/hooks';
import { updateStatusRequest } from '../slice';
import styled from 'styled-components';
import { grayColor, mainBlack, mainGreen } from '../../colors';
import StatusProgressBar from '../../components/common/StatusProgressBar';
import { StyledRow } from '../../components/common/styledComponents';

const iconProps = {
  style: { margin: 1 },
  size: 20,
};

const getStatus = (status: EventStatuses) => {
  switch (status) {
    case EventStatuses.CREATED: {
      return {
        progress: 16,
        title: 'Event has been created, and ready to meet new members',
        icon: <IoCheckmark {...iconProps} />,
      };
    }
    case EventStatuses.REGISTRATION_PENDING: {
      return {
        progress: 32,
        title: 'Preparing for event, still not enough members to start',
        icon: <IoPersonAdd {...iconProps} />,
      };
    }
    case EventStatuses.REGISTRATION_CLOSED: {
      return {
        progress: 64,
        title: 'Registration closed. Waiting event to get started',
        icon: <IoTimeOutline {...iconProps} />,
      };
    }
    case EventStatuses.ACTIVE: {
      return {
        progress: 80,
        title: 'Event is active',
        icon: <IoDesktop {...iconProps} />,
      };
    }
    case EventStatuses.FINISHED: {
      return {
        progress: 100,
        title: 'Event has been finished. Wait winner to be chosen',
        icon: <IoHourglass {...iconProps} />,
      };
    }
    case EventStatuses.CLOSED: {
      return {
        progress: 100,
        title: 'Event has been finished and closed',
        icon: <IoTrophyOutline {...iconProps} />,
      };
    }
    default: {
      return {
        progress: 0,
        title: 'Loading...',
        icon: <IoHourglass {...iconProps} />,
      };
    }
  }
};

const getNextStatus = (status: EventStatuses) => {
  switch (status) {
    case EventStatuses.CREATED: {
      return {
        title: 'Open to invite',
        nextStatus: EventStatuses.REGISTRATION_PENDING,
        prevStatus: EventStatuses.CREATED,
      };
    }
    case EventStatuses.REGISTRATION_PENDING: {
      return {
        title: 'Close registration',
        nextStatus: EventStatuses.REGISTRATION_CLOSED,
        prevStatus: EventStatuses.CREATED,
      };
    }
    case EventStatuses.REGISTRATION_CLOSED: {
      return {
        title: 'Start event',
        nextStatus: EventStatuses.ACTIVE,
        prevStatus: EventStatuses.REGISTRATION_PENDING,
      };
    }
    case EventStatuses.ACTIVE: {
      return {
        title: 'Finish event',
        nextStatus: EventStatuses.FINISHED,
        prevStatus: EventStatuses.REGISTRATION_CLOSED,
      };
    }
    case EventStatuses.FINISHED: {
      return {
        title: 'Close event',
        nextStatus: EventStatuses.CLOSED,
        prevStatus: EventStatuses.ACTIVE,
      };
    }
    case EventStatuses.CLOSED: {
      return {
        title: 'Event has been closed',
        nextStatus: EventStatuses.CLOSED,
        prevStatus: EventStatuses.CLOSED,
      };
    }
    default: {
      return {
        title: 'Loading...',
        nextStatus: EventStatuses.CREATED,
        prevStatus: EventStatuses.CREATED,
      };
    }
  }
};

interface Props {
  isAdmin: boolean;
  disabled: boolean;
}

const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SubTitle = styled.h4`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${grayColor};
`;

const Text = styled.span`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${(props: { color?: string }) => props.color || mainBlack};
`;

const StatusButton = styled.button`
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
  color: ${(props: { color?: string }) => props.color || mainBlack}

  transition: 0.2s ease-in-out;
  
  :hover {
    transition: 0.2s ease-in-out;
    background-color: rgba(100, 100, 100, 0.2);
    color: ${mainGreen}
  }
  
  :disabled {
    color: ${grayColor}
  }
`;

const StatusManager: React.FC<Props> = (props) => {
  const { isAdmin, disabled } = props;
  const dispatch = useAppDispatch();

  const status = useSelector<RootState>(
    (state) => state.events.eventView.data?.status,
  ) as EventStatuses;

  const updateStatus = (status: EventStatuses) => () => {
    dispatch(updateStatusRequest(status));
  };

  const renderStatus = () => {
    const { progress, icon, title } = getStatus(status);
    return (
      <div>
        <StatusProgressBar value={progress} />
        <div className="d-flex flex-row align-items-center mt-2">
          <Text className="pe-1 fw-bold">{title}</Text>
          {icon}
        </div>
      </div>
    );
  };

  const renderStatusChangeButton = () => {
    const { title, nextStatus, prevStatus } = getNextStatus(status);
    if (!isAdmin) return null;
    return (
      <StyledRow>
        {status === EventStatuses.REGISTRATION_CLOSED && (
          <StatusButton onClick={updateStatus(prevStatus)}>
            <IoChevronBack />
            Back to registration
          </StatusButton>
        )}
        <StatusButton onClick={updateStatus(nextStatus)} disabled={disabled}>
          {disabled ? 'Choose winner first, to close event' : title}
          <IoChevronForward />
        </StatusButton>
      </StyledRow>
    );
  };

  return (
    <Container>
      <Container className="d-flex flex-row justify-content-between align-items-center">
        <SubTitle>Event Progress</SubTitle>
        {renderStatusChangeButton()}
      </Container>
      {renderStatus()}
    </Container>
  );
};

export default StatusManager;
