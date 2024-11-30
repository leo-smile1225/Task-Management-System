"use client";
import { authRegister } from "@/actions/authAcion";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  UserSwitchOutlined,
  //   UserSwitchOutlined,
} from "@ant-design/icons";
// import { Select } from "antd";

import { Button, ConfigProvider, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Register = () => {
  const navigate = useRouter();

  const [userdata, setUserdata] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    role: "member",
  });
  const handleStateChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUserdata({ ...userdata, [event.target.name]: event.target.value });
  };

  const handleSub = async () => {
    const res = await authRegister(userdata);
    console.log("==>", res);

    if (res.status == true) {
      navigate.push("/login");
    } else if (res.error) {
      alert(res.error);
    }
  };
  const handleChange = (value: string) => {
    setUserdata({ ...userdata, role: value });
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            selectorBg: "transparnet",
            multipleItemBg: "blue",
            optionSelectedColor: "white",
          },
          Input: {
            colorBgContainer: "transparent",
            addonBg: "blue",
          },
        },
      }}
    >
      <div className="w-full bg-[#999999] h-[932px]">
        <p className="text-[32px] text-center pt-[131px]">Sign Up</p>
        <div className="px-[50px] flex flex-col gap-[50px] mt-[39px]">
          <div className="flex  border-[1px] border-white rounded-[10px]">
            <UserOutlined className="border-r border-r-white px-[15px]" />
            <Input
              className=" h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none"
              placeholder="Username"
              name="username"
              value={userdata.username}
              onChange={handleStateChange}
            />
          </div>
          <div className="flex  border-[1px] border-white rounded-[10px]">
            <MailOutlined className="border-r border-r-white px-[15px]" />
            <Input
              className=" h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none"
              value={userdata.email}
              placeholder="Email"
              name="email"
              onChange={handleStateChange}
            />
          </div>

          <div className="flex  border-[1px] border-white rounded-[10px]">
            <UserSwitchOutlined className="border-r border-r-white px-[15px]" />
            <Select
              className="w-full h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none"
              defaultValue="member"
              onChange={handleChange}
              options={[
                { value: "leader", label: "Group Leader" },
                { value: "member", label: "Group Member" },
              ]}
            />
          </div>
          <div className="flex  border-[1px] border-white rounded-[10px]">
            <LockOutlined className="border-r border-r-white px-[15px]" />
            <Input
              className=" h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none"
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
              className=" h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none"
              type="password"
              placeholder="Password"
              name="password2"
              value={userdata.password2}
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
    </ConfigProvider>
  );
};

export default Register;
