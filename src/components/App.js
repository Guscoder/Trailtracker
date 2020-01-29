import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";

import TrailInputForm from "./TrailInputForm";
import TrailworkList from "./TrailworkList";

import OptionsPanel from "./OptionsPanel";
import AdminPanel from "./AdminPanel";
import Login from "./Login";
import Home from "./Home";

const imageStyle = {
  width: "100vw",
  height: "auto"
};

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <Header />
          {/* <AdminPanel />
          <SawyerPanel />
          <SawyerInputForm />
          <TrailworkItem />
          <Login /> */}
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/adminpanel" component={AdminPanel} />
          <Route path="/optionspanel" component={OptionsPanel} />
          <Route path="/trailinputform" component={TrailInputForm} />
          <Route path="/TrailworkList" component={TrailworkList} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
