import React from 'react';
import { Link } from 'react-scroll';

function Sidebar() {
  
  return (
    <div className="hidden md:flex flex-col justify-center items-center bottom-32 top-36 left- w-[250px] h-[70vh] fixed bg-gradient-to-b from-black to-gray-800 text-gray-300">
      <ul>
        <li className="px-4 cursor-pointer py-3 text-2xl capitalize">
            Genre
        </li>
        <li className="px-4 cursor-pointer py-3 text-2xl capitalize">
            Author
        </li>
        <li className="px-4 cursor-pointer py-3 text-2xl capitalize">
            Rating
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;