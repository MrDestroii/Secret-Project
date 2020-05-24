import React, { useMemo } from "react";
import { Switch, Route, Redirect } from "react-router";
import { useSelector } from "react-redux";

import * as R from "ramda";

import { Auth } from "components/auth/Auth";
import { Dashboard } from "components/dashboard/Dashboard";
import { PageNotFound } from "components/app/PageNotFound";

import { routes, authRoute } from "helpers/route";

import { getIsLogged } from "store/auth/selectors";

import "./styles.scss";

const App = () => {
  const isLogged = useSelector(getIsLogged);

  const currentOptions = useMemo(
    () =>
      isLogged
        ? {
            route: <Route path={routes.dashboard} component={Dashboard} />,
            redirectRoutes: [authRoute.signIn.path(), authRoute.signUp.path()],
            routeRedirect: routes.dashboard,
          }
        : {
            route: <Route path={authRoute.template} component={Auth} />,
            redirectRoutes: [routes.dashboard],
            routeRedirect: authRoute.signIn.path(),
          },
    [isLogged]
  );

  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path={R.concat(
            [routes.main, authRoute.main],
            currentOptions.redirectRoutes
          )}
          render={() => <Redirect to={currentOptions.routeRedirect} />}
        />
        {currentOptions.route}
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
