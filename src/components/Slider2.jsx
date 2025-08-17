
import { MdArrowForwardIos, MdArrowBackIos  } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";

function Slider2({ movies}) {

  const navigate = useNavigate()

  return (
    <div className="m-10">
      

      <div className="flex gap-4  overflow-x-scroll relative scrollbar-hide scroll-smooth  ">
        {movies.map((movie) => {
            
          return (
            <div className=" flex transition ease duration-350 hover:scale-105 cursor-pointer" onClick={() => navigate(`${movie.id}`)}>
                <div
              key={movie.id}
              className="w-[18rem] h-fit flex-shrink-0" 
            >
    
              <img
                className="w-[100%] h-[10rem] object-cover rounded-lg"
                src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                  movie.backdrop_path
                }`}
              />
              <p className="text-white text-lg truncate">
                 {movie.title
                    ? movie.title
                    : movie.name}

              </p>
            </div>
            </div>
          );
        })}
       
      </div>
    </div>
  );
}

export default Slider2;
