import { Modal, Table, TableColumnProps } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import { DataType } from "./page";
import axios from "axios";
import { BackendURL } from "@/utils/untile";

interface SubType {
  title: string;
  description: string;
  key: string; // Ensure this is unique for every subtask
}

const columns: TableColumnProps<SubType>[] = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    align: "center",
    width: 30,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

export default function TaskView(props: {
  setViewTaskModalVisible: React.Dispatch<SetStateAction<boolean>>;
  viewTaskModalVisible: boolean;
  viewTask: DataType | undefined;
}) {
  const [subtasks, setSubtasks] = useState<SubType[]>([]);

  useEffect(() => {
    if (props.viewTask?._id) {
      const getDetail = async () => {
        const { data } = await axios.post(BackendURL + "/task/getSubtask", {
          task_id: props.viewTask?._id,
        });

        // Assuming each item in data has a unique ID, e.g., item.id
        const transformedData = data.map((item: any) => ({
          title: item.title,
          description: item.description,
          key: item.id || item._id, // ensure this is unique
        }));

        setSubtasks(transformedData);
      };

      getDetail();
    }
  }, [props.viewTask]);

  const handleViewTaskCancel = () => {
    props.setViewTaskModalVisible(false);
  };

  return (
    <Modal
      title="Task Details"
      open={props.viewTaskModalVisible}
      onCancel={handleViewTaskCancel}
      footer={null}
      className="rounded-lg p-2"
    >
      <Table
        columns={columns}
        dataSource={subtasks}
        rowKey="key"
        bordered
        scroll={{ x: true }}
        pagination={false}
      />
    </Modal>
  );
}
