import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Image, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { labels, notifications } from '../../constants';
import { useAppDispatch } from '../../store/hooks';
import {
  clearPasswordChangeError,
  passwordChangeRequest,
} from '../../auth/slice';
import { margin } from '../../styles';
import { useNotifications } from '../../notifications/NotificationService';
import useComponentDidUpdate from '../../utils/hooks';
import LiqPayForm from '../../liqpay/widget/LiqPayForm';
import styled from 'styled-components';
import {
  StyledButton,
  StyledErrorText,
  StyledText,
  StyledTextInput,
  StyledTitle,
} from '../../components/common/styledComponents';
import { sunsetOrange } from '../../colors';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem 4rem;

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 0.5rem 1rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.3;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  gap: 0.3rem;
`;

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
  const closeModal = () => {
    setShowModal(false);
    dispatch(clearPasswordChangeError());
  };

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
      <Container>
        <LeftColumn>
          <StyledTitle>{user?.username}</StyledTitle>
          <Image src={user?.imageUrl} width="100%" />
          <ButtonBlock>
            <StyledButton onClick={updateImage} block>
              {labels.profile.updateImage}
            </StyledButton>
            <StyledButton onClick={openModal} block>
              {labels.profile.updatePassword}
            </StyledButton>
          </ButtonBlock>
        </LeftColumn>
        <RightColumn>
          <LiqPayForm />
        </RightColumn>
      </Container>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{labels.profile.updatePassword}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <StyledText>Old Password</StyledText>
              <StyledTextInput
                value={data.oldPassword}
                onChange={handleInput('oldPassword')}
                type="password"
                placeholder="Old Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <StyledText>New Password</StyledText>
              <StyledTextInput
                value={data.newPassword}
                onChange={handleInput('newPassword')}
                type="password"
                placeholder="New Password"
              />
            </Form.Group>
          </Form>
          {!!error && (
            <StyledErrorText style={margin} color={sunsetOrange}>
              {error}
            </StyledErrorText>
          )}
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={closeModal}>
            <StyledText color={sunsetOrange}>{labels.common.cancel}</StyledText>
          </StyledButton>
          <StyledButton disabled={fetching} onClick={onSubmit}>
            {labels.common.save}
            {fetching && (
              <Spinner className="ml-1" size="sm" animation="grow" />
            )}
          </StyledButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
