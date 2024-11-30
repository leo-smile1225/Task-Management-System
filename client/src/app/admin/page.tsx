"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Switch, Table } from "antd";
import type { TableColumnsType } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { allowUser, getAllUser } from "@/actions/adminAcion";

const App: React.FC = () => {
  const [dataSource, setData] = useState<DataType[]>([]); // Initialize as an empty array

  const handleAllow = (index: number, id: React.Key, checked: boolean) => {
    console.log(`switch to ${checked} ${id}`);
    setData((prevData) => {
      const updatedData = [...prevData]; // Create a copy of the previous data
      updatedData[index] = { ...updatedData[index], allowed: checked };
      return updatedData; // Return the updated data array
    });
    allowUser(id, checked);
  };

  interface DataType {
    _id: React.Key;
    email: string;
    username: string;
    allowed: boolean;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "Email",
      width: 100,
      dataIndex: "email",
      key: "1",
      sorter: true,
      fixed: "left",
    },
    {
      title: "Username",
      width: 100,
      dataIndex: "username",
      key: "2",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Allow State",
      dataIndex: "allowed", // Corrected to match the property in DataType
      key: "3",
      render: (_, record: DataType, index: number) => {
        return (
          <div>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={record.allowed} // Use 'checked' instead of 'value'
              onChange={(checked) => handleAllow(index, record._id, checked)}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUser("");
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-[10px]">
      <p className="text-center text-[24px] mb-[20px]">Request Lists</p>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBgContainer: "#333333",
              cellPaddingBlock: 8,
              borderColor: "#ffffff55",
              headerColor: "white",
              colorText: "white",
            },
          },
        }}
      >
        <Table<DataType>
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          rowKey="_id" // Specify the unique key for each row
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>
    </div>
  );
};

export default App;
