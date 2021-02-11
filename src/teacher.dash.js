import { Button, Modal, Form, Spinner, Card } from "react-bootstrap";
import { React, useState, useEffect, useRef } from "react";
import NavTop from "./nav";
import firebase from "firebase/app";
import { storageRef } from "./firebase";
import "./css/teacher.dash.css";
export default function TeacherDash({ user, setUser }) {
  const [section, setSection] = useState(true);

  return (
    <div>
      <NavTop user={user} setUser={setUser} setSection={setSection} />
      <div className="container my-3 h3">
        {section ? <Tasks /> : <Submission />}
      </div>
    </div>
  );
}

function Tasks() {
  const [show, setShow] = useState(false);
  const db = firebase.firestore();
  const posts = db.collection("tasks");
  const taskName = useRef();
  const details = useRef();
  const [url, setUrl] = useState(null);
  const [spin, setSpin] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskShow, setTaskShow] = useState(false);
  const [temp, setTemp] = useState("");

  useEffect(() => {
    if (url) {
      setSpin(false);
    }
  }, [url]);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = () => {
    const data = {
      name: taskName.current.value,
      details: details.current.value,
      pic_url: url,
    };

    posts
      .doc()
      .set(data)
      .then((res) => {
        console.log(res);
        setShow(false);
        posts.get().then((doc) => {
          setTasks([]);
          doc.docs.forEach((item) => {
            setTasks((tasks) => [...tasks, item.data()]);
            console.log(item.data());
          });
        });
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
        console.log(item.data());
      });
    });
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleCard = (item) => {
    setTemp(item);
    setTaskShow(true);
  };
  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-7">
          <div className="h3">Tasks</div>
        </div>
        <div className="col text-right">
          <Button variant="outline-danger" onClick={() => setShow(true)}>
            Create Task
          </Button>
        </div>
      </div>
      <div className="my-4 ">
        {tasks.map((item) => (
          <Card
            className="mx-auto my-3 task-card"
            style={{ width: "90%" }}
            onClick={() => handleCard(item)}
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
              />
            </Form.Group>
          </Form>
          <img src={temp.pic_url} height="100%" width="100%" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setTaskShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div></div>
    </div>
  );
}

function Submission() {
  const db = firebase.firestore();
  const submissions = db.collection("submissions");
  const posts = db.collection("tasks");
  const [tasks, setTasks] = useState([]);
  const [sub, setSub] = useState([]);
  const [temp, setTemp] = useState("");
  const [taskShow, setTaskShow] = useState(false);
  const [reference, setReference] = useState([]);
  const [id, setId] = useState("");
  const [taskTemp, setTaskTemp] = useState("");
  const [scoreShow, setScoreShow] = useState(false);

  useEffect(() => {
    submissions.get().then((doc) => {
      doc.docs.forEach((item) => {
        setSub((sub) => [...sub, item.data()]);
      });
    });
    posts.get().then((doc) => {
      doc.docs.forEach((item) => {
        setTasks((tasks) => [...tasks, item.data()]);
      });
    });
    posts.get().then((doc) => {
      doc.docs.forEach((item) => {
        setReference((tasks) => [...tasks, item]);
      });
    });
  }, []);

  const handleCard = (item, index) => {
    setTemp(item);
    setTaskShow(true);
    setId(reference[index].id);
  };

  const handleScore = (item) => {
    setTaskTemp(item);
    setScoreShow(true);
  };

  return (
    <div className="h3">
      <div>Submission</div>
      <div className="my-4">
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
      <Modal
        show={taskShow}
        onHide={() => setTaskShow(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{temp.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Details"
                value={temp.details}
              />
            </Form.Group>
          </Form>
          <div className="h3">Submissions</div>
          <div className="d-flex " style={{ overflow: "scroll" }}>
            {sub.map((item) =>
              item.task_id == id ? (
                <img
                  src={item.pic_url}
                  height="40%"
                  width="40%"
                  className="mx-3 task-card"
                  onClick={() => {
                    handleScore(item);
                  }}
                />
              ) : (
                <div></div>
              )
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setTaskShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={scoreShow}
        onHide={() => {
          setScoreShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Score</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="h3">Submitted By: {taskTemp.author}</div>
          <div className="my-4">
            <img
              src={taskTemp.pic_url}
              height="100%"
              width="100%"
              href={taskTemp.pic_url}
            />
          </div>
          <div>
            <Form>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Score</Form.Label>
                <Form.Control as="select" custom>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
          <Modal.Footer>
            <a href={taskTemp.pic_url}>
              <Button variant="success">Download</Button>
            </a>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}
