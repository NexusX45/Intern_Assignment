import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import auth from "./firebase";
import firebase from "firebase/app";

export default function TeacherLogin({ setUser }) {
  const history = useHistory();
  const email = React.createRef();
  const password = React.createRef();

  const [show, setShow] = useState(false);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        setUser(res.user);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div>
      <div className="container">
        <br />
        <h2 class="display-4 text-center">Sign In</h2>
        <br />
        <div class="text-center">
          <form>
            <span class="text-dark" style={{ padding: "14px" }}>
              Email:
            </span>
            <input type="email" ref={email}></input>
            <br />
            <span class="text-dark">Password:</span>
            <input type="password" ref={password}></input>
            <br />
            {show ? (
              <div class="invalid">Invalid Credentials</div>
            ) : (
              <div></div>
            )}
          </form>
          <button className="btn btn-primary my-3">Submit</button>
        </div>
        <div className="text-center">
          <Button onClick={signInWithGoogle}>Sign in with google</Button>
        </div>
        <div className="text-center my-3">
          <a href="instsignup" className="lead">
            Request an account
          </a>
        </div>
      </div>
    </div>
  );
}
