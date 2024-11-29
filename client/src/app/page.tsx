import { redirect } from "next/navigation";
// import useAuth from "@/hook/useAuth";
// import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

export default function Home() {
  // const { login } = useAuth();
  // alert(0);
  // useEffect(() => {
  //   // Get data from localStorage when the component mounts
  //   const storedData = localStorage.getItem("usertoken");
  //   const decoded = jwtDecode(storedData);
  //   console.log(JSON.parse(decoded));
  //   if (storedData) {
  //     login(JSON.parse(decoded));
  //   }
  // }, []);
  redirect("/home");
}
