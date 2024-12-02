"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Select, Switch, Table } from "antd";
import type { TableColumnsType } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { allowUser, getAllUser } from "@/actions/adminAcion";
import { setCurrentUser } from "@/actions/authAcion";
import setAuthToken from "@/utils/setAuthToken";
import { getAllSubtask, updateTaskStatus } from "@/actions/memberaction";
import useAuth from "@/hook/useAuth";

const Task: React.FC = () => {
  const { user } = useAuth();
  const [dataSource, setData] = useState<DataType[]>([]);

  const handleChange = (index: number, id: string, value: string) => {
    console.log(`switch to ${value} ${id}`);
    setData((prevData) => {
      const updatedData = [...prevData]; // Create a copy of the previous data
      updatedData[index] = { ...updatedData[index], status: value };
      return updatedData; // Return the updated data array
    });
    updateTaskStatus({ _id: id, status: value });
  };

  interface DataType {
    _id: string;
    title: string;
    status: string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "title",
      width: 100,
      dataIndex: "title",
      key: "1",
      sorter: true,
      fixed: "left",
    },
    {
      title: "Working State",
      dataIndex: "status", // Corrected to match the property in DataType
      key: "3",
      render: (_, record: DataType, index: number) => {
        return (
          <div>
            <Select
              className="w-full h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none"
              value={record.status}
              onChange={(value) => handleChange(index, record._id, value)}
              options={[
                { value: "pending", label: "pending" },
                { value: "in_progress", label: "in_progress" },
                { value: "completed", label: "completed" },
              ]}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?._id) {
          console.log("=>", user);
          const res = await getAllSubtask(user?._id);
          setData(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user?._id]);

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

export default Task;
