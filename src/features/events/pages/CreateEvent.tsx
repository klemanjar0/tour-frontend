import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { labels, PAGE } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { IEvent } from '../types';
import { useAppDispatch } from '../../store/hooks';
import { createEventRequest } from '../slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useComponentDidUpdate from '../../utils/hooks';

const initialState: Partial<IEvent> = {
  title: '',
  type: '',
  description: '',
  country: '',
  prizeFund: 0,
  twitchUrl: '',
};

const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const syncTime = useSelector(
    (state: RootState) => state.sync.eventsSyncActionTime,
  );

  const [data, setData] = useState(initialState);

  const onBack = () => {
    navigate(`../${PAGE.MY_EVENTS}`);
  };

  const onChange = (fieldName: keyof IEvent) => (event: any) => {
    setData({
      ...data,
      [fieldName]: event.target.value,
    });
  };

  const onSubmit = () => {
    const payload = data as IEvent;
    dispatch(createEventRequest(payload));
  };

  useComponentDidUpdate(() => {
    onBack();
  }, [syncTime]);

  return (
    <div className="d-flex w-100 align-items-center">
      <Container className="mt-3 w-100">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <Button
            onClick={onBack}
            variant="outline-dark"
            className="d-flex mb-2 flex-row p-1 align-items-center"
          >
            <FaChevronLeft className="mx-1" />
            <span className="mx-1">{labels.common.back}</span>
          </Button>
          <Button
            onClick={onSubmit}
            variant="success"
            className="d-flex mb-2 flex-row p-1 align-items-center"
          >
            <FaCheck className="mx-1" />
            <span className="mx-1">{labels.common.save}</span>
          </Button>
        </div>
        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={data.title}
              onChange={onChange('title')}
              type="text"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              value={data.type}
              onChange={onChange('type')}
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={data.description}
              onChange={onChange('description')}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={data.country}
              onChange={onChange('country')}
              type="text"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Prize</Form.Label>
            <Form.Control
              value={data.prizeFund}
              onChange={onChange('prizeFund')}
              type="number"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Twitch URL</Form.Label>
            <Form.Control
              value={data.twitchUrl}
              onChange={onChange('twitchUrl')}
              type="text"
              placeholder=""
            />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default CreateEvent;
