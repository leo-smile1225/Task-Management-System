"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import Link from "next/link";
import { SideContext } from "@/context/main";
import { useContext, useEffect } from "react";
import "./style.css";
const Sidebar = () => {
  const items = [
    {
      key: 0,
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: 1,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: 2,
      label: <Link href="/notification">Notification</Link>,
    },
    {
      key: 3,
      label: <Link href="/tasks">Tasks</Link>,
    },
    {
      key: 5,
      label: <Link href="/calendar">Calendar</Link>,
    },
    {
      key: 6,
      label: <Link href="/setting">Settinga</Link>,
    },
    {
      key: 7,
      label: <Link href="#">Sign Out</Link>,
    },
  ];
  const { isSideview, setShow } = useContext(SideContext);

  useEffect(() => {}, [isSideview]);
  if (!isSideview) return <></>;
  else
    return (
      <div
        className={
          `w-full flex h-[932px] absolute z-10 ` +
          (isSideview ? "sider" : "nonesider")
        }
      >
        <div className="w-[300px] bg-[#3F51B5] h-[932px] text-white py-[135px] pl-[34px]">
          <div className="flex flex-col gap-[10px]">
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
            <p className="text-[18px]">{"userName"}</p>
            <p className="text-[16px]">{"user job"}</p>
          </div>
          <Menu
            className="bg-transparent text-[22px] mt-[20px]"
            items={items}
            theme="dark"
            defaultSelectedKeys={["0"]}
          />
        </div>
        <div
          className="w-[130px] bg-[#999999]"
          onClick={() => setShow(false)}
        ></div>
      </div>
    );
};

export default Sidebar;
