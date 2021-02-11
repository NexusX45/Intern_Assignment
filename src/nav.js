import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import firebase from "firebase/app";
export default function NavTop({ user, setUser, setSection }) {
  const handleLogout = () => {
    setUser(null);
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => setSection(true)} href="">
            Tasks
          </Nav.Link>
          <Nav.Link onClick={() => setSection(false)} href="">
            Submissions
          </Nav.Link>
        </Nav>
        <div className="lead mr-3 mb-3" style={{ color: "white" }}>
          {user.email}
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
