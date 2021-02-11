import { Button, Modal, Form, Spinner, Card } from "react-bootstrap";
import { React, useState, useEffect, useRef } from "react";
import NavTop from "./nav";
import firebase from "firebase/app";
import { storageRef } from "./firebase";
import "./css/teacher.dash.css";

export default function StudentDash({ user, setUser }) {
  const [section, setSection] = useState(true);

  return (
    <div>
      <NavTop user={user} setUser={setUser} setSection={setSection} />
      <div className="container my-3 h3">
        {section ? <Tasks user={user} /> : <Submission user={user} />}
      </div>
    </div>
  );
}

function Tasks({ user }) {
  const [show, setShow] = useState(false);
  const db = firebase.firestore();
  const posts = db.collection("tasks");
  const submissions = db.collection("submissions");
  const taskName = useRef();
  const details = useRef();
  const [url, setUrl] = useState(null);
  const [spin, setSpin] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskShow, setTaskShow] = useState(false);
  const [temp, setTemp] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [reference, setReference] = useState([]);
  const [curIndex, setCurIndex] = useState(null);

  useEffect(() => {
    if (url) {
      setSpin(false);
    }
  }, [url]);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = () => {
    console.log(reference[curIndex].id);
    const data = {
      author: user.email,
      pic_url: url,
      task_id: reference[curIndex].id,
    };

    submissions
      .doc()
      .set(data)
      .then((res) => {
        console.log(res);
        setShowUpload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpload = (files) => {
    setSpin(true);
    storageRef
      .child(files.target.files[0].name)
      .put(files.target.files[0])
      .then(() => {
        storageRef
          .child(files.target.files[0].name)
          .getDownloadURL()
          .then((res) => {
            setUrl(res);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    posts.get().then((doc) => {
      doc.docs.forEach((item) => {
        setTasks((tasks) => [...tasks, item.data()]);
        setReference((reference) => [...reference, item]);
        console.log(item.data());
      });
    });
    console.log(user);
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleCard = (item, index) => {
    setCurIndex(index);
    setTemp(item);
    setTaskShow(true);
  };
  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-7">
          <div className="h3">Tasks</div>
        </div>
        <div className="col text-right"></div>
      </div>
      <div className="my-4 ">
        {tasks.map((item, index) => (
          <Card
            className="mx-auto my-3 task-card"
            style={{ width: "90%" }}
            onClick={() => handleCard(item, index)}
          >
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text className="lead">{item.details}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control placeholder="Enter Task Name" ref={taskName} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Details"
                ref={details}
              />
            </Form.Group>
            <Form.Group>
              <Form.File label="Choose Image" onChange={handleUpload} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {spin ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal
        show={taskShow}
        onHide={() => setTaskShow(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                placeholder="Enter Task Name"
                ref={taskName}
                value={temp.name}
                disabled
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Details"
                ref={details}
                value={temp.details}
                disabled
              />
            </Form.Group>
          </Form>
          <img src={temp.pic_url} height="100%" width="100%" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setTaskShow(false)}>
            Close
          </Button>
          <a download={temp.name} href={temp.pic_url} title="wew">
            <Button variant="primary">Download</Button>
          </a>
          <Button variant="success" onClick={() => setShowUpload(true)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Modal
          show={showUpload}
          onHide={() => {
            setShowUpload(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload your image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.File label="Choose File" onChange={handleUpload} />
          </Modal.Body>
          <Modal.Footer>
            {spin ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

function Submission(user) {
  const db = firebase.firestore();
  const submissions = db.collection("submissions");
  const tasks = db.collection("tasks");
  const [sub, setSub] = useState([]);

  useEffect(() => {
    submissions.get().then((doc) => {
      doc.docs.forEach((item) => {
        setSub((sub) => [...sub, item.data()]);
        console.log(item.data());
      });
    });
    console.log(user);
  }, []);

  return (
    <div>
      <div className="h3">Submission</div>
      <div className="text-center">
        {sub.map(
          (item) => (
            <div className="my-3">
              <img src={item.pic_url} height="40%" width="40%" />
            </div>
          )

          // <div className="my-3">
          //   <img src={item.pic_url} height="40%" width="40%" />
          // </div>
        )}
      </div>
    </div>
  );
}
