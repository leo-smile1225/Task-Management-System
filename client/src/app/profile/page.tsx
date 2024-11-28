"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Profile = () => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <p className="text-center">Up comming Project</p>
      <div className="bg-[#333333] flex flex-col gap-2 justify-between p-5 rounded-xl">
        <div className="flex justify-between">
          <p>Working on wireframes of design</p>
          <Button
            type="primary"
            className="bg-transparent"
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </div>
        <p>{"today is ..."}</p>
        <p className="text-right">2024.11.11</p>
      </div>
    </div>
  );
};

export default Profile;
