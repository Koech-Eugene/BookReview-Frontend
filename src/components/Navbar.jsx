import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function Navbar() {
  const [nav, setNave] = useState(false);

  const links = [
    {
      id: 1,
      link: "Home",
      route:"/"
    },
    {
      id: 2,
      link: "post",
      route:"post"
    },
   
    {
      id: 3,
      link: "Bookmarks",
      route:"bookmarks"
    },
    {
      id: 4,
      link: "Login",
      route:"login"
    },
  ];

  return (
    <header>
      <nav className="flex justify-between items-center w-full bg-gray-800 text-white fixed h-20">
        <div>
          <Link to="/" >
          <h2 className="text-gray-400 font-bold
          ">NarrativeNexus</h2>
          </Link>
        </div>
        <div>
          <ul className="hidden md:flex">
            {links.map(({ id, link, route }) => (
              <li
                key={id}
                className="cursor-pointer px-4 capitalize font-semibold text-gray-600 hover:text-blue-600 hover:scale-110 duration-200 "
              >
                <Link to={route} >{link}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="cursor-pointer pr-4 z-10 text-gray-200 md:hidden"
          onClick={() => setNave(!nav)}
        >
          {nav ? <IoClose size={30} /> : <IoMenu size={30} />}
        </div>
        {nav && (
          <ul className="flex flex-col justify-center items-center top-0 right-0 w-[250px] h-[400px] absolute bg-gradient-to-b from-black to-gray-800 text-gray-300">
            {links.map(({ id, link, route }) => (
              <li
                key={id}
                className="px-4 cursor-pointer py-3 text-2xl capitalize"
              >
                <Link to={route} smooth duration={500}>{link}</Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Navbar;