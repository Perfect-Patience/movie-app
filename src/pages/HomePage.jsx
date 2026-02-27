import React from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Tile from "../components/Tile";
import Slider2 from "../components/Slider2";
import { NavLink, useFetcher } from "react-router";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [upcomming, setUpcomming] = useState([]);
  const [airingTodayTV, setAiringTodayTV] = useState([]);
  const [customTopRated, setCustomTopRated] = useState([]);

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

  // logic here is to combine the top rated series and movies. then sort them based on rating to display them together.
  // to enable routing to the appopriate page  later, media_type field is added to the object
  useEffect(() => {
  setCustomTopRated([...topRatedMovies.map(movie => ({
    ...movie, media_type : 'movie'
  })), ...topRatedSeries.map(series => ({
    ...series , 
    media_type : "series"
  }))])
    
  }, [topRatedMovies, topRatedSeries])


  console.log(customTopRated)


  return (
    <div className="w-screen h-fit bg-slate-800">
      {/* carousel section */}
        <Carousel trending={trendingMovies} /> 
      {
        trendingMovies ? <Slider movies={trendingMovies} heading={"Trending"}/>: null
      }
  {/* top rated movies and series */}
        <div className="flex justify-between items-center md:px-10 px-5 ">
        <h3 className="text-2xl text-white font-bold">Top Rated</h3>
        <NavLink className={`text-lg text-white bg-gray-700 px-3 py-0.5 flex items-center h-fit rounded-2xl hover:bg-pink-600`} to={"movies"}>View more</NavLink>
      </div>
       {
        customTopRated ? <Slider2 movies={customTopRated.sort((a,b) => b.vote_average - a.vote_average)}/>: null
      }
     
     {/* airing today section */}
      <section className="w-[100vw] h-fit md:px-10 pt-5">
        <p className="text-white text-2xl font-bold px-5 md:px-0">Airing Today</p>
        <div className="flex flex-wrap justify-center py-6 md:gap-x-5 gap-2 md:gap-y-15 ">
      
      {airingTodayTV? airingTodayTV.map((movie) =>{
       
        return (
          <Tile movie={movie} category={"series"}/>
        );
      }) : null}
      </div>
      </section>
{/* upcoming */}
      <section className="w-[100vw] h-fit md:px-10 pt-5">
        <p className="text-white font-bold text-2xl px-5 md:px-0">Upcoming</p>
        <div className="flex flex-wrap  justify-center py-6 md:gap-x-5 gap-2 md:gap-y-15">
      
      {upcomming? upcomming.map((movie) =>{
        return (
          <Tile movie={movie} category={"movie"}/>
        );
      }) : null}
      </div>
      </section>

    
    </div>
  );
}

export default HomePage;
