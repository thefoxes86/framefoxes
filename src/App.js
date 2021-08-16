import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { useAuth0 } from "@auth0/auth0-react";
import { overmind } from "./utils/overmind";
import { Auth0Provider } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const redirectUri =
  process.env.NODE_ENV === "production"
    ? "https://xdesigners.hopto.org/home"
    : "http://localhost:3000/";

const providerConfig = {
  domain: "dev-cs35xkuf.us.auth0.com",
  clientId: "6te68h4f3HTQMF25xpXegB3fgeygUu95",
  audience: "https://dev-cs35xkuf.us.auth0.com/api/v2/",

  redirectUri: redirectUri,
};

const LoginPage = lazy(() => import("./components/LoginPage"));
const Register = lazy(() => import("./components/Register"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const NoFoundComponent = lazy(() => import("./components/NoFoundComponent"));

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const history = useHistory();
  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  isAuthenticated && overmind.actions.setUser(user);

  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
      domain="dev-cs35xkuf.us.auth0.com"
      clientId="6te68h4f3HTQMF25xpXegB3fgeygUu95"
      audience="https://dev-cs35xkuf.us.auth0.com/api/v2/"
      redirectUri={redirectUri}
    >
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute path="/login" isAuthenticated={isAuthenticated}>
              <LoginPage />
            </PublicRoute>
            <PublicRoute path="/register" isAuthenticated={isAuthenticated}>
              <Register />
            </PublicRoute>
            <PublicRoute
              path="/forgotpassword"
              isAuthenticated={isAuthenticated}
            >
              <ForgotPassword />
            </PublicRoute>

            <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
              <ProtectedRoute />
            </PrivateRoute>
            <PrivateRoute path="/dashboard" isAuthenticated={isAuthenticated}>
              <ProtectedRoute />
            </PrivateRoute>
            <Route path="*">
              <NoFoundComponent />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Auth0Provider>
  );
}

export default App;
