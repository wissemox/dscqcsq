import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import "./globals.css";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthRoutes from "./components/PrivateRoute/AuthRoutes";
import Interview from "components/Interview";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/admin" component={AdminLayout} />
      <PrivateRoute path="/interview/:id" component={Interview} />
      <AuthRoutes path="/auth" component={AuthLayout} />
      <Redirect from="/" to="/admin/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
