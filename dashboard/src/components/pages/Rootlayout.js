import React, {useEffect} from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Connections from "./connections/Connections";
import Metrics from "./metrics/Metrics";
import Dashboards from "./dashboards/Dashboards";
import Masterdata from "./masterdata/Masterdata";
import ModelsAndEntities from "./modelandentities/ModelsAndEntities";
import DashboardView from "./dashboards/DashboardView";
import MetricsView from "./metrics/MetricsView";
import ModelsAndEntitiesView from "./modelandentities/ModelsAndEntitiesView";
import EntitySettings from "./modelandentities/modelandentitiesviews/EntitySettings";
import Alerts from "./alerts/Alerts";
import AlertsMain from "./alerts/AlertsMain";

const Rootlayout = () => {
  const history = useHistory();
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshtoken");
    console.log("refreshToken", refreshToken);
    if (!refreshToken) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <div>
        <Sidebar />
      </div>
      <Switch>
        <Route path="/dashboard/metrics/details" component={MetricsView} />
        <Route path="/dashboard/metrics" exact component={Metrics} />
        <Route path="/dashboard/connections" exact component={Connections} />
        <Route path="/dashboard/alerts" exact component={AlertsMain} />
        <Route path="/dashboard/alerts/add" exact component={Alerts} />
        <Route path="/dashboard/explore/:id" exact component={Masterdata} />
        <Route path="/dashboard/explore" exact component={Masterdata} />
        <Route
          path="/dashboard/models-entities/entitysettings"
          component={EntitySettings}
        />
        <Route
          path="/dashboard/models-entities/details"
          component={ModelsAndEntitiesView}
        />
        <Route
          path="/dashboard/models-entities"
          exact
          component={ModelsAndEntities}
        />
        <Route path="/dashboard/details/:id" component={DashboardView} />
        <Route path="/dashboard" exact component={Dashboards} />
      </Switch>
    </>
  );
};

export default Rootlayout;
