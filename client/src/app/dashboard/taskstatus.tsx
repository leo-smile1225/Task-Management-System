"use client";
import { Progress } from "antd";

export default function TaskStatus(props: {
  percentNum: number;
  title: string;
}) {
  return (
    <Progress
      trailColor="#555555"
      size={100}
      type="dashboard"
      strokeColor="#3F51B5"
      percent={props.percentNum}
      format={(percent) => (
        <div>
          <p className="text-[#DDDDDD] text-[20px]">{percent}%</p>
          <p className="text-[#BDBDBD] text-[12px]">{props.title}</p>
        </div>
      )}
    />
  );
}
