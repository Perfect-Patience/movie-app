import React from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider"

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
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
    getMovies("https://api.themoviedb.org/3/movie/top_rated", setTopRated)

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


    
    </div>
  );
}

export default HomePage;
