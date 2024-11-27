"use client";
import { authRegister } from "@/actions/authAcion";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Select } from "antd";

import { Button, Input } from "antd";
import { useEffect, useState } from "react";
const Register = () => {
  const [userdata, setUserdata] = useState({
    email: "",
    username: "",
    password: "",
    passwordcon: "",
    role: "",
  });
  const handleStateChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUserdata({ ...userdata, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    console.log(userdata);
  }, [userdata]);
  const handleSub = () => {
    authRegister(userdata);
  };
  const handleChange = (value: string) => {
    setUserdata({ ...userdata, role: value });
  };
  return (
    <div className="w-full bg-[#999999] h-[932px]">
      <p className="text-[32px] text-center pt-[131px]">Sign Up</p>
      <div className="px-[50] flex flex-col gap-[50] mt-[39px]">
        <div className="flex  border-[1px] border-white rounded-[10px]">
          <UserSwitchOutlined className="border-r border-r-white px-[15px]" />
          <Select
            className="bg-transparent w-full h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
            defaultValue="GroupMember"
            onChange={handleChange}
            options={[
              { value: "leader", label: "Group Leader" },
              { value: "member", label: "Group Member" },
            ]}
          />
        </div>
        <div className="flex  border-[1px] border-white rounded-[10px]">
          <UserOutlined className="border-r border-r-white px-[15px]" />
          <Input
            className="bg-transparent h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
            placeholder="Email"
            name="email"
            value={userdata.email}
            onChange={handleStateChange}
          />
        </div>
        <div className="flex  border-[1px] border-white rounded-[10px]">
          <MailOutlined className="border-r border-r-white px-[15px]" />
          <Input
            className="bg-transparent h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
            placeholder="Username"
            value={userdata.username}
            onChange={handleStateChange}
            name="username"
          />
        </div>

        <div className="flex  border-[1px] border-white rounded-[10px]">
          <LockOutlined className="border-r border-r-white px-[15px]" />
          <Input
            className="bg-transparent h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
            type="password"
            placeholder="Password"
            name="password"
            value={userdata.password}
            onChange={handleStateChange}
          />
        </div>
        <div className="flex  border-[1px] border-white rounded-[10px]">
          <LockOutlined className="border-r border-r-white px-[15px]" />
          <Input
            className="bg-transparent h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
            type="password"
            placeholder="Password"
            name="passwordcon"
            value={userdata.passwordcon}
            onChange={handleStateChange}
          />
        </div>
        <Button
          className="bg-[#3F51B5] h-[50px] rounded-[10px] border-[0px] text-[16px] text-[white] hover:"
          block
          type="primary"
          onClick={handleSub}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Register;
