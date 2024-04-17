import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DisplayBooks from "../components/DisplayBooks";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="md:w-[20%]">
          <Sidebar />
        </div>
        <div className="md:w-[80%]">
          <DisplayBooks />
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}

export default Home;
