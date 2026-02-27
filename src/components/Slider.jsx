import React, { useState } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { NavLink } from "react-router";
import { GiFlowerStar } from "react-icons/gi";

function Slider({ movies, heading }) {
  const [curr, setCurr] = useState(0);
  function scrollLeft() {
    setCurr(curr <= 0 ? 0 : curr - 1);
  }

  function scrollRight() {
    setCurr(curr >= movies.length - 5 ? 0 : curr + 1);
  }
// decided to do two different ui slides for mobile and large view.
  return (
    <div className="md:m-10 m-5">
      <h3 className="text-2xl text-white font-bold mb-5">{heading}</h3>

{/* large screen version starts here */}
      <div className="md:flex  gap-7  overflow-hidden relative  hidden">
        {movies.map((movie, index) => {
          return (
            <NavLink
              to={`${movie.media_type === "tv" ? "series" : movie.media_type}/${movie.id}`}
              key={movie.id}
              className="w-[13rem] h-[18rem] flex-shrink-0 flex transition ease duration-350 pb-5"
              style={{ transform: `translateX(-${curr * 14.9}rem)` }}
            >
              <div className="flex flex-col w-1/5 h-full justify-end items-center gap-5 ">
                <p className="transform-[rotate(270deg)] w-full h-fit text-nowrap text-xl text-white">
                  {movie.title
                    ? movie.title.length > 15
                      ? movie.title.slice(0, 15) + "..."
                      : movie.title
                    : movie.name.length > 15
                      ? movie.name.slice(0, 15) + "..."
                      : movie.name}
                </p>
                <p className="text-2xl font-bold text-pink-300">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </p>
              </div>
              <img
                className="w-full h-full object-cover"
                src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                  movie.poster_path
                }`}
              />
            </NavLink>
          );
        })}
        <div className="absolute right-0 h-full bg-gray-800 pl-10 flex flex-col gap-2 py-4">
          <button
            onClick={() => {
              scrollRight();
            }}
            className="bg-gray-700  cursor-pointer hover:border-2 hover:border-gray-100 opacity-55 h-1/2 text-white text-2xl grid place-items-center  px-3 rounded-md"
          >
            <MdArrowForwardIos />
          </button>
          <button
            onClick={() => {
              scrollLeft();
            }}
            className=" text-white text-2xl py-6 px-1 rounded-md grid place-items-center hover:border-2 hover:border-gray-100 bg-gray-700 opacity-60 cursor-pointer h-1/2"
          >
            <MdArrowBackIos />
          </button>
        </div>
      </div>
      {/* large screen version ends here */}

{/* mobile starts here */}
      <div className="md:hidden flex relative w-full overflow-hidden">
        {movies.map((movie, index) => {
          return (
            <NavLink
              to={`${movie.media_type === "tv" ? "series" : movie.media_type}/${movie.id}`}
              key={movie.id}
              className="w-[12rem] h-[14rem] flex-shrink-0 flex transition ease duration-350 relative"
              style={{ transform: `translateX(-${curr * 12}rem)` }}
            >
              <img
                className=" w-full h-full object-cover"
                src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                  movie.poster_path
                }`}
              />
              <div className="absolute bottom-0 left-0 p-1">
                {/* used grid and place items center plus col-start-1 and row-start-1 to stack the things on top of each other. */}
                <div className=" relative w-[3.8rem] h-[3.8rem]  grid place-items-center"> 
                  <GiFlowerStar className=" text-slate-200 text-[3.8em] row-start-1  z-10 col-start-1"/>
                  {/* needed this circle to cover the hole in the flower icon */}
                  <div className="w-4 h-4 rounded-full bg-slate-200 row-start-1 z-20 col-start-1"></div>
                <p className=" text-2xl font-bold text-pink-600 row-start-1 col-start-1 z-30">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}

              </p>
                </div>
              </div>
            </NavLink>
          );
        })}

        <div className="absolute right-0 h-full bg-gray-800 flex flex-col gap-2">
          <button
            onClick={() => {
              scrollRight();
            }}
            className="bg-gray-700  cursor-pointer hover:border-2 hover:border-gray-100 opacity-55 h-1/2 text-white text-2xl grid place-items-center  px-3 rounded-md"
          >
            <MdArrowForwardIos />
          </button>
          <button
            onClick={() => {
              scrollLeft();
            }}
            className=" text-white text-2xl py-6 px-1 rounded-md grid place-items-center hover:border-2 hover:border-gray-100 bg-gray-700 opacity-60 cursor-pointer h-1/2"
          >
            <MdArrowBackIos />
          </button>
        </div>
        {/* mobile ends here */}
      </div>
    </div>
  );
}

export default Slider;
