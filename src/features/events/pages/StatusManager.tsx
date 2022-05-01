import React from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EventStatuses } from '../types';
import { FaLaughBeam, FaMehBlank } from 'react-icons/fa';
import { useAppDispatch } from '../../store/hooks';
import { updateStatusRequest } from '../slice';

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
        icon: <FaLaughBeam {...iconProps} />,
      };
    }
    case EventStatuses.REGISTRATION_PENDING: {
      return {
        progress: 32,
        title: 'Preparing for event, still not enough members to start',
        icon: <FaLaughBeam {...iconProps} />,
      };
    }
    case EventStatuses.REGISTRATION_CLOSED: {
      return {
        progress: 64,
        title: 'Registration closed. Waiting event to get started',
        icon: <FaLaughBeam {...iconProps} />,
      };
    }
    case EventStatuses.ACTIVE: {
      return {
        progress: 80,
        title: 'Event is active',
        icon: <FaLaughBeam {...iconProps} />,
      };
    }
    case EventStatuses.FINISHED: {
      return {
        progress: 100,
        title: 'Event has been finished. Wait winner to be chosen',
        icon: <FaLaughBeam {...iconProps} />,
      };
    }
    case EventStatuses.CLOSED: {
      return {
        progress: 100,
        title: 'Event has been finished and closed',
        icon: <FaLaughBeam {...iconProps} />,
      };
    }
    default: {
      return {
        progress: 0,
        title: 'Loading...',
        icon: <FaMehBlank {...iconProps} />,
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
      };
    }
    case EventStatuses.REGISTRATION_PENDING: {
      return {
        title: 'Close registration',
        nextStatus: EventStatuses.REGISTRATION_CLOSED,
      };
    }
    case EventStatuses.REGISTRATION_CLOSED: {
      return {
        title: 'Start event',
        nextStatus: EventStatuses.ACTIVE,
      };
    }
    case EventStatuses.ACTIVE: {
      return {
        title: 'Finish event',
        nextStatus: EventStatuses.FINISHED,
      };
    }
    case EventStatuses.FINISHED: {
      return {
        title: 'Close event',
        nextStatus: EventStatuses.CLOSED,
      };
    }
    case EventStatuses.CLOSED: {
      return {
        title: 'Event has been closed.',
        nextStatus: EventStatuses.CLOSED,
      };
    }
    default: {
      return {
        title: 'Loading...',
        nextStatus: EventStatuses.CREATED,
      };
    }
  }
};

interface Props {
  isAdmin: boolean;
  disabled: boolean;
}

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
        <ProgressBar variant="success" now={progress} />
        <div className="d-flex flex-row align-items-center mt-2">
          <span className="pe-1 fw-bold">{title}</span>
          {icon}
        </div>
      </div>
    );
  };

  const renderStatusChangeButton = () => {
    const { title, nextStatus } = getNextStatus(status);
    if (!isAdmin) return null;
    return (
      <Button
        onClick={updateStatus(nextStatus)}
        variant="outline-dark"
        className="w-100"
        disabled={disabled}
      >
        {disabled ? 'Choose winner first, to close event' : title}
      </Button>
    );
  };

  return (
    <div className="p-1">
      <div className="d-flex flex-row align-items-center">
        <h5>Event Progress</h5>
      </div>
      {renderStatus()}
      <div className="w-100 mt-2">{renderStatusChangeButton()}</div>
    </div>
  );
};

export default StatusManager;
