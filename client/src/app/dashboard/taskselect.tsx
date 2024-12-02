"use client";
import { Select } from "antd";
import { MemberType } from "../taskmanagement/createtask";
import React, { SetStateAction } from "react";

export default function TaskSelect(props: {
  taskList: MemberType[];
  currentTaskId: string;
  setCurrentTaskId: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Search to Select"
      optionFilterProp="label"
      value={props.currentTaskId}
      onChange={(item) => props.setCurrentTaskId(item)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={props.taskList}
    />
  );
}
