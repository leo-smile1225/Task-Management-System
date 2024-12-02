"use client";

import { setCurrentUser } from "@/actions/authAcion";
import { reportsend } from "@/actions/memberaction";
import useAuth from "@/hook/useAuth";
import { GetuserProps } from "@/utils/interfacelist";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";

const Profile = () => {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const reporthandle = async () => {
    const res = await reportsend(text, user?._id);
    if (res) {
      alert(res.message);
      setText("");
    } else {
      alert("sorry");
    }
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="bg-[#333333] flex gap-2 justify-between p-5 rounded-xl">
        <Input
          placeholder="Input new report"
          name="newreport"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="primary" variant="solid" onClick={reporthandle}>
          Send
        </Button>
      </div>
      <p className="text-center">Up comming Project</p>
      {/* <div className="bg-[#333333] flex flex-col gap-2 justify-between p-5 rounded-xl">
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
      </div> */}
    </div>
  );
};

export default Profile;
