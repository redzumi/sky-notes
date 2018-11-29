import React from 'react';
import ReactDOM from 'react-dom';

import './vendors';

import App from './components/App';

// React 17 will replace render for server side by hydrate
if (process.env.NODE_ENV !== 'production') {
  ReactDOM.render(<App />, document.getElementById('root'));
} else {
  ReactDOM.hydrate(<App />, document.getElementById('root'));
}
