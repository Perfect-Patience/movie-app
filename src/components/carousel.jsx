import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import React, { useState } from "react";
import { NavLink } from "react-router";
import { useEffect } from "react";
function Carousel({ trending }) {
  const slides = trending.slice(0, 8);
  const maxIndex = slides.length - 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  // preloads backdrop images and stores in memory to prevent page and carousel loading while the image is blank.
  useEffect(() => {
    slides.forEach((movie) => {
      const img = new Image(); // creates the new image object.
      img.src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`; //so with this, the image is preloaded and stored.
    });
  });

 

  return (
    <div className="max-w-screen md:h-screen h-fit relative overflow-hidden flex justify-between items-center ">
      <button
        onClick={() => handlePrevious(currentIndex)}
        className=" md:h-[4rem] md:w-[4rem] h-[2rem] w-[2rem] absolute  z-40 left-2 hover:opacity-100 cursor-pointer bg-gray-900 opacity-50 rounded-full grid place-items-center md:text-2xl text-white text-sm "
      >
        <FaLessThan />
      </button>
      <div
        className="w-screen md:h-screen h-[400px] flex  transition-transform duration-1580 ease"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {slides.map((movie, index) => {
          const isActive = index === currentIndex;
          const bgURl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`; // browser will fetch the preloaded ones to speed up process.
          return (
            <div
              key={movie.id}
              style={{ backgroundImage: `url(${bgURl})` }}
              className={`min-w-screen max-w-screen md:h-screen h-[400px] flex-shrink-0 bg-cover py-30 bg-no-repeat bg-center relative px-10 flex items-center `}
            >
              <div className="absolute top-0 left-0 w-full md:h-screen h-full z-0" style={{background: 'linear-gradient(to bottom,  oklch(27.8% 0.033 256.848 / 0.5) 0% ,  oklch(27.9% 0.041 260.031 /0.9) 90%, #1d2939 100%)'}}></div> {/*overlay*/}
              <div className=" w-screen z-40 flex md:justify-between  text-white  md:px-20 md:items-center  ">
                <div className="lg:w-1/2 w-full flex flex-col md:gap-15 gap-5  h-fit  ">
                  <h2 className="md:text-6xl lg:text-8xl  xl:text-[70px] text-2xl md:text-left font-bold lg:my-0 font-serif">
                    {movie.title ? movie.title : movie.name}
                  </h2>

                  <p className="md:text-lg text-sm hidden md:block lg:text-xl md:font-light text-center md:text-left line-clamp-6">
                    {movie.overview}
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <NavLink
                      to={`${movie.media_type === "tv" ? "series" : movie.media_type}/${movie.id}`}
                      className="bg-pink-300 md:py-3 py-1 px-3 cursor-pointer md:w-64 rounded-4xl md:text-xl  text-sm text-center text-gray-800 "
                    >
                      Watch Now
                    </NavLink>
                    <NavLink
                      to={`${movie.media_type === "tv" ? "series" : movie.media_type}/trailer/${movie.id}`}
                      className="bg-none text-center border-2 cursor-pointer border-white md:w-64  md:py-3 px-2 py-1 rounded-4xl md:text-xl text-sm "
                    >
                      Watch Trailer
                    </NavLink>
                  </div>
                </div>
                <div className="lg:w-1/2 h-full md:flex md:w-0  hidden justify-end">
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                    alt={movie.title}
                    className={` rounded-lg transition-all duration-1520 ease-in-out ${isActive ? "h-[40rem]" : "h-[0rem]"}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => handleNext(currentIndex)}
        className=" md:h-[4rem] md:w-[4rem] h-[2rem] w-[2rem] z-40 bg-gray-900 opacity-50 absolute right-2 rounded-full grid place-items-center cursor-pointer hover:opacity-100 md:text-2xl text-sm text-white"
      >
        <FaGreaterThan />
      </button>
    </div>
  );
}

export default Carousel;
