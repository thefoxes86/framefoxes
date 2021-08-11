import { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../utils/routes";
import Loader from "../components/Loader";

function ProtectedRoutes() {
  return (
    <Switch>
      <Suspense fallback={<Loader />}>
        {routes.map(({ component: Component, path, exatc }) => (
          <Route exatc={exatc} path={`/${path}`} key={path}>
            <Component />
          </Route>
        ))}
      </Suspense>
    </Switch>
  );
}

export default ProtectedRoutes;
