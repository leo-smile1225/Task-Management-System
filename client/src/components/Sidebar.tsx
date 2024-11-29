"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import Link from "next/link";
import "./style.css";
import useSide from "@/hook/useSide";
import useAuth from "@/hook/useAuth";

const Sidebar: React.FC = () => {
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
      label: <Link href="/setting">Setting</Link>,
    },
    {
      key: 7,
      label: <Link href="#">Sign Out</Link>,
    },
  ];
  const adminitems = [
    {
      key: 0,
      label: <Link href="/admin">Admin</Link>,
    },
    {
      key: 1,
      label: <Link href="/setting">Setting</Link>,
    },
  ];
  const leaderitems = [
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
      label: <Link href="/setting">Setting</Link>,
    },
    {
      key: 7,
      label: <Link href="/taskmanagement">Task Management</Link>,
    },
    {
      key: 8,
      label: <Link href="/usermanagement">User Management</Link>,
    },
    {
      key: 9,
      label: <Link href="#">Sign Out</Link>,
    },
  ];
  const { isSideview, setShow } = useSide();
  const { user } = useAuth();
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
            <Avatar shape="square" size={128} icon={<UserOutlined />} />
            <p className="text-[18px]">{user?.username}</p>
            <p className="text-[16px]">{user?.email}</p>
          </div>
          <Menu
            className="bg-transparent text-[22px] mt-[20px]"
            items={
              user?.role == "admin"
                ? adminitems
                : user?.role == "leader"
                ? leaderitems
                : items
            }
            theme="dark"
            defaultSelectedKeys={["0"]}
            onClick={() => setShow(false)}
          />
        </div>
        <div
          className="w-[130px] bg-[#999999]"
          onClick={() => {
            setShow(false);
          }}
        ></div>
      </div>
    );
};

export default Sidebar;
