import React from 'react';
import {createRoot} from 'react-dom/client'
import App from '../src/components/App/App.js'
import store from "./redux/store.js"
import { Provider } from 'react-redux';

const styles={
    body: {
      margin:10,
      padding:10
    },
  }


//ReactDOM.render(<App />, document.getElementById('root'));

const root = createRoot( document.getElementById('root') )
root.render(
    
    <Provider store={store}>
        <App style={styles} />
    </Provider>
    
);