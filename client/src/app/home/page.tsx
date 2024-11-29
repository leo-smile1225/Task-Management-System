"use client";
import { Button } from "antd";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full bg-[#999999] h-[932px] flex flex-col justify-between">
      <p className="text-[40px] text-center pt-[222px]">Kaaj</p>
      <div className="w-full pl-[50px] pr-[50px] flex flex-col gap-[5px] pb-[180px]">
        <Link href={"/login"}>
          <Button
            className="bg-[#3F51B5] w-full h-[60px] rounded-[10px] border-[0] text-[32px] text-[white]"
            variant="solid"
          >
            Sign In
          </Button>
        </Link>
        <Link href={"/register"}>
          <Button
            className="bg-transparent w-full h-[60px] rounded-[10px] border-[0] text-[32px] text-[white] hover:bg-[#3F51B5]"
            variant="solid"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}
