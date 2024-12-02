import { upTaskProps } from "@/utils/interfacelist";
import {
  getAllSubtaskURL,
  reportSaveURL,
  updateSubtaskRUL,
} from "@/utils/untile";
import axios from "axios";
export const reportsend = async (text: string, id: string | undefined) => {
  const { data } = await axios.post(reportSaveURL, { text, id });
  console.log(data);
  return data;
};

export const updateTaskStatus = async (updateTaskitem: upTaskProps) => {
  const { data } = await axios.post(updateSubtaskRUL, updateTaskitem);
  console.log(updateTaskitem);
  return data;
};
export const getAllSubtask = async (_id: string | undefined) => {
  const { data } = await axios.get(getAllSubtaskURL + `/${_id}`);
  console.log(data);
  return data;
};
