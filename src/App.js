import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";

let url = "https://62398c5863fdd477ac146911.mockapi.io/api/users/users/";

export default function App(props) {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    fetch(url + id, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((data) => {
        getData();
        alert("Deleted Succefully");
      });
  };
  return (
    <div>
      <Button color="secondary" onClick={() => props.history.push("/create")}>
        Create User
      </Button>
      <Table bordered>
        <thead>
          <tr>
            <th>S No</th>
            <th>Username</th>
            <th>Email Id</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{value.username}</td>
              <td>{value.emailid}</td>
              <td>{value.mobileNumber}</td>
              <td>{value.age}</td>
              <td>
                <Button color="danger" onClick={() => handleDelete(value.id)}>
                  Delete
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    props.history.push(`/create/${value.id}`);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
