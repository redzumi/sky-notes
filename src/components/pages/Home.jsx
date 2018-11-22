import React from 'react';

import NotesManager from '../Notes/NotesManager';

import './styles.css';

const Home = () => (
  <section className='section'>
    <div className='container page__container'>
      <NotesManager />
    </div>
  </section>
);

export default Home;
