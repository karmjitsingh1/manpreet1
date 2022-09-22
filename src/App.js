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
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Eidt User</h2>
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
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
};

export default App;
