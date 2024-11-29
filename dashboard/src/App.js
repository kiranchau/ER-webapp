import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Rootlayout from "./components/pages/Rootlayout";
import { SharedDataProvider } from "./components/context/SharedDataContext";
import './SCSS/App.scss'
import Notifications from "./components/popups/Notifications";

export default ({ history }) => {
  return (
    <div className="App">
      <SharedDataProvider>
        <Router history={history}>
          <Switch>
            <Route path="/" component={Rootlayout} />
          </Switch>
        </Router>
        <Notifications/>
      </SharedDataProvider>
    </div>
  );
};
