"use client";
import useAuth from "@/hook/useAuth";
import {
  MailOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Avatar, Input, Flex, Select, Button } from "antd";
const Setting = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="bg-[#333333] flex gap-2 m-5 justify-between p-5 rounded-xl">
        <Avatar shape="square" size={128} icon={<UserOutlined />} />
        <Flex gap="middle" vertical>
          <Input
            placeholder="Email"
            name="email"
            prefix={<MailOutlined />}
            value={user?.email}
          />
          <Input
            placeholder="UserName"
            name="username"
            prefix={< UserSwitchOutlined/>}
            value={user?.username}
          />
          <Select
            prefix={<UserSwitchOutlined />}
            className="bg-transparent w-full text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
            // defaultValue="GroupMember"
            // onChange={handleChange}
            placeholder="Select yout role"
            options={[
              { value: "leader", label: "Group Leader" },
              { value: "member", label: "Group Member" },
            ]}
            value={user?.role}
          />
          <Select
            prefix={<UsergroupAddOutlined />}
            className="bg-transparent w-full text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
            placeholder="Select a Group"
            // onChange={handleChange}
            options={[
              { value: "Group1", label: "Group1" },
              { value: "Group2", label: "Group2" },
            ]}
            value={user?.groupID}
          />
          <Button type="primary" variant="solid">
            Change
          </Button>
        </Flex>
      </div>
      <div className="bg-[#333333] flex gap-2 m-5 justify-between p-5 rounded-xl">
        <Input
          placeholder="Input new group name"
          name="newgroupame"
          prefix={<UsergroupAddOutlined />}
        />
        <Button type="primary" variant="solid">
          Create Group
        </Button>
      </div>
    </div>
  );
};

export default Setting;
