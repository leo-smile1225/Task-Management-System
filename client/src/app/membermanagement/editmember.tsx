"use client";
import React, { useState, useEffect } from "react";
import { ChildProps } from "./page";
import { Button, notification } from "antd";
import axios from "axios";

const BackendURL: string = "http://192.168.142.171:5000/api/auth";

const EditMember: React.FC<{ current: ChildProps | null }> = ({ current }) => {
  const [changeUser, setChangeUser] = useState<ChildProps | null>(null);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setChangeUser(current);
  }, [current]);

  const onChangeCurrentEarning = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (changeUser) {
      setChangeUser({
        ...changeUser,
        status: {
          ...changeUser.status,
          currentEarning: event.target.value,
        },
      });
    }
  };

  const onChangeExpectedEarning = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (changeUser) {
      setChangeUser({
        ...changeUser,
        status: {
          ...changeUser.status,
          expectedEarning: event.target.value, // Corrected property name
        },
      });
    }
  };

  const onChangeCurrentStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (changeUser) {
      setChangeUser({
        ...changeUser,
        status: {
          ...changeUser.status,
          currentStatus: event.target.value,
        },
      });
    }
  };

  if (!changeUser) {
    return null;
  }

  const updateUser = async () => {
    const openNotificationWithIcon = (
      type: "success" | "info" | "warning" | "error",
      description: string
    ) => {
      api[type]({
        message: description,
        className: "w-[200px] h-[60px]",
        duration: 1,
      });
    };

    try {
      const response = await axios.post(`${BackendURL}/updateuser`, changeUser);
      if (response.status === 200) {
        openNotificationWithIcon("success", "User updated successfully.");
      } else {
        openNotificationWithIcon("error", "Failed to update user.");
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        "An error occurred while updating user."
      );
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {contextHolder}
      <div className="text-[#dddddd] text-xl">{changeUser.username}</div>
      <table className="text-[#dddddd]">
        <tbody>
          <tr>
            <td className="w-[50%] text-center">Status</td>
            <td className="flex justify-center">
              <select
                className="bg-transparent outline-none text-center"
                value={changeUser.status.currentStatus}
                onChange={onChangeCurrentStatus}
              >
                <option
                  className="bg-[#999999] text-[12px] text-center text-[#333333]"
                  value="working"
                >
                  Working
                </option>
                <option
                  className="bg-[#999999] text-[12px] text-center text-[#333333]"
                  value="patient"
                >
                  Patient
                </option>
                <option
                  className="bg-[#999999] text-[12px] text-center text-[#333333]"
                  value="penalty"
                >
                  Penalty
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-center">Current Earning</td>
            <td className="flex justify-center">
              <input
                type="text"
                className="bg-transparent outline-none w-20"
                value={changeUser.status.currentEarning}
                onChange={onChangeCurrentEarning}
              />
            </td>
          </tr>
          <tr>
            <td className="text-center">Expected Earning</td>
            <td className="flex justify-center">
              <input
                type="text"
                className="bg-transparent outline-none w-20"
                value={changeUser.status.expectedEarning} // Corrected property name
                onChange={onChangeExpectedEarning}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Button type="primary" className="bg-[#3F51B5]" onClick={updateUser}>
        Update
      </Button>
    </div>
  );
};

export default EditMember;
