import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/layout/App';

const rootEl = document.getElementById('root');

const render = () => {
  ReactDOM.render(<App />, rootEl);
};

if (module.hot) {
  module.hot.accept('./App/layout/App', () => setTimeout(render));
}

render();
