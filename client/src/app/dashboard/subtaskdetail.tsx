"use client";

export default function SubTaskDetail(props: {
  title: string;
  detail: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[16px] text-[#DDDDDD]">{props.title}</div>
      <div className="text-[12px] text-[#BDBDBD]">{props.detail}</div>
    </div>
  );
}
