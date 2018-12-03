import React from 'react';

import { Layout } from 'antd';

import Header from '../Page/Header';
import Content from '../Page/Content';
import Footer from '../Page/Footer';

import NotesManager from '../Notes/NotesManager';

const Home = () => (
  <Layout>
    <Header />
    <Content>
      <NotesManager />
    </Content>
    <Footer />
  </Layout>
);

export default Home;
