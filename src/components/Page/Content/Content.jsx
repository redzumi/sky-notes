import React from 'react';

import { Layout, Breadcrumb } from 'antd';

import styles from './styles.css';

const { Content } = Layout;

// eslint-disable-next-line
export default ({ children }) => (
  <Content className={styles.content} style={{ padding: '0 50px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
    </Breadcrumb>
    <Layout style={{ padding: '24px 0', background: '#fff' }}>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        {children}
      </Content>
    </Layout>
  </Content>
);
