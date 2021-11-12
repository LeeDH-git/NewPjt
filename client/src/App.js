import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./componets/views/LandingPage/LandingPage";
import LoginPage from "./componets/views/LoginPage/LoginPage";
import RegisterPage from "./componets/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' componet={LandingPage}></Route>
          <Route exact path='/login' componet={LoginPage}></Route>
          <Route exact path='/register' componet={RegisterPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
