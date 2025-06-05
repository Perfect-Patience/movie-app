import React from "react";

function NavBar() {
  return (
    <nav className="flex  justify-between text-white bg-transparent p-4 text-2xl ">
      <div className="">EP Movies</div>
      
        <ul className="flex space-x-4">
            <li>Home</li>
            <li>Movies</li>
            <li>Series</li>
        </ul>
    </nav>
  );
}

export default NavBar;
