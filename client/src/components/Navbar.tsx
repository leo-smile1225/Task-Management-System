"use client";
import { getUrl } from "@/untile";
import { MenuOutlined, MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { SideContext } from "@/context/main";

const Navbar = () => {
  const path = usePathname();
  const { setShow } = useContext(SideContext);
  return (
    <div className="bg-[#3F51B5] w-full h-[60px] flex justify-between text-[32px] px-[52px] items-center">
      <Button
        type="primary"
        className="bg-transparent"
        shape="circle"
        icon={<MenuOutlined />}
        onClick={() => setShow(true)}
      />
      <p>{getUrl(path)}</p>
      <Button
        type="primary"
        className="bg-transparent"
        shape="circle"
        icon={<MoreOutlined />}
      />
    </div>
  );
};

export default Navbar;
