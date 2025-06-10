import React, { useState } from "react";
import { MdArrowForwardIos, MdArrowBackIos  } from "react-icons/md";

function Slider({ movies, heading }) {

    const [curr, setCurr] = useState(0);
    function scrollLeft(){
        setCurr(curr <= 0? 0 : curr - 1)
    }

    function scrollRight(){
        setCurr(curr >= movies.length - 1? 0: curr + 1)
    }

  return (
    <div className="m-10">
      <h3 className="text-2xl text-amber-200 mb-5">{heading}</h3>

      <div className="flex  gap-7  overflow-hidden relative ">
        {movies.map((movie, index) => {
            
          return (
            <div
              key={movie.id}
              className="w-[12rem] h-[15rem] flex-shrink-0 flex transition ease duration-350 pb-5" style={{transform: `translateX(-${(curr * 13.9)}rem)`}}
            >
              <div className="flex flex-col w-1/5 h-full justify-end items-center gap-5">
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
            </div>
          );
        })}
        <div className="absolute right-0 h-full bg-gray-800 pl-10 flex flex-col gap-2 py-4" ><button onClick={() => {scrollRight()}} className="bg-gray-700  cursor-pointer hover:border-2 hover:border-gray-100 opacity-55 h-1/2 text-white text-2xl grid place-items-center  px-3 rounded-md"><MdArrowForwardIos/></button>
        <button onClick={() => {scrollLeft()}} className=" text-white text-2xl py-6 px-1 rounded-md grid place-items-center hover:border-2 hover:border-gray-100 bg-gray-700 opacity-60 cursor-pointer h-1/2"><MdArrowBackIos /></button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
