import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import landingPage from "./componets/views/landingPage/LandingPage";
import loginPage from "./componets/views/loginPage/LoginPage";
import registerPage from "./componets/views/registerPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' componet={landingPage}></Route>
          <Route exact path='/login' componet={loginPage}></Route>
          <Route exact path='/register' componet={registerPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
