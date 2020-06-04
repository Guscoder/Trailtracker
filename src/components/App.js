import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './Layout';

import Header from './Header';
import TrailInputForm from './forms/TrailInputForm';
import TrailworkList from './TrailworkList';
import OptionsPanel from './OptionsPanel';
import Login from './Login';
import Home from './Home';
import ViewTrailItem from './ViewTrailItem';
import EditableTrailItem from './forms/EditableTrailItem';
import '../styles/config-styles.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/optionspanel' exact component={OptionsPanel} />
            <Route path='/trailinputform' exact component={TrailInputForm} />
            <Route
              path='/Trailworklist/:listStatus'
              component={TrailworkList}
            />
            <Route path='/TrailworkItem' component={ViewTrailItem} />
            <Route path='/EditableTrailItem' component={EditableTrailItem} />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
