import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
function carousel({ trending }) {
  return (
    <div className="w-full h-screen flex justify-between items-center">
      <button className=" h-[4rem] w-[4rem] absolute left-0 bg-gray-900 rounded-full grid place-items-center text-3xl text-white">
        <FaLessThan />
      </button>
      <div className="w-full h-screen flex ">
        {trending.slice(0, 6).map((movie) => {
          console.log(movie);
          const bgURl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
          return (
            <div
              key={movie.id}
              style={{ backgroundImage: `url(${bgURl})` }}
              className={`w-[100vw] h-screen flex-shrink-0 bg-cover bg-no-repeat bg-center  flex items-center`}
            >
              <div className=" w-full flex justify-between text-white h-fit  px-20">
                <div className="w-1/2 flex flex-col gap-10 ">
                  <h2 className="text-6xl font-bold ">{movie.title ? movie.title : movie.name }</h2>

                  <p className="text-xl">
                   {movie.overview}
                  </p>
                  <div className="flex gap-6">
                    <button className="bg-red-700 px-4 py-2 rounded-4xl text-xl ">
                      Watch Now
                    </button>
                    <button className="bg-none border-2 border-white px-4 py-3 rounded-4xl text-xl">
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className=" h-[3rem] w-[3rem] bg-gray-900 absolute right-0 rounded-full grid place-items-center text-3xl text-white">
        <FaGreaterThan />
      </button>
    </div>
  );
}

export default carousel;
