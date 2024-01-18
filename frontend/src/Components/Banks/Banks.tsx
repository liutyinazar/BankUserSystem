import "./Banks.scss";
import React, { useState, useEffect } from "react";
import { banksListData } from "../api/banks";
import { IBankData } from "../../types";

const Banks = () => {
  const [banksData, setBanksData] = useState<IBankData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IBankData[] = await banksListData();
        setBanksData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="banks">
      <h1>Banks List</h1>
      <ul className="bank">
        {banksData.map((bank) => (
          <li key={bank.id} className="bank-info">
            <p className="bank-id">{bank.id}</p>
            <p className="bank-name">{bank.bank_name}</p>
            <p className="bank-routing_number">{bank.routing_number}</p>
            <p className="bank-swift_bic">{bank.swift_bic}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Banks;
