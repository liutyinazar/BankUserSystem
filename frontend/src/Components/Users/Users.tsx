import "./Users.scss";
import { Button, Flex, InputNumber, Modal, Space } from "antd";
import { IUserData } from "../../types";
import { usersListData, addUser, deleteUser } from "../api/users";
import React, { useState, useEffect } from "react";

const Users = () => {
  const [usersData, setUsersData] = useState<IUserData[]>([]);
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IUserData[] = await usersListData();
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onChange = (newValue: number | null) => {
    setValue(newValue !== null ? newValue : 0);
  };

  const handleAddUser = async () => {
    try {
      const message = await addUser(value);
      if (message === true) {
        Modal.success({
          title: "Success",
          content: `You add ${value} users`,
        });
        const data: IUserData[] = await usersListData();
        setUsersData(data);
      } else {
        Modal.error({
          title: "Error adding user",
        });
      }
    } catch (error) {
      Modal.error({
        title: "Error adding user",
      });
    }
  };

  const handleDeleteUser = async (number: number) => {
    try {
      const message = await deleteUser(number);

      if (message === true) {
        Modal.success({
          title: "Success",
          content: "User deleted",
        });
      }
      const data: IUserData[] = await usersListData();
      setUsersData(data);
    } catch (error) {
      Modal.error({
        title: "Error delete user",
        content: "Server error",
      });
    }
  };

  return (
    <div className="container">
      <div className="users">
        <div className="title">
          <h1>Users List</h1>
        </div>
        <div className="users-add">
          <Flex gap="small" wrap="wrap">
            <InputNumber
              min={1}
              max={20}
              value={value !== undefined ? value : null}
              onChange={(newValue: number | null) => onChange(newValue)}
            />
            <Button type="primary" onClick={handleAddUser}>
              Add User
            </Button>
          </Flex>
          <Space></Space>
        </div>
        <ul className="user">
          {usersData.map((user) => (
            <li key={user.id} className="user-info">
              <p className="user-id">{user.id}</p>
              <p className="user-password">{user.password}</p>
              <p className="user-first_name">{user.first_name}</p>
              <p className="user-last_name">{user.last_name}</p>
              <p className="user-username">{user.username}</p>
              <p className="user-email">{user.email}</p>
              <div className="buttons">
                <Button type="primary">Edit</Button>
                <Button danger onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
