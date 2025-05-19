import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = ({ user }) => {
  //integrate with backend here
  const [taskStats, setTaskStats] = useState({
    all: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    todo: 0,
  });

  const [teamMembers, setTeamMembers] = useState(0);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  useEffect(() => {

//Replace with backend API calls
    setTaskStats({
      all: 12,
      completed: 6,
      pending: 3,
      inProgress: 2,
      todo: 1,
    });

    setTeamMembers(4);

    setUpcomingDeadlines([
      { title: "UI Review", dueDate: "2025-05-06" },
      { title: "Backend Integration", dueDate: "2025-05-08" },
    ]);
  }, []);

  return (
    <div className="container">
      <h2 className="mb-2">Dashboard</h2>
      <p className="text-muted mb-4">
        Welcome back! Here's an overview of your tasks and activities.
      </p>

      {/* Overview Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-white bg-primary shadow-sm">
            <Card.Body>
              <Card.Title>
                <i className="bi bi-card-checklist me-2"></i>All Tasks
              </Card.Title>
              <h4>{taskStats.all}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-success shadow-sm">
            <Card.Body>
              <Card.Title>
                <i className="bi bi-check-circle me-2"></i>Completed
              </Card.Title>
              <h4>{taskStats.completed}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-warning shadow-sm">
            <Card.Body>
              <Card.Title>
                <i className="bi bi-hourglass-split me-2"></i>Pending
              </Card.Title>
              <h4>{taskStats.pending}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-info shadow-sm">
            <Card.Body>
              <Card.Title>
                <i className="bi bi-people-fill me-2"></i>Team Members
              </Card.Title>
              <h4>{teamMembers}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Task Overview */}
      <h5 className="mt-4 mb-3">Tasks Overview</h5>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-primary">
            <Card.Body>
              <Card.Title>To Do</Card.Title>
              <h5>{taskStats.todo}</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-info">
            <Card.Body>
              <Card.Title>In Progress</Card.Title>
              <h5>{taskStats.inProgress}</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-success">
            <Card.Body>
              <Card.Title>Completed</Card.Title>
              <h5>{taskStats.completed}</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-dark">
            <Card.Body>
              <Card.Title>All Tasks</Card.Title>
              <h5>{taskStats.all}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upcoming Deadlines */}
      <h5 className="mt-4 mb-3">Upcoming Deadlines</h5>
      {upcomingDeadlines.length === 0 ? (
        <p className="text-muted">No upcoming deadlines.</p>
      ) : (
        <ul className="list-group">
          {upcomingDeadlines.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span>{task.title}</span>
              <span className="badge bg-danger">{task.dueDate}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
