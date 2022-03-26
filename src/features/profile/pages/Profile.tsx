import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { labels } from '../../constants';
import { getUserRoleTitle } from '../../utils';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.profile);

  return (
    <Container className="mt-3">
      <h1>
        <span>{user?.username}</span>
      </h1>
      <hr />
      <Row>
        <Col sm={4}>
          <Image src={user?.imageUrl} width="100%" />
          <Button className="mt-2 w-100" variant="light">
            {labels.profile.updateImage}
          </Button>
        </Col>
        <Col sm={8}>
          {`${labels.profile.role}: ${getUserRoleTitle(user?.role ?? 1)}`}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
