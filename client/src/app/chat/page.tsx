"use client";
import useAuth from "@/hook/useAuth";
import { BackendURL } from "@/utils/untile";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

interface MSGTYPE {
  avatar: string | undefined;
  username: string | undefined;
  time: string;
  content: string;
}
const APP_HOST = "http://192.168.142.171:5000";


const Chat: React.FC = () => {
  const [msgList, setMsgList] = useState<MSGTYPE[]>([]);
  const { user } = useAuth();
  const [msgText, setMsgText] = useState<string>("");

  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(APP_HOST);
    socket.current.on("msg-receive", (msg) => {
      if (msg) {
        setMsgList((msgList) => [...msgList, msg]);
      }
      return socket.current?.off("msg-receive");
    });
  }, []);

  const handlSend = () => {
    const date = new Date();
    const currentTime =
      (date.getHours().toString().length < 2
        ? "0" + date.getHours().toString()
        : date.getHours().toString()) +
      ":" +
      (date.getMinutes().toString().length < 2
        ? "0" + date.getMinutes().toString()
        : date.getMinutes().toString()) +
      ":" +
      (date.getSeconds().toString().length < 2
        ? "0" + date.getSeconds().toString()
        : date.getSeconds().toString());
    const newMsg: MSGTYPE = {
      avatar: user?.avatar,
      username: user?.username,
      time: currentTime,
      content: msgText,
    };
    socket.current?.emit("msg-send", newMsg);
  };

  return (
    <div className="w-full min-h-[872px] bg-[#424242] p-5 flex flex-col justify-between">
      <div className="flex flex-col h-[750px] overflow-auto">
        {msgList && msgList.map((item, index) => (
          <div key={index}>
            <div
              className={
                "py-2 px-4 bg-[#333333] rounded-[10px] flex gap-5 items-center " +
                (index % 2 === 1 ? "flex-row-reverse" : "")
              }
            >
              {item.avatar ? (
                <Avatar size={64} src={item.avatar}/>
              ) : (
                <Avatar size={64} icon={<UserOutlined />} />
              )}
              
              <div className="flex flex-col grow">
                <div
                  className={
                    "text-[#DDDDDD] text-[20px] " +
                    (index % 2 === 1 ? "text-right" : "")
                  }
                >
                  {item.username}
                </div>
                <div className="text-[#BDBDBD] text-[16px]">{item.content}</div>
              </div>
            </div>
            <div
              className={
                "mt-2 text-[#BDBDBD] " + (index % 2 === 1 ? "text-right" : "")
              }
            >
              {item.time}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center bg-[#333333] p-3 rounded-md">
        <input
          type="text"
          placeholder="Your Message..."
          className="text-[#BDBDBD] bg-transparent grow text-[16px] outline-none"
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
        />
        <Button type="primary" onClick={handlSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
