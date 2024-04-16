import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-scroll";

function Navbar() {
  const [nav, setNave] = useState(false);

  const links = [
    {
      id: 1,
      link: "home",
    },
    {
      id: 2,
      link: "post",
    },
   
    {
      id: 3,
      link: "Bookmarks",
    },
    {
      id: 4,
      link: "Login",
    },
  ];

  return (
    <header>
      <nav className="flex justify-between items-center w-full h-20 bg-blue-300 text-white fixed">
        <div>
          <Link to="home" smooth duration={500}>
          <img src="data:image/jpeg;base64,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" alt="" className="size-20"/>
          </Link>
        </div>
        <div>
          <ul className="hidden md:flex">
            {links.map(({ id, link }) => (
              <li
                key={id}
                className="cursor-pointer px-4 capitalize font-semibold text-gray-600 hover:text-blue-600 hover:scale-110 duration-200 "
              >
                <Link to={link} smooth duration={500}>{link}</Link>
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
            {links.map(({ id, link }) => (
              <li
                key={id}
                className="px-4 cursor-pointer py-3 text-2xl capitalize"
              >
                <Link to={link} smooth duration={500}>{link}</Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Navbar;