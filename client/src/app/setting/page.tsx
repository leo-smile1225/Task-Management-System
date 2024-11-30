"use client";
import { createGroup, getAllGroup, setCurrentUser } from "@/actions/authAcion";
import useAuth from "@/hook/useAuth";
import { GetuserProps, Group, GroupListItem } from "@/utils/interfacelist";
import {
  MailOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Avatar, Input, Flex, Select, Button } from "antd";
import { useEffect, useState } from "react";
const Setting = () => {
  const { user, login } = useAuth();
  const [newGroup, setGroup] = useState("");
  const [grouplist, setGroupList] = useState<GroupListItem[]>([]);
  useEffect(() => {
    const initF = async () => {
      const user:GetuserProps = await setCurrentUser(); // JwtPayload | null
      if (user) login(user);
      const groups: Group[] = await getAllGroup(); // Adjust the type based on the return structure of this function
      if (!groups) return;
      const temp: GroupListItem[] = groups.map((value) => ({
        value: value.name,
        label: value.name,
      }));
      setGroupList(temp);
    };
    initF();
  }, []);
  const createGrouphandle = () => {
    if (newGroup.length == 0) return;
    createGroup(user?._id, newGroup);
  };
  const handleChange = () => {};
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
            prefix={<UserSwitchOutlined />}
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
              { value: "admin", label: "Admin" },
            ]}
            value={user?.role}
          />
          {user?.role == "leader" ? (
            <></>
          ) : (
            <Select
              prefix={<UsergroupAddOutlined />}
              className="bg-transparent w-full text-[16px] border-0 rounded-tr-[10px] rounded-tl-none rounded-bl-none text-white focus:bg-transparent"
              placeholder="Select a Group"
              // onChange={handleChange}
              options={grouplist}
              value={user?.groupID}
            />
          )}
          <Button type="primary" variant="solid" onClick={handleChange}>
            Change
          </Button>
        </Flex>
      </div>
      {user?.role == "leader" ? (
        <div className="bg-[#333333] flex gap-2 m-5 justify-between p-5 rounded-xl">
          <Input
            placeholder="Input new group name"
            name="newgroupame"
            prefix={<UsergroupAddOutlined />}
            onChange={(e) => setGroup(e.target.value)}
          />
          <Button type="primary" variant="solid" onClick={createGrouphandle}>
            Create Group
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Setting;
