import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DisplayBooks from "../components/DisplayBooks";


function Home() {
  return (
    <>
    <div className="">
      <div className="flex flex-1">
        <div className="md:w-[20%]">
          <Sidebar />
        </div>
        <div className="md:w-[80%]">
          <DisplayBooks />
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
