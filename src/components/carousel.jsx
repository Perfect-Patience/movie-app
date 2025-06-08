import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import React, { useState } from "react";
function Carousel({ trending }) {
  const slides = trending.slice(0, 8);
  const maxIndex = slides.length - 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex(((prev) => prev === maxIndex ? 0 : prev + 1)); 
  }

  const handlePrevious  = () => {
    (setCurrentIndex(((prev) => prev === 0 ? maxIndex : prev - 1)));
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden flex justify-between items-center ">
      <button onClick={() => handlePrevious(currentIndex)} className=" h-[4rem] w-[4rem] absolute  z-50 left-0 hover:opacity-100 cursor-pointer bg-gray-900 opacity-50 rounded-full grid place-items-center text-2xl text-white">
        <FaLessThan />
      </button>
      <div className="w-screen h-screen flex  transition-transform duration-700 ease" style={{transform: `translateX(-${currentIndex * 100}vw)`}} >
        {slides.map((movie, index) => {
          console.log(movie);
          const isActive = index === currentIndex;
          const bgURl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
          return (
            <div
              key={movie.id}
              style={{ backgroundImage: `url(${bgURl})` }}
              className={`w-screen h-screen flex-shrink-0 bg-cover bg-no-repeat bg-center relative  flex items-center `}
            >
              <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-75 z-0"></div>
              <div className=" w-screen z-40 flex justify-between text-white h-fit  p-20 ">
                <div className="w-1/2 flex flex-col gap-10 ">
                  <h2 className="text-6xl font-bold font-serif">{movie.title ? movie.title : movie.name }</h2>

                  <p className="text-xl">
                   {movie.overview}
                  </p>
                  <div className="flex gap-6">
                    <button className="bg-red-700 px-4 cursor-pointer py-2 rounded-4xl text-xl ">
                      Watch Now
                    </button>
                    <button className="bg-none border-2 cursor-pointer border-white px-4 py-3 rounded-4xl text-xl">
                      Watch Trailer
                    </button>
                  </div>
                </div>
                <div className="w-1/2 flex justify-end">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    className={` rounded-lg transition-all duration-1000 ease-in-out ${isActive ? 'h-[30rem]': 'h-[0rem]' }`}
                  /></div>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => handleNext(currentIndex)} className=" h-[4rem] w-[4rem] z-50 bg-gray-900 opacity-50 absolute right-0 rounded-full grid place-items-center cursor-pointer hover:opacity-100 text-2xl text-white">
        <FaGreaterThan />
      </button>
    </div>
  );
}

export default Carousel;
