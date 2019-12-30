import React from 'react';
import Loadable from 'react-loadable'

import './App.css';

const AsyncComponent = Loadable({
    loader: () => import (/* webpackChunkName: "asyncChunk" */ "./components/SomeComponent"),
    loading: () => <div>loading...</div>,
    modules: ['asyncChunk']
});

function App() {
  return (
    <div className="App">
      <AsyncComponent/>
    </div>
  );
}

export default App;
