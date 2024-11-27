"use client";
import { Select } from "antd";

export default function TaskSelect(props: {
  taskList: { value: string; label: string }[];
  currentTask: string;
  setCurrentTask: any;
}) {
  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Search to Select"
      optionFilterProp="label"
      value={props.currentTask}
      onChange={(item) => props.setCurrentTask(item)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={props.taskList}
    />
  );
}
