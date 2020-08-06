import React from 'react';
import { Provider } from 'react-redux';
import browserHistory from './services/browserHistory.js';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './redux/store';
import { Router, Route, Switch } from 'react-router-dom';

import DefaultLayout from 'layouts/DefaultLayout';
import List from 'pages/List/List';

const history = syncHistoryWithStore(browserHistory, store);

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/:page" exact component={(props) => (
            <DefaultLayout>
              <List {...props}/>
            </DefaultLayout>
          )} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
