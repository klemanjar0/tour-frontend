import { Button, Card, Form } from 'react-bootstrap';
import { labels, PAGE } from '../../constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventFilters = () => {
  const navigate = useNavigate();
  const createEvent = () => {
    navigate(`../${PAGE.CREATE_EVENT}`);
  };

  return (
    <>
      <Button onClick={createEvent} className="w-100 mb-2">
        {labels.event.create}
      </Button>
      <Card className="w-100 h-auto" body>
        <h2>{labels.common.filters}</h2>
        <hr />
        <Form>
          <Form.Check
            type="checkbox"
            id={`default-checkbox`}
            label={labels.event.onlyMy}
          />
        </Form>
      </Card>
    </>
  );
};

export default EventFilters;
