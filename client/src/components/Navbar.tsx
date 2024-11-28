"use client";
import { getUrl } from "@/utils/untile";
import { MenuOutlined, MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { usePathname } from "next/navigation";
import useAuth from "@/hook/useAuth";
import useSide from "@/hook/useSide";

const Navbar: React.FC = () => {
  const path = usePathname();
  const { isLoggedIn } = useAuth();
  const { setShow } = useSide();

  if (!isLoggedIn) return <></>;
  return (
    <div className="bg-[#3F51B5] w-full h-[60px] flex justify-between text-[32px] px-[32px] items-center">
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
