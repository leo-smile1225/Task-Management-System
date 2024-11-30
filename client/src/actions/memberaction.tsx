import { reportSaveURL } from "@/utils/untile";
import axios from "axios";

export const reportsend = async (text: string, id: string | undefined) => {
  const { data } = await axios.post(reportSaveURL, { text, id });
  console.log(data);
  return data;
};
