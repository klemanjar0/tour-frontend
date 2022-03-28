import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
  Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { labels, notifications } from '../../constants';
import { getUserRoleTitle } from '../../utils';
import { useAppDispatch } from '../../store/hooks';
import { passwordChangeRequest } from '../../auth/slice';
import { margin } from '../../styles';
import moment from 'moment/moment';
import { useNotifications } from '../../notifications/NotificationService';
import useComponentDidUpdate from '../../utils/hooks';

const initialDataState = {
  oldPassword: '',
  newPassword: '',
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const notify = useNotifications();

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(initialDataState);
  const user = useSelector((state: RootState) => state.auth.profile);
  const fetching = useSelector((state: RootState) => state.auth.fetching);
  const error = useSelector((state: RootState) => state.auth.error);

  const profileSyncActionTime = useSelector(
    (state: RootState) => state.sync.profileSyncActionTime,
  );

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleInput = (fieldName: string) => (event: any) =>
    setData({
      ...data,
      [fieldName]: event.target.value,
    });

  const updateImage = () => {
    notify.showNotification(notifications.featureLocked(Date.now()));
  };

  const onSubmit = () => {
    dispatch(passwordChangeRequest(data));
  };

  useComponentDidUpdate(() => {
    setData(initialDataState);
    closeModal();
    notify.showNotification(notifications.passwordChanged(Date.now()));
  }, [profileSyncActionTime]);

  return (
    <>
      <Container className="mt-3">
        <h1>
          <span>{user?.username}</span>
        </h1>
        <hr />
        <Row>
          <Col sm={4}>
            <Image src={user?.imageUrl} width="100%" />
            <Button
              onClick={updateImage}
              className="mt-2 w-100"
              variant="light"
            >
              {labels.profile.updateImage}
            </Button>
            <Button onClick={openModal} className="mt-2 w-100" variant="light">
              {labels.profile.updatePassword}
            </Button>
          </Col>
          <Col sm={8}>
            {`${labels.profile.role}: ${getUserRoleTitle(user?.role ?? 1)}`}
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{labels.profile.updatePassword}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                value={data.oldPassword}
                onChange={handleInput('oldPassword')}
                type="password"
                placeholder="Old Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                value={data.newPassword}
                onChange={handleInput('newPassword')}
                type="password"
                placeholder="New Password"
              />
            </Form.Group>
          </Form>
          {!!error && (
            <Form.Text style={margin} className="text-danger">
              {error}
            </Form.Text>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            {labels.common.cancel}
          </Button>
          <Button
            variant="primary"
            className="flex-row align-items-center justify-content-between"
            disabled={fetching}
            onClick={onSubmit}
          >
            {labels.common.save}
            {fetching && (
              <Spinner className="ml-1" size="sm" animation="grow" />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
