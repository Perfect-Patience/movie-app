import React from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import { useEffect, useState } from "react";
function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  async function getTrendingMovies() {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/all/day",
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTEzODM3Nzk4OTJkZGI4ZDIyMDc4NjQzODhkOWUxYyIsIm5iZiI6MTc0OTMxNTQ2OC42ODksInN1YiI6IjY4NDQ2ZjhjZDc1ZjI4YmJkYzIwNWI3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ydkd9qS87rX2FkNJTZABt4goJSj8CP6E86SaZbSaihA",
      },
    };

    try {
      const res = await axios.request(options);
      setTrendingMovies(res.data.results); // Set the array directly
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <div className="w-full h-fit">
      <Carousel trending={trendingMovies} />
      {/* <div className='w-full h-screen bg-[url("src/assets/sample.jpg")] flex  bg-no-repeat bg-cover bg-center py-20 px-15 items-center'>
        <div className=" w-full flex justify-between text-white h-fit ">
          <div className="w-1/2 flex flex-col gap-10 ">
            <h2 className="text-6xl font-bold ">Moviee Name</h2>

            <p className="text-2xl">
              Movie Description here you will find the movie description and
              other details about the movie. This is a placeholder text for the
              movie description. You can replace it with actual content later.
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
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default HomePage;
