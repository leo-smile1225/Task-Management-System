"use client";
import React, { useEffect, useState } from "react";
import EditMember from "./editmember";
import axios from "axios";

const BackendURL: string = "http://192.168.142.171:5000/api/auth";

// const userData = [
//   {
//     id: "1",
//     username: "first",
//     status: {
//       currentStatus: "working",
//       currentEarning: "120",
//       expectedEarning: "300",
//     },
//   },
//   {
//     id: "2",
//     username: "second",
//     status: {
//       currentStatus: "patient",
//       currentEarning: "120",
//       expectedEarning: "300",
//     },
//   },
//   {
//     id: "3",
//     username: "third",
//     status: {
//       currentStatus: "penalty",
//       currentEarning: "120",
//       expectedEarning: "300",
//     },
//   },
// ];

export interface ChildProps {
  _id: string;
  username: string;
  status: {
    currentStatus: string;
    currentEarning: string;
    expectedEarning: string;
  };
}

export default function MemberManagement() {
  const [userData, setUserData] = useState<ChildProps[] | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(BackendURL + "/getAllUsers");
      setUserData(data);
    };
    getUser();
    console.log("12");
  }, []);

  const [filterText, setFilterText] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<ChildProps | null>(null);

  if (!userData) return;

  const filteredUsers = userData.filter((user) =>
    user.username.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClickUser = (user: ChildProps) => {
    setCurrentUser(user);
  };

  return (
    <div className="w-full min-h-screen bg-[#424242] p-5 flex flex-col gap-10">
      <div className="px-5 py-8 grow bg-[#333333] rounded-[20px] flex flex-col gap-8">
        <div className="text-[#DDDDDD] text-2xl text-center">Group Members</div>
        <input
          className="w-full text-[16px] px-3 py-1 bg-[#999999] rounded-md focus:outline-[#3F51B5] focus:outline-4 placeholder:text-[#DDDDDD] text-[#DDDDDD]"
          placeholder="Search..."
          value={filterText}
          onChange={(event) => setFilterText(event.target.value)}
        />
        <table className="border-[#999999] border-2">
          <thead>
            <tr className="text-[#999999]">
              <th className="border-[#999999] border-2 w-[20%]">No</th>
              <th className="border-[#999999] border-2 w-[80%]">User</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((item, index) => (
              <tr
                className="text-[#999999] border-[#999999] border-2 text-center hover:bg-[#3F51B5] hover:cursor-pointer"
                key={item._id} // Use unique id for key
                onClick={() => handleClickUser(item)} // Pass whole user object
              >
                <td className="w-[20%]">{index + 1}</td>
                <td className="border-[#999999] border-2 w-[80%]">
                  {item.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditMember current={currentUser} />
      </div>
    </div>
  );
}
