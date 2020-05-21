import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { Auth } from "components/auth/Auth";
import { Dashboard } from "components/dashboard/Dashboard";

import { getIsLogged } from "store/auth/selectors";

import "./styles.scss";

const App = () => {
  const isLogged = useSelector(getIsLogged);
  const Content = useMemo(() => (isLogged ? Dashboard : Auth), [isLogged]);

  return (
    <div className="app">
      <Content />
    </div>
  );
};

export default App;
