import React, { useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignupProcess from './components/SignUpProcess';
import './SCSS/App.scss';
import { FormProvider } from './components/context/FormContext';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Notifications from './components/Popups/Notifications';
import { tokenUpdate } from './api/authCrud';

export default ({ history }) => {
  const currentURL = history.location.pathname;

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshtoken");
    if (refreshToken) {
      const refreshTokenObj = { refresh: refreshToken.replace(/['"]+/g, "") };
      tokenUpdate(refreshTokenObj)
        .then((res) => {
          console.log("res..tokenUpdate", res);
          if (res.status === 200) {
            localStorage.setItem("token", JSON.stringify(res.data.access));
            history.push("/dashboard");
          } else {
            throw new Error("Token update failed");
          }
        })
        .catch((err) => {
          console.log("Token update error:", err);
          localStorage.clear();
          history.push("/");
        });
    }
  }, []);

  useEffect(() => {
    const base = currentURL.split('/');
    if (base[1] === 'password-reset-confirm') {
      localStorage.setItem("liveUrlPath1", JSON.stringify(base[2]));
      localStorage.setItem("liveUrlPath2", JSON.stringify(base[3]));
      history.push('/password-reset-confirm');  // corrected to history.push
    }
  }, [currentURL]); // Dependency updated to currentURL

  return (
    <div>
      <FormProvider>
        <Router history={history}>
          <Switch>
            <Route path="/signup_process" component={SignupProcess} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/password-reset-confirm" component={ResetPassword} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={SignIn} />
          </Switch>
        </Router>
        <Notifications />
      </FormProvider>
    </div>
  );
};
