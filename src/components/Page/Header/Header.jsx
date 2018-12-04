import React from 'react';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default () => (
  <Header className='header'>
    <div className='logo' />
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key='1'>Home</Menu.Item>
      <Menu.Item key='2'>Notes</Menu.Item>
      <Menu.Item key='3'>Test</Menu.Item>
    </Menu>
  </Header>
);
