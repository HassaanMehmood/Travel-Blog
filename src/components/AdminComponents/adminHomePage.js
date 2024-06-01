import React, { useState, useEffect } from "react";
import axios from "axios";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./adminHomePage.css";

export default function AdminHome({ userData }) {
  const [allUsersData, setAllUsersData] = useState([]);
  const [filteredUsersData, setFilteredUsersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUserData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredData = allUsersData.filter((user) =>
        `${user.fname} ${user.email}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredUsersData(filteredData);
    } else {
      setFilteredUsersData(allUsersData);
    }
  }, [searchQuery, allUsersData]);

  const fetchAllUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getAllUser", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      console.log(response.data, "allUserData");
      setAllUsersData(response.data.data);
      setFilteredUsersData(response.data.data);
    } catch (error) {
      console.error("Error fetching all user data:", error);
    }
  };

  const deleteUser = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      try {
        const response = await axios.post(
          "http://localhost:3000/deleteUser",
          {
            userid: id,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert(response.data.data);
        fetchAllUserData();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (!userData) {
    return <div>Loading.......</div>;
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  const admins = filteredUsersData.filter((user) => user.userType === "admin");
  const regularUsers = filteredUsersData.filter(
    (user) => user.userType !== "admin"
  );

  return (
    <div className="container container-grey-background">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">Admin Details</h4>
              <div className="mb-3">
                <h6>
                  <strong>First Name:</strong> {userData.fname}
                </h6>
                <h6>
                  <strong>Last Name:</strong> {userData.lname}
                </h6>
                <h6>
                  <strong>Email:</strong> {userData.email}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={() => navigate("/admin-blog-management")}
            className="btn btn-outline-primary"
          >
            Manage Posts
          </button>
          <button
            onClick={() => navigate("/admin-quiz-management")}
            className="btn btn-outline-primary"
          >
            Manage Quizzes
          </button>
          <button
            onClick={() => navigate("/admin-travel-cost-management")}
            className="btn btn-outline-primary"
          >
            Manage Travel Cost
          </button>
        </div>

        <div className="col-12 mt-4">
          <h3 className="text-center">Manage User Accounts</h3>
          <div className="card mt-2">
            <div className="card-body">
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="search-icon">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="search-icon"
                    onChange={handleSearch}
                  />
                </div>
                <div className="mt-2">
                  <span>
                    {searchQuery.length > 0
                      ? `Records Found: ${filteredUsersData.length}`
                      : `Total Records: ${allUsersData.length}`}
                  </span>
                </div>
              </div>

              <div className="table-responsive">
                <h4>Admins</h4>
                <table
                  className="table table-bordered"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>Name</th>
                      <th>Email</th>
                      <th>User Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((user) => (
                      <tr key={user._id} style={{ textAlign: "center" }}>
                        <td>
                          {user.fname} {user.lname}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.userType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h4>Users</h4>
                <table
                  className="table table-bordered"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>Name</th>
                      <th>Email</th>
                      <th>User Type</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regularUsers.map((user) => (
                      <tr key={user._id} style={{ textAlign: "center" }}>
                        <td>
                          {user.fname} {user.lname}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.userType}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => deleteUser(user._id, user.fname)}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
