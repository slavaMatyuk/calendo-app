import { Button, Form, Input } from 'antd';
import React, { FC, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { rules } from '../utils/rules';

const LoginForm: FC = () => {
  const {error, isLoading} = useTypedSelector(state => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useActions();

  const onSubmit = () => {
    login(username, password);
  };

  return (
    <Form onFinish={onSubmit}>
      {error && <div className='error'>{error}</div>}
      <Form.Item label='Username' name='username' rules={[rules.required('Please, input your name!')]}>
        <Input value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item label='Password' name='password' rules={[rules.required('Please, enter password!')]}>
        <Input value={password} onChange={e => setPassword(e.target.value)} type={'password'} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Enter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;