import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';

import TrailInputForm from './TrailInputForm';
import TrailworkList from './TrailworkList';

import OptionsPanel from './OptionsPanel';
import Login from './Login';
import Home from './Home';
import ViewTrailItem from './ViewTrailItem';
import EditableTrailItem from './EditableTrailItem';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          {/* <AdminPanel />
          <SawyerPanel />
          <SawyerInputForm />
          <TrailworkItem />
          <Login /> */}
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/optionspanel' exact component={OptionsPanel} />
          <Route path='/trailinputform' exact component={TrailInputForm} />
          <Route path='/Trailworklist' exact component={TrailworkList} />
          <Route path='/TrailworkItem' component={ViewTrailItem} />
          <Route path='/EditableTrailItem' component={EditableTrailItem} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
