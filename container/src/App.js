import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Progress from "./components/Progress";

const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));
import './SCSS/App.scss';

export default () => {

  return (
    <BrowserRouter>
        <div>
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/dashboard" component={DashboardLazy} />
              <Route path="/" component={AuthLazy} />
            </Switch>
          </Suspense>
        </div>
    </BrowserRouter>
  );
};
