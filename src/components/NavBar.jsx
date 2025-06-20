import React from "react";
import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav className="flex  justify-between z-50 text-white bg-transparent px-15 pt-5 pb-20 text-2xl absolute top-0 left-0 w-full">
      <div >EM Movies</div>
      
        <ul className="flex space-x-4">
            <NavLink to="">Home</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/series">Series</NavLink>
           
        </ul>
    </nav>
  );
}

export default NavBar;
