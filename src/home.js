import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const handleChange = () => {
    history.push("teacher");
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(60deg, rgba(230, 50, 50, 0.4), rgba(50, 182, 230, 0.4))",
        height: "1000px",
      }}
    >
      <div className="container text-center" style={{ height: "100%" }}>
        <div style={{ paddingTop: "20%" }}>
          <div className="display-3 pb-5">Login </div>
          <Button
            className="btn-lg mx-4"
            variant="outline-primary"
            onClick={handleChange}
          >
            Instructor
          </Button>
          <Button
            className="btn-lg"
            variant="outline-danger"
            onClick={() => {
              history.push("student");
            }}
          >
            Student
          </Button>
        </div>
      </div>
    </div>
  );
}
