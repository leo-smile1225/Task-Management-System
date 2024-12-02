"use client";
import { ReactElement, useEffect, useState } from "react";
import TaskStatus from "./taskstatus";
import { redirect } from "next/navigation";
import TaskSelect from "./taskselect";
import SubTaskDetail from "./subtaskdetail";
import axios from "axios";
import { BackendURL } from "@/utils/untile";
import { DataType } from "../taskmanagement/page";
import { MemberType } from "../taskmanagement/createtask";

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

const leader = true;

export default function Dashboard() {
  const [currentTaskId, setCurrentTaskId] = useState<string>("");
  const [tasks, setTasks] = useState<MemberType[]>([
    {
      label: "",
      value: "",
      description: "",
    },
  ]);
  const [percent, setPercent] = useState<number[]>([0, 0, 0]);

  const hadleClickMembers = () => {
    if (!leader) return;
    redirect("/membermanage");
  };

  useEffect(() => {
    const getTaskList = async () => {
      const { data } = await axios.get(BackendURL + "/task/getTask");
      const newData: MemberType[] = data.map((item: any, index: number) => ({
        value: item._id,
        label: item.title,
      }));
      setTasks(newData);
      setCurrentTaskId(newData[0].value);
    };
    getTaskList();
  }, []);

  useEffect(() => {
    const getTaskPercent = async () => {
      const { data } = await axios.post(BackendURL + "/task/getPercent", {
        task_id: currentTaskId,
      });
      if (data.p == null) setPercent([0, 0, 0]);
      else setPercent([data.c, data.ps, data.p]);
    };
    getTaskPercent();
  }, [currentTaskId]);

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
            currentTaskId={currentTaskId}
            setCurrentTaskId={setCurrentTaskId}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-[#DDDDDD] text-xl px-2">Statics</div>
          <div className="px-2 flex justify-between">
            <TaskStatus percentNum={percent[0]} title="Completed" />
            <TaskStatus percentNum={percent[1]} title="Pending" />
            <TaskStatus percentNum={percent[2]} title="Failed" />
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-auto">
          {/* <SubTaskDetail
            title={currentTask.label}
            detail={currentTask.description}
          /> */}
        </div>
      </div>
    </div>
  );
}
