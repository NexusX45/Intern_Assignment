import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./home";
import TeacherLogin from "./teacher.login";
import TeacherSignup from "./teacher.signup";
import TeacherDash from "./teacher.dash";
import StudentDash from "./student.dash";

export default function Routes({ user, setUser }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/teacher">
          {user ? (
            <TeacherDash user={user} setUser={setUser} />
          ) : (
            <TeacherLogin setUser={setUser} />
          )}
        </Route>
        <Route path="/instsignup">
          <TeacherSignup />
        </Route>
        <Route path="/student">
          {user ? (
            <StudentDash user={user} setUser={setUser} />
          ) : (
            <TeacherLogin setUser={setUser} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}
