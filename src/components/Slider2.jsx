import { useRef } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router";

function Slider2({ movies }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null)
  

   function scrollLeft() {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth; // scroll by container width
      container.scrollLeft = Math.max(container.scrollLeft - scrollAmount, 0); // clamp left
    }
  }

  function scrollRight() {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth;
      const maxScroll = container.scrollWidth - container.clientWidth; 
      container.scrollLeft = Math.min(container.scrollLeft + scrollAmount, maxScroll); // clamp right
    }
  }

  return (
    <div className="m-10 relative">
      <div onClick={() => scrollLeft()} className="text-white 2xl absolute -left-7 top-[35%] z-50 w-10 h-10 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-full flex items-center justify-center"><FaLessThan className="self-center"/></div>
      <div className="flex md:gap-4 gap-1 overflow-x-scroll relative scrollbar-hide scroll-smooth  " ref={scrollRef}>
        {movies.map((movie) => {
          return (
            <div
              className=" flex transition ease duration-350 hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/${movie.media_type}/${movie.id}`)}
            >
              <div key={movie.id} className="md:w-[22rem] w-[calc(100vw-80px)]  h-fit flex-shrink-0">
                <img
                  className="w-[100%] md:h-[14rem] h-[12rem] object-cover rounded-lg"
                  src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                    movie.backdrop_path
                  }`}
                />
                <div className="flex items-center gap-1">
                  <p className="text-white text-lg truncate">
                  {movie.title ? movie.title : movie.name}
                </p>
                <BsDot className="text-xl text-slate-300 font-bold"/>
                <span className="text-slate-500 text-xl">{movie.media_type}</span>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
           <div onClick={() => scrollRight()} className="text-white 2xl absolute -right-7 top-[35%] z-50 w-10 h-10 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-full flex items-center justify-center"><FaGreaterThan className="self-center"/></div>

    </div>
  );
}

export default Slider2;
