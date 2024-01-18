import "./Users.scss";
import React, { useState, useEffect } from "react";
import { usersListData } from "../API/users";
import { IUserData } from "../../types";

const Users = () => {
  const [usersData, setUsersData] = useState<IUserData[]>([]);

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

  return (
    <div className="users">
      <h1>Users List</h1>
      <ul className="user">
        {usersData.map((bank) => (
          <li key={bank.id} className="user-info">
            <p className="bank-id">{bank.id}</p>
            <p className="bank-password">{bank.password}</p>
            <p className="bank-first_name">{bank.first_name}</p>
            <p className="bank-last_name">{bank.last_name}</p>
            <p className="bank-username">{bank.username}</p>
            <p className="bank-email">{bank.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
