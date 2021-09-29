import { lazy, Suspense } from "react";
import { Redirect, Route } from "react-router";

import "./App.scss";
import Layout from "./layout/Layout";
import Loading from "./components/Loading";
import useUser from "./hooks/user";
const Home = lazy(() => import("./screens/Home"));
const Login = lazy(() => import("./screens/Login"));
const Signin = lazy(() => import("./screens/Signin"));
const Categories = lazy(() => import("./screens/Categories"));

const redirectTo = (path) => {
  const RedirectToSomewhere = () => {
    return <Redirect to={path}></Redirect>;
  };
  return RedirectToSomewhere;
};

const App = () => {
  const user = useUser();

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Route exact path="/" component={Home} />
        {!user.isLogin ? (
          <>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signin" component={Signin} />
          </>
        ) : (
          <>
            <Route exact path="/login" component={redirectTo("/profile")} />
            <Route exact path="/signin" component={redirectTo("/profile")} />
          </>
        )}

        <Route exact path="/collection/:id/" component={Categories} />
      </Suspense>
    </Layout>
  );
};

export default App;
