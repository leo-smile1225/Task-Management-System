"use client";
import { ReactElement, useState } from "react";
import TaskStatus from "./taskstatus";
import { redirect } from "next/navigation";
import TaskSelect from "./taskselect";
import SubTaskDetail from "./subtaskdetail";

const avatars: ReactElement[] = [
  <svg width="60" height="60" viewBox="0 0 60 60" key={0}>
    <rect id="_1" data-name="1" width="60" height="60" rx="10" fill="#999" />
  </svg>,
  <svg width="60" height="60" viewBox="0 0 60 60" key={1}>
    <rect id="_1" data-name="1" width="60" height="60" rx="10" fill="#999" />
  </svg>,
  <svg width="60" height="60" viewBox="0 0 60 60" key={2}>
    <rect id="_1" data-name="1" width="60" height="60" rx="10" fill="#999" />
  </svg>,
  <svg width="60" height="60" viewBox="0 0 60 60" key={1}>
    <rect id="_1" data-name="1" width="60" height="60" rx="10" fill="#999" />
  </svg>,
  <svg width="60" height="60" viewBox="0 0 60 60" key={2}>
    <rect id="_1" data-name="1" width="60" height="60" rx="10" fill="#999" />
  </svg>,
  <svg width="60" height="60" viewBox="0 0 60 60" key={1}>
    <rect id="_1" data-name="1" width="60" height="60" rx="10" fill="#999" />
  </svg>,
  <svg width="60" height="60" viewBox="0 0 60 60" key={2}>
    <rect id="_1" data-name="1" width="60" height="60" rx="10" fill="#999" />
  </svg>,
  <svg width="60" height="60" viewBox="0 0 60 60" key={1}>
    <rect id="_1" data-name="1" width="60" height="60" rx="10" fill="#999" />
  </svg>,
  <svg width="60" height="60" viewBox="0 0 60 60" key={2}>
    <rect id="_1" data-name="1" width="60" height="60" rx="10" fill="#999" />
  </svg>,
];

const percentNumber: number[] = [20, 55, 25];

const tasks = [
  {
    value: "123123",
    label: "first",
  },
  {
    value: "7685478",
    label: "second",
  },
  {
    value: "345689",
    label: "third",
  },
];

const leader = true;

export default function Dashboard() {
  const [currentTaskId, setCurrentTaskId] = useState("");

  const hadleClickMembers = () => {
    if (!leader) return;
    redirect("/membermanage");
  };

  return (
    <div className="w-full h-[872px] bg-[#424242] p-5 flex flex-col gap-10">
      <div className="px-5 py-8 bg-[#333333] rounded-[20px] flex flex-col gap-8">
        <div
          className="text-[#DDDDDD] text-2xl text-center"
          onClick={hadleClickMembers}
        >
          Group Members
        </div>
        <div className="w-full flex gap-2 overflow-auto px-2">
          {avatars.map((item: ReactElement, index: number) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-[#DDDDDD] text-xl px-2">Statics</div>
          <div className="px-2 flex justify-between">
            <TaskStatus percentNum={percentNumber[0]} title="Working" />
            <TaskStatus percentNum={percentNumber[1]} title="Patient" />
            <TaskStatus percentNum={percentNumber[2]} title="Penalty" />
          </div>
        </div>
      </div>
      <div className="px-5 py-8 bg-[#333333] rounded-[20px] flex flex-col gap-8">
        <div className="text-[#DDDDDD] text-2xl text-center">Tasks</div>
        <div className="w-full flex gap-2 overflow-auto px-2">
          <TaskSelect
            taskList={tasks}
            currentTask={currentTaskId}
            setCurrentTask={setCurrentTaskId}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-[#DDDDDD] text-xl px-2">Statics</div>
          <div className="px-2 flex justify-between">
            <TaskStatus percentNum={percentNumber[0]} title="Completed" />
            <TaskStatus percentNum={percentNumber[1]} title="Pending" />
            <TaskStatus percentNum={percentNumber[2]} title="Failed" />
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-auto">
          <SubTaskDetail title="first" detail="in detail" />
        </div>
      </div>
    </div>
  );
}
