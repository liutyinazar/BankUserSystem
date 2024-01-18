import "../Users/Users.scss";
import { Button, Flex, InputNumber, Modal, Space, Form, Input } from "antd";

import { IBankData } from "../../types";
import { banksListData, addBank, editBank, deleteBank } from "../api/banks";
import React, { useState, useEffect } from "react";

const Banks = () => {
  const [banksData, setBanksData] = useState<IBankData[]>([]);
  const [value, setValue] = useState<number>(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBankId, setEditBankId] = useState<number | null>(null);
  const [updatedBankData, setUpdatedBankData] = useState<IBankData | null>(
    null
  );

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

  const onChange = (newValue: number | null) => {
    setValue(newValue !== null ? newValue : 0);
  };

  const handleAddBank = async () => {
    try {
      const message = await addBank(value);
      if (message === true) {
        Modal.success({
          title: "Success",
          content: `You add ${value} banks`,
        });
        const data: IBankData[] = await banksListData();
        setBanksData(data);
      } else {
        Modal.error({
          title: "Error adding bank",
        });
      }
    } catch (error) {
      Modal.error({
        title: "Error adding bank",
      });
    }
  };

  const handleEditBank = (bankId: number) => {
    setEditBankId(bankId);
    setIsEditModalOpen(true);
    setUpdatedBankData(banksData.find((bank) => bank.id === bankId) || null);
  };

  const handleDeleteBank = async (bankId: number) => {
    try {
      const message = await deleteBank(bankId);
      if (message === true) {
        Modal.success({
          title: "Success",
          content: "Bank deleted",
        });
        const data: IBankData[] = await banksListData();
        setBanksData(data);
      }
    } catch (error) {
      Modal.error({
        title: "Error delete bank",
        content: "Server error",
      });
    }
  };

  const handleEditModalOk = async () => {
    try {
      if (updatedBankData) {
        const message = await editBank(editBankId as number, updatedBankData);
        console.log(message);

        if (message === true) {
          Modal.success({
            title: "Success",
            content: "Bank updated",
          });
          const data: IBankData[] = await banksListData();
          setBanksData(data);
          setIsEditModalOpen(false);
          setUpdatedBankData(null);
        }
      } else {
        console.log("No updated data");
      }
    } catch (error) {
      Modal.error({
        title: "Error updating bank",
        content: "Server error",
      });
    }
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
    setUpdatedBankData(null);
  };

  const handleFormChange = (changedValues: any, allValues: any) => {
    setUpdatedBankData(allValues);
  };

  return (
    <div className="container">
      <div className="banks">
        <div className="title">
          <h1>Banks List</h1>
        </div>
        <div className="banks-add">
          <Flex gap="small" wrap="wrap">
            <InputNumber
              min={1}
              max={20}
              value={value !== undefined ? value : null}
              onChange={(newValue: number | null) => onChange(newValue)}
            />
            <Button type="primary" onClick={handleAddBank}>
              Add Bank
            </Button>
          </Flex>
          <Space></Space>
        </div>
        <ul className="bank">
          {banksData.map((bank) => (
            <li key={bank.id} className="bank-info">
              <p className="bank-id">{bank.id}</p>
              <p className="bank-name">{bank.bank_name}</p>
              <p className="bank-routing_number">{bank.routing_number}</p>
              <p className="bank-swift_bic">{bank.swift_bic}</p>
              <div className="buttons">
                <Button type="primary" onClick={() => handleEditBank(bank.id)}>
                  Edit
                </Button>
                <Button danger onClick={() => handleDeleteBank(bank.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        title="Edit Bank"
        visible={isEditModalOpen}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form
          name="editBankForm"
          initialValues={{
            id: banksData.find((bank) => bank.id === editBankId)?.id,
            bank_name: banksData.find((bank) => bank.id === editBankId)
              ?.bank_name,
              routing_number: banksData.find((bank) => bank.id === editBankId)
              ?.routing_number,
              swift_bic: banksData.find((bank) => bank.id === editBankId)
              ?.swift_bic,
          }}
          onFinish={() => handleEditModalOk()}
          onValuesChange={handleFormChange}
        >
          <Form.Item name="id" label="ID">
            <Input disabled />
          </Form.Item>
          <Form.Item name="bank_name" label="BankName">
            <Input />
          </Form.Item>
          <Form.Item name="routing_number" label="RoutingNumber">
            <Input />
          </Form.Item>
          <Form.Item name="swift_bic" label="Swift Bic">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Banks;
