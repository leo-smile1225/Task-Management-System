"use client";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Modal, Table, Tooltip } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import type { TableColumnProps } from "antd";
import CreateTask from "./createtask";
import axios from "axios";
import { BackendURL } from "@/utils/untile";
import TaskView from "./taskview";

export interface DataType {
  _id: string;
  index: number;
  title: string;
}

export default function TaskManagement() {
  const [viewTaskModalVisible, setViewTaskModalVisible] = useState(false);
  const [viewTask, setViewTask] = useState<DataType>();
  const [newTaskModalshow, setNewTaskModalshow] = useState(true);
  const [tasks, setTasks] = useState<DataType[]>();

  useEffect(() => {
    const getTaskList = async () => {
      const { data } = await axios.get(BackendURL + "/task/getTask");
      console.log(data);

      const newData: DataType[] = data.map((item: any, index: number) => ({
        _id: item._id,
        title: item.title,
        index: index + 1,
      }));
      setTasks(newData);
    };
    getTaskList();
  }, []);

  const columns: TableColumnProps<DataType>[] = [
    {
      title: "ID",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 30,
    },
    {
      title: "Project",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 30,
      render: (_, record: DataType) => {
        return (
          <div className="flex justify-around">
            <Tooltip title="View">
              <Button
                type="text"
                shape="circle"
                icon={<EyeOutlined style={{ color: "#1890ff" }} />}
                className="action-button"
                onClick={() => handleView(record)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="text"
                shape="circle"
                icon={<DeleteOutlined style={{ color: "#f5222d" }} />}
                className="action-button"
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleView = (record: DataType) => {
    setViewTask(record);
    setViewTaskModalVisible(true);
  };

  const showNewTaskModal = () => {
    setNewTaskModalshow(!newTaskModalshow);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorBgContainer: "#979797",
            cellPaddingBlock: 8,
          },
          Modal: {
            contentBg: "#979797",
            headerBg: "#979797",
          },
        },
      }}
    >
      <Layout className="w-full h-[872px] bg-[#424242] p-5 relative">
        <Content className="px-5 py-8 grow bg-[#333333] rounded-[20px]">
          <div className="text-[#DDDDDD] text-2xl text-center mb-8">
            Task Management
          </div>
          <Table
            columns={columns}
            dataSource={tasks}
            rowKey="_id"
            bordered
            scroll={{ x: true }}
            pagination={false}
          />
          <Button
            type="primary"
            className="mt-[20px] flex justify-self-end"
            onClick={() => showNewTaskModal()}
          >
            Create Task
          </Button>
        </Content>
        <TaskView
          viewTaskModalVisible={viewTaskModalVisible}
          setViewTaskModalVisible={setViewTaskModalVisible}
          viewTask={viewTask}
        />
        {!newTaskModalshow && (
          <CreateTask
            setNewTaskView={setNewTaskModalshow}
            newTaskView={newTaskModalshow}
          />
        )}
      </Layout>
    </ConfigProvider>
  );
}
