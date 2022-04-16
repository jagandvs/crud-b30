import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

export default function Create(props) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    emailid: "",
    mobileNumber: "",
    age: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { username, emailid, mobileNumber, age } = formData;

  useEffect(() => {
    if (id) {
      fetch("https://62398c5863fdd477ac146911.mockapi.io/api/users/users/" + id)
        .then((data) => data.json())
        .then((data) => setFormData(data));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      fetch(
        "https://62398c5863fdd477ac146911.mockapi.io/api/users/users/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((data) => data.json())
        .then((data) => {
          alert("Data Updated Successfully");
          props.history.push("/");
        })
        .catch((err) => console.log(err));
    } else {
      fetch("https://62398c5863fdd477ac146911.mockapi.io/api/users/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((data) => data.json())
        .then((data) => {
          alert("Data Saved Successfully");
          props.history.push("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Container>
      <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter Username"
            type="text"
            value={username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="mobileNumber">Mobile Number</Label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            placeholder="Enter Mobile Number"
            type="text"
            value={mobileNumber}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="emailid">Mobile Number</Label>
          <Input
            id="emailid"
            name="emailid"
            placeholder="Enter Email Id"
            type="email"
            value={emailid}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input
            id="age"
            name="age"
            placeholder="Enter Age"
            type="number"
            value={age}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit" onClick={handleSubmit} color="primary">
          Submit
        </Button>
        <Button onClick={() => props.history.push("/")} color="danger">
          Cancel
        </Button>
      </Form>
    </Container>
  );
}
