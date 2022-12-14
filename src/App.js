import React, { useState } from "react";
import './App.css';
import UserTable from "./tables/UserTable";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";

const App = () => {
  const usersData = [
    { id: 1, name: "Amandeep", username : "Account" },
    { id: 2, name: "Balpreet", username: "It department" },
    { id: 3, name: "Sharma", username: "Lab incharge" }
  ];


  const [users, setUsers] = useState(usersData);
  const [search, setNewSearch] = useState("");
  const handleSearchChange = (e) => {
    e.preventDefault();
    console.log("hhhhhhh")
      setNewSearch(e.target.value);
  };

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };


  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id));
  };


  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: "", username: "" };

  const [currentUser, setCurrentUser] = useState(initialFormState);


  const editRow = user => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };


  const updateUser = (id, updateUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updateUser : user)));
  };

  return (
    <div className="container">
      <h1>Department Opreation</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit User</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
        <form className="d-flex">
        <input className="form-control me-2" type="search" value={search} onChange={handleSearchChange} placeholder="Search the Employes" />
        <button className="btn btn-outline-success" type="submit">Find the Employes</button>
       </form>
          <h2>View Employes Detail </h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
};

export default App;
