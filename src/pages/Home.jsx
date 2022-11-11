import React, { useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import HeroImg from "../assets/analysis.png";

export default function Home() {
  useEffect(() => {
    function goToLogin() {
      redirect("/login");
    }
    goToLogin();
  }, []);

  return (
    <div id="home" className="flex flex-col p-8 md:px-[100px] h-full w-full ">
      {/* title */}
      <div className="flex flex-col items-center justify-center pt-32 pb-20  gap-4">
        <h1 className="text-xl md:text-6xl text-center font-extrabold text-slate-800 leading-snug md:leading-tight">
          Training Portal
          {/* <span className="text-blue-700">synced automatically.</span>{" "} */}
        </h1>
        <h4 className="text-slate-500  text-lg md:text-xl">
          Manage, Create, and Delete Batches, Feedback etc
        </h4>

        <div className="max-w-xs flex items-center justify-center overflow-x-auto sm:overflow-visible">
          <img src={HeroImg} alt="training portal image" />
        </div>

        <div className="w-full flex justify-center p-2">
          <Link to="/login">
            <button className="grow group flex items-center justify-center gap-4 text-slate-100 bg-blue-700  font-semibold px-4 py-2 max-w-[250px] rounded-lg hover:bg-blue-600 ">
              Login
              <span className="text-xl group-hover:translate-x-1.5 duration-200">
                <HiOutlineArrowNarrowRight />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
