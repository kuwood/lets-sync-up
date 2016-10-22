import React from 'react';
import ReactDOM from 'react-dom';
import PlayerControls from '../components/PlayerControls';
import App from '../components/App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
})

describe('PlayerControls', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlayerControls />, div);
  });
})
