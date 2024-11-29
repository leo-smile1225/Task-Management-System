import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  no: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
    width: "20%",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "80%",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    no: 32,
  },
];

const MemberList: React.FC = () => (
  <Table<DataType>
    columns={columns}
    dataSource={data}
    className="bg-transparent"
  />
);

export default MemberList;
