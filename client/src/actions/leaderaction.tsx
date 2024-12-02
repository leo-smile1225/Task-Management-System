import { getReportURL, deleteReportURL } from "@/utils/untile";
import axios from "axios";

export const getReport = async () => {
  const { data } = await axios.get(getReportURL);
  console.log(data);
  return data;
};

export const deleteReportItem = async (id: string) => {
  const { data } = await axios.delete(deleteReportURL + `/${id}`);
  console.log(data);
};
