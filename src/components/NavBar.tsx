import { Layout, Menu, Row } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../router';

const NavBar: FC = () => {
  const router = useNavigate();
  const {isAuth, user} = useTypedSelector(state => state.auth);
  const {logout} = useActions();

  return (
    <Layout.Header>
      <Row justify='end'>
        {isAuth
          ?
          <>
            <div className='username'>{user.username}</div>
            <Menu theme='dark' mode='horizontal'>
              <Menu.Item onClick={() => logout()} key={1}>LOG OUT</Menu.Item>
            </Menu>
          </>
          :
          <Menu theme='dark' mode='horizontal' selectable={false}>
            <Menu.Item onClick={() => router(RouteNames.LOGIN)} key={1}>LOG IN</Menu.Item>
          </Menu>
        }
      </Row>
    </Layout.Header>
  );
};

export default NavBar;
