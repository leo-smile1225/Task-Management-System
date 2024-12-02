"use client";
import { Upload, message } from "antd";
import { authLogin } from "@/actions/authAcion";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { PayProps } from "@/utils/interfacelist";
export default function Login() {
  const { login } = useAuth();

  const navigate = useRouter();
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });
  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserdata({ ...userdata, [event.target.name]: event.target.value });
  };

  const handleSub = async () => {
    const res: PayProps = await authLogin(userdata);
    if (res.status) {
      login(res.decoded);
      message.success(`Login successfully`);
      navigate.push("/dashboard");
    } else {
      message.warning(`Login Failed`);
    }
  };
  return (
    <div className="w-full bg-[#999999] h-[932px]">
      <p className="text-[32px] text-center pt-[131px]">Sign In</p>
      <div className="px-[50px] flex flex-col gap-[50px] mt-[234px]">
        <div className="flex border-[1px] border-white rounded-[10px]">
          <MailOutlined className="border-r border-r-white px-[15px]" />
          <Input
            className="bg-transparent h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
            placeholder="Username"
            onChange={handleStateChange}
            name="email"
          />
        </div>

        <div className="flex border-[1px] border-white rounded-[10px]">
          <LockOutlined className="border-r border-r-white px-[15px]" />
          <Input
            className="bg-transparent h-[50px] text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
            type="password"
            placeholder="Password"
            onChange={handleStateChange}
            name="password"
          />
        </div>

        <Button
          className="bg-[#3F51B5] h-[50px] rounded-[10px] border-[0px] text-[16px] text-[white] hover:"
          block
          type="primary"
          onClick={handleSub}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
