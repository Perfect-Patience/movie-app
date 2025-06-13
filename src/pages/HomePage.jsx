import React from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Tile from "../components/Tile";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcomming, setUpcomming] = useState([]);
  const [isLoading, setLoading] = useState(true)

  async function getMovies(url, setter) {
    const options = {
      method: "GET",
      url: url,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`, // Ensure you have this in your .env file
      },
    };

    try {
       setLoading(false);
      const res = await axios.request(options);
     
      
      console.log("results " + res.data.results)
      setter(res.data.results); // Set the array directly
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovies("https://api.themoviedb.org/3/trending/all/day", setTrendingMovies);
    getMovies("https://api.themoviedb.org/3/movie/top_rated", setTopRated);
    getMovies("https://api.themoviedb.org/3/movie/upcoming", setUpcomming)


  }, []);

  return (
    <div className="w-screen h-fit bg-gray-800">
      {isLoading? <h2 className="text-amber-700 text-3xl">Loading.....</h2> :  <Carousel trending={trendingMovies} /> }
      {
        trendingMovies ? <Slider movies={trendingMovies} heading={"Trending"}/>: null
      }

       {
        topRated ? <Slider movies={topRated} heading={"Top Rated"}/>: null
      }
      <section className="w-full h-fit p-10">
        <p className="text-amber-300 text-2xl">UpComming</p>
        <div className="flex flex-wrap p-6 gap-10 justify-between">
      {upcomming? upcomming.map((movie) =>{
        return (
          <Tile movie={movie}/>
        );
      }) : null}
      </div>
      </section>

    
    </div>
  );
}

export default HomePage;
