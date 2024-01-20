import "./UsersBanks.scss";
import { IUserData } from "../../types";
import React, { useState, useEffect } from "react";
import { usersListData, addUser, editUser, deleteUser } from "../../API/users";
import { Button, Flex, InputNumber, Modal, Form, Input, Progress } from "antd";

const Users = () => {
  const [usersData, setUsersData] = useState<IUserData[]>([]);
  const [value, setValue] = useState<number>(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [updatedUserData, setUpdatedUserData] = useState<IUserData | null>(
    null
  );

  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState<number>(0);

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
      setShowProgress(true);
      setProgress(0);
  
      const message = await addUser(value, setProgress);
      if (message === true) {
        Modal.success({
          title: "Success",
          content: `You add ${value} users`,
          onOk: () => {}, // порожня функція зворотнього виклику
        });
        const data: IUserData[] = await usersListData();
        setUsersData(data);
      } else {
        Modal.error({
          title: "Error adding user",
          onOk: () => {}, // порожня функція зворотнього виклику
        });
      }
    } catch (error) {
      Modal.error({
        title: "Error adding user",
        onOk: () => {}, // порожня функція зворотнього виклику
      });
    } finally {
      setShowProgress(false);
      setProgress(0);
    }
  };

  const handleEditUser = (userId: number) => {
    setEditUserId(userId);
    setIsEditModalOpen(true);
    setUpdatedUserData(usersData.find((user) => user.id === userId) || null);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const message = await deleteUser(userId);
      if (message === true) {
        Modal.success({
          title: "Success",
          content: "User deleted",
        });
        const data: IUserData[] = await usersListData();
        setUsersData(data);
      }
    } catch (error) {
      Modal.error({
        title: "Error delete user",
        content: "Server error",
      });
    }
  };

  const handleEditModalOk = async () => {
    try {
      if (updatedUserData) {
        const message = await editUser(editUserId as number, updatedUserData);
        console.log(message);

        if (message === true) {
          Modal.success({
            title: "Success",
            content: "User updated",
          });
          const data: IUserData[] = await usersListData();
          setUsersData(data);
          setIsEditModalOpen(false);
          setUpdatedUserData(null);
        }
      } else {
        console.log("No updated data");
      }
    } catch (error) {
      Modal.error({
        title: "Error updating user",
        content: "Server error",
      });
    }
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
    setUpdatedUserData(null);
  };

  const handleFormChange = (changedValues: any, allValues: any) => {
    setUpdatedUserData(allValues);
  };

  return (
    <div className="container">
      <div className="users">
        <div className="title">
          <h1>Users List</h1>
        </div>

        <ul className="user">
          {showProgress && (
            <Progress
              type="circle"
              percent={progress}
              format={() => `${progress}%`}
            />
          )}
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
          </div>

          {usersData.map((user) => (
            <li key={user.id} className="user-info">
              <p className="user-id">{user.id}</p>
              <p className="user-password">{user.password}</p>
              <p className="user-first_name">{user.firstName}</p>
              <p className="user-last_name">{user.lastName}</p>
              <p className="user-username">{user.username}</p>
              <p className="user-email">{user.email}</p>
              <div className="buttons">
                <Button type="primary" onClick={() => handleEditUser(user.id)}>
                  Edit
                </Button>
                <Button danger onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        title="Edit User"
        visible={isEditModalOpen}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form
          name="editUserForm"
          initialValues={{
            id: usersData.find((user) => user.id === editUserId)?.id,
            password: usersData.find((user) => user.id === editUserId)
              ?.password,
            first_name: usersData.find((user) => user.id === editUserId)
              ?.firstName,
            last_name: usersData.find((user) => user.id === editUserId)
              ?.lastName,
            username: usersData.find((user) => user.id === editUserId)
              ?.username,
            email: usersData.find((user) => user.id === editUserId)?.email,
          }}
          onFinish={() => handleEditModalOk()}
          onValuesChange={handleFormChange}
        >
          <Form.Item name="id" label="ID">
            <Input disabled />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input />
          </Form.Item>
          <Form.Item name="first_name" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
