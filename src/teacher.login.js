import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import auth from "./firebase";
import firebase from "firebase/app";

export default function TeacherLogin({ setUser }) {
  const history = useHistory();
  const email = React.createRef();
  const password = React.createRef();
  const [show, setShow] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState("");

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

  const signInManual = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.current.value, password.current.value)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const signUpManual = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        email.current.value,
        password.current.value
      )
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div>
      <div className="container">
        <br />

        <div className="text-center my-4">
          <h2 className=" my-4">Sign In</h2>
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          <br />
          <br />
          <Button
            onClick={() => {
              setShow(true);
            }}
          >
            Sign in manually
          </Button>
        </div>
        <div className="text-center my-3">
          <Button
            variant="outline-primary"
            className="lead"
            onClick={() => {
              setShowSignUp(true);
            }}
          >
            Create an account
          </Button>
        </div>
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Modal.Header className="text-center" closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                {invalid ? (
                  <div class="invalid">Invalid Credentials</div>
                ) : (
                  <div></div>
                )}
              </form>
              <button className="btn btn-primary my-3" onClick={signInManual}>
                Submit
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showSignUp}
          onHide={() => {
            setShowSignUp(false);
          }}
        >
          <Modal.Header className="text-center" closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              </form>
              <button className="btn btn-primary my-3" onClick={signUpManual}>
                Submit
              </button>
            </div>
            {error ? <div>{error.message}</div> : <div></div>}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
