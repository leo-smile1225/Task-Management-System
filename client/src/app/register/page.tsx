"use client";
import { authRegister } from "@/actions/authAcion";
import {
  LockOutlined,
  MailOutlined,
  UploadOutlined,
  UserOutlined,
  UserSwitchOutlined,
  //   UserSwitchOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Button,
  ConfigProvider,
  Input,
  message,
  Select,
  Upload,
} from "antd";
import axios from "axios";
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
    avatar: "",
  });
  const handleChangeavatar = async (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setUserdata({ ...userdata, avatar: info.file.response.url }); // Assuming the server returns the image URL
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSuccess(response.data);
    } catch (error) {
      onError(error);
    }
  };
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
        <div className="px-[50px] flex flex-col gap-[20px] mt-[39px]">
          <div className="flex justify-center">
            <Upload
              customRequest={customRequest}
              onChange={handleChangeavatar}
              showUploadList={false}
            >
              {userdata.avatar ? (
                <Avatar size={64} src={userdata.avatar} />
              ) : (
                <Avatar size={64} icon={<UserOutlined />} />
              )}
            </Upload>
          </div>
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
