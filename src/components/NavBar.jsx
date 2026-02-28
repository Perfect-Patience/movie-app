import { useState } from "react";
import { NavLink } from "react-router";

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  function handleMenuClick() {
    setShowMenu(!showMenu);
  }
  return (
    <nav className="flex  justify-between items-center z-50 text-white bg-transparent md:px-15 px-5 md:pt-6 pt-2  text-xl absolute top-0 left-0 w-full">
      <NavLink to='/' className="flex justify-center items-center h-full">
        <img className="w-15" src="/logo.png" alt="logo" />
        <span className={`text-2xl text-white font-bold  md:block hidden`}>
          CinW<span className="text-3xl text-red-600">^</span>tch
        </span>
      </NavLink>

      <ul className="md:flex space-x-4 font-semibold hidden ">
        <NavLink to="/" className={``}>
          Home
        </NavLink>
        <NavLink to="/movies" className={``}>
          Movies
        </NavLink>
        <NavLink to="/series" className={``}>
          Series
        </NavLink>
      </ul>
      {/* hard coding these because just because i want to simulate my brain a bit No icons.*/}
      {showMenu ? (
        ""
      ) : (
        <div
          className="md:hidden flex gap-1 flex-col"
          onClick={() => handleMenuClick()}
        >
          {/* hambuger  */}
          <div className="w-5 h-0 border-1 border-gray-400"></div>
          <div className="w-5 h-0 border-1 border-gray-400"></div>
          <div className="w-5 h-0 border-1 border-gray-400"></div>
        </div>
      )}

      <div
        className={`${showMenu ? "flex" : "hidden"} transition-all ease-in-out duration-1000 p-5 flex-col absolute top-0 left-0 z-50 h-screen w-screen  bg-slate-800`}
      >
        <div
          className="h-5 w-5 flex justify-center items-center self-end "
          onClick={() => handleMenuClick()}
        >
          {/* close button */}
          <div className="h-5 w-0 rotate-45 absolute border-1 border-gray-300"></div>
          <div className="h-5 w-0 rotate-135 border-1 absolute border-gray-300"></div>
        </div>
        <ul className="flex-col flex gap-5 justify-center w-full items-center pt-10">
           
        <NavLink to="/" className={``}>
          Home
        </NavLink>
        <NavLink to="/movies" className={``}>
          Movies
        </NavLink>
        <NavLink to="/series" className={``}>
          Series
        </NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
