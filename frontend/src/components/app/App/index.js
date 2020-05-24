import React, { useMemo } from "react";
import { Switch, Route, Redirect } from "react-router";
import { useSelector } from "react-redux";

import * as R from "ramda";

import { Auth } from "components/auth/Auth";
import { Dashboard } from "components/dashboard/Dashboard";
import { PageNotFound } from "components/app/PageNotFound";

import { getIsLogged } from "store/auth/selectors";

import "./styles.scss";

const App = () => {
  const isLogged = useSelector(getIsLogged);

  const currentOptions = useMemo(
    () =>
      isLogged
        ? {
            route: <Route path="/dashboard" component={Dashboard} />,
            redirectRoutes: ["/auth/signin"],
          }
        : {
            route: <Route path="/auth/:type" component={Auth} />,
            redirectRoutes: ["/dashboard"],
          },
    [isLogged]
  );

  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path={R.concat(["/", "/auth"], currentOptions.redirectRoutes)}
          render={() => (
            <Redirect to={isLogged ? "/dashboard" : "/auth/signin"} />
          )}
        />
        {currentOptions.route}
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
