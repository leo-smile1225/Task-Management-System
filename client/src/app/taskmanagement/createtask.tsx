import React, { SetStateAction, useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Select } from "antd";
import type { FormItemProps } from "antd";
import { BackendURL, getAllUsersURL } from "@/utils/untile";
import axios from "axios";
import { ChildProps } from "../membermanagement/page";

const MyFormItemContext = React.createContext<(string | number)[]>([]);
export interface MemberType {
  value: string;
  label: string;
  description: string;
}

function toArr(
  str: string | number | (string | number)[]
): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

export default function CreateTask(props: {
  setNewTaskView: React.Dispatch<SetStateAction<boolean>>;
  newTaskView: boolean;
}) {
  const [currentMember, setCurrentMember] = useState("");
  const [taskCreated, setTaskCreated] = useState(false);
  const [userData, setUserData] = useState<MemberType[]>();
  const [currentId, setCurrentId] = useState("");
  const [form] = Form.useForm();
  //   const { user } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.post(getAllUsersURL, { type: "mng" });
      const newData: MemberType[] = data.map((item: ChildProps) => ({
        value: item._id,
        label: item.username,
      }));
      setUserData(newData);
    };
    getUser();
  }, []);

  const taskCreate = async (value: object) => {
    if (!value?.title || !value?.description) {
      message.error("Enter title or description");
      return;
    }
    const taskId = await axios.post(BackendURL + "/task/create", value);
    setCurrentId(taskId.data.id[0]._id);
    setTaskCreated(true);
  };

  const newTaskCancel = () => {
    props.setNewTaskView(() => !props.newTaskView);
  };

  const subtaskCreate = async (value: object) => {
    if (!value.title || !value.description) {
      message.error("Enter title or description");
      return;
    }
    const newSubtask = {
      value,
      task_id: currentId,
    };
    await axios.post(BackendURL + "/task/createSubtask", newSubtask);
    form.resetFields();
    console.log(form);
  };
  return (
    <Modal open={true} footer={false} onCancel={newTaskCancel}>
      <Form name="create_task" layout="vertical" onFinish={taskCreate}>
        <div className="text-2xl text-center">Create New Task</div>
        <MyFormItem name="title" label="Title">
          <Input disabled={taskCreated} />
        </MyFormItem>
        <MyFormItem name="description" label="Description">
          <Input disabled={taskCreated} />
        </MyFormItem>
        <Button
          type="primary"
          htmlType="submit"
          className="flex justify-self-end"
        >
          OK
        </Button>
      </Form>
      <Form
        form={form}
        name="create_subtask"
        layout="vertical"
        onFinish={subtaskCreate}
      >
        <div className="text-2xl text-center m-4">Create New Subtask</div>
        <MyFormItem name="member" label="Assign to">
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Search to Select..."
            optionFilterProp="label"
            value={currentMember}
            onChange={(item) => setCurrentMember(item)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={userData}
            disabled={!taskCreated}
          />
        </MyFormItem>
        <MyFormItem name="title" label="Title">
          <Input disabled={!taskCreated} />
        </MyFormItem>
        <MyFormItem name="description" label="Description">
          <Input disabled={!taskCreated} />
        </MyFormItem>
        <Button
          type="primary"
          htmlType="submit"
          className="flex justify-self-end"
        >
          OK
        </Button>
      </Form>
    </Modal>
  );
}
