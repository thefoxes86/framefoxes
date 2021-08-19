import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { useAuth0 } from "@auth0/auth0-react";
import { overmind } from "./utils/overmind";

const LoginPage = lazy(() => import("./components/LoginPage"));
const Register = lazy(() => import("./components/Register"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const NoFoundComponent = lazy(() => import("./components/NoFoundComponent"));

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  isAuthenticated && overmind.actions.setUser(user);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute path="/login" isAuthenticated={isAuthenticated}>
            <LoginPage />
          </PublicRoute>
          <PublicRoute path="/register" isAuthenticated={isAuthenticated}>
            <Register />
          </PublicRoute>
          <PublicRoute path="/forgotpassword" isAuthenticated={isAuthenticated}>
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
  );
}

export default App;
