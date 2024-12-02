"use client";
import { deleteReportItem, getReport } from "@/actions/leaderaction";
import { ReportItemProps, ReportProps } from "@/utils/interfacelist";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
const Report = () => {
  const [list, setlist] = useState<ReportItemProps[]>([]);
  const initF = async () => {
    const rep: ReportProps[] = await getReport();
    if (!rep) return;
    const temp: ReportItemProps[] = rep.map((item) => ({
      _id: item._id,
      text: item.text,
      name: item.name[0],
    }));
    setlist(temp);
  };
  useEffect(() => {
    initF();
  }, []);
  const deleteHandle = (id: string) => {
    deleteReportItem(id);
    initF();
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      <p className="text-center">Report List</p>
      {list
        ? list.map((item, index) => (
            <div
              key={index}
              className="bg-[#333333] flex flex-col gap-2 justify-between p-5 rounded-xl"
            >
              <div className="flex justify-between">
                <p>{item.text}</p>
                <div className="flex justify-between">
                  <Button
                    type="primary"
                    className="bg-transparent"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={(e) => deleteHandle(item._id)}
                  />
                </div>
              </div>
              <p className="text-right">{item.name}</p>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Report;
