"use client";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Modal, Table, Tooltip } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import type { TableColumnProps } from "antd";
import useAuth from "@/hook/useAuth";
import { setCurrentUser } from "@/actions/authAcion";
import { useRouter } from "next/navigation";

interface DataType {
  _id: string;
  index: number;
  title: string;
}

export default function TaskManagement() {
  const router = useRouter();
  const { isLoggedIn, user, login } = useAuth();
  const [viewTaskModalVisible, setViewTaskModalVisible] = useState(false);
  const [viewTask, setViewTask] = useState<DataType | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); // Redirect to home if not authenticated
    } else {
      const user = setCurrentUser();
      login(user);
    }
  }, [isLoggedIn, login, router]);

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
                // onClick={() => handleDelete(record.id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const tasks = [
    {
      _id: "1231123",
      index: 1,
      title: "first",
    },
    {
      _id: "674545",
      index: 2,
      title: "second",
    },
  ];

  const handleViewTaskCancel = () => {
    setViewTaskModalVisible(false);
  };

  const handleView = (record: DataType) => {
    setViewTask(record);
    setViewTaskModalVisible(true);
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
      <Layout className="w-full min-h-screen bg-[#424242] p-5 ">
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
        </Content>
        <Modal
          title="Task Details"
          open={viewTaskModalVisible}
          onCancel={handleViewTaskCancel}
          footer={null}
          className="rounded-lg p-2"
        >
          {<div className="">{viewTask?._id}</div>}
        </Modal>
      </Layout>
    </ConfigProvider>
  );
}
