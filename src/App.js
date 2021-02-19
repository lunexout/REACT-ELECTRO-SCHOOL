import React from "react";
import { Route, Switch } from "react-router-dom";
import DefaultPage from "./defaultPage";
import HomePage from "./component/homePage/dashboard";
import SubjectDsh from "./component/teacherDashboard/subjectDashboard/subjectDsh";
import PointsDashboard from "./component/studentDashboard/pointsDashboard/pointsDashboard";
import Profile from "./component/profile/profile";
import changePassword from "./component/changePassword/changePassword";
import PageNotFound from "./component/pageNotFound/pageNotFound";
import "./responsive.css";
import classTable from "./component/classTable/classTable";
import changePoints from "./component/changePoints/changePoints";

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={DefaultPage} />
        <Route path="/dashboard" exact component={HomePage} />
        <Route path="/dashboard/teacher/:id" exact component={SubjectDsh} />
        <Route
          path="/dashboard/student/:id"
          exact
          component={PointsDashboard}
        />
        <Route path="/profile" component={Profile} />
        <Route path="/change=password" component={changePassword} />
        <Route path="/dashboard/teacher/:id/table" component={classTable} />
        <Route
          path="/dashboard/teacher/:id/:subject/points"
          exact
          component={changePoints}
        />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}
