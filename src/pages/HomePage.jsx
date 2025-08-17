import React from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Tile from "../components/Tile";
import Slider2 from "../components/Slider2";
import { NavLink } from "react-router";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [upcomming, setUpcomming] = useState([]);
  const [airingTodayTV, setAiringTodayTV] = useState([]);

  const [isLoading, setLoading] = useState(true)

  async function getMovies(url, setter) {
    const options = {
      method: "GET",
      url: url,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`, 
      },
    };

    try {
       setLoading(false);
      const res = await axios.request(options);
     
      
    
      setter(res.data.results);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovies("https://api.themoviedb.org/3/trending/all/day", setTrendingMovies);
    getMovies("https://api.themoviedb.org/3/movie/top_rated", setTopRatedMovies);
    getMovies("https://api.themoviedb.org/3/tv/top_rated", setTopRatedSeries);
    getMovies("https://api.themoviedb.org/3/movie/upcoming", setUpcomming);
    getMovies("https://api.themoviedb.org/3/tv/airing_today?", setAiringTodayTV);


  }, []);

  return (
    <div className="w-screen h-fit bg-slate-800">
        <Carousel trending={trendingMovies} /> 
      {
        trendingMovies ? <Slider movies={trendingMovies} heading={"Trending"}/>: null
      }

        <div className="flex justify-between items-center px-10">
        <h3 className="text-2xl text-amber-200 mb-5">Movies <span className="text-lg text-white">- Top Rated</span></h3>
        <NavLink className={`text-lg text-white bg-gray-700 px-3 py-0.5 flex items-center h-fit rounded-2xl hover:bg-pink-600`} to={"movies"}>View more</NavLink>
      </div>
       {
        topRatedMovies ? <Slider2 movies={topRatedMovies}/>: null
      }
      <div className="flex justify-between items-center px-10">
        <h3 className="text-2xl text-amber-200 mb-5">TV <span className="text-lg text-white">- Top Rated</span></h3>
        <NavLink className={`text-lg text-white bg-gray-700 px-3 py-0.5 flex items-center h-fit rounded-2xl hover:bg-pink-600`} to={"movies"}>View more</NavLink>
      </div>
       {
        topRatedSeries ? <Slider2 movies={topRatedSeries} heading={"Series"} subHeading={"Top Rated"}/>: null
      }
      <section className="w-full h-fit p-10">
        <p className="text-amber-300 text-2xl">Airing Today</p>
        <div className="flex flex-wrap p-6 gap-10 justify-between">
      
      {airingTodayTV? airingTodayTV.map((movie) =>{
       
        return (
          <Tile movie={movie}/>
        );
      }) : null}
      </div>
      </section>

      <section className="w-full h-fit p-10">
        <p className="text-amber-300 text-2xl">Upcoming</p>
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
