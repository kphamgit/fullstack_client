import React from 'react';
import {createRoot} from 'react-dom/client'
import App from '../src/components/App/App.js'



//ReactDOM.render(<App />, document.getElementById('root'));

const root = createRoot( document.getElementById('root') )
root.render(<App />);