import React from "react";
import { FaSpinner } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Payment } from "../components";
import ErrorBoundary from "../components/ErrorBoundary";

function Pages() {
  const LazyCart = React.lazy(() => import("./Cart"));
  const LazyProductCategories = React.lazy(() => import("./ProductCategories"));
  const LazyProductDescription = React.lazy(() =>
    import("./ProductDescription")
  );
  const LazySignIn = React.lazy(() => import("./SignIn"));
  const LazySignUp = React.lazy(() => import("./SignUp"));
  const LazyHome = React.lazy(() => import("./Home"));
  const LazyOrders = React.lazy(() => import("./Orders"));
  const LazyEnterNewPassword = React.lazy(() => import("./EnterNewPassword"));
  const LazyForgotPassword = React.lazy(() => import("./ForgotPassword"));
  return (
    <Router>
      <ErrorBoundary>
        <React.Suspense fallback={<FaSpinner />}>
          <Routes>
            <Route exact path="/" element={<LazyHome />}></Route>
            <Route exact path="/signin" element={<LazySignIn />}></Route>
            <Route exact path="/signup" element={<LazySignUp />}></Route>
            <Route exact path="/cart" element={<LazyCart />}></Route>
            <Route
              exact
              path="/ProductCategories"
              element={<LazyProductCategories />}
            ></Route>
            <Route
              exact
              path="/ProductDescription/:id"
              element={<LazyProductDescription />}
            ></Route>
            <Route exact path="/payment" element={<Payment />}></Route>
            <Route exact path="/order" element={<LazyOrders />}></Route>
            <Route
              exact
              path="/forgotPassword"
              element={<LazyForgotPassword />}
            ></Route>{" "}
            <Route
              exact
              path="/enterNewPassword"
              element={<LazyEnterNewPassword />}
            ></Route>
            <Route path="/*" render={() => <h1>No page found</h1>}></Route>
          </Routes>
        </React.Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default Pages;
