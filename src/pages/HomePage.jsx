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
          `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`, // Ensure you have this in your .env file
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
    <div className="w-screen h-fit ">
      <Carousel trending={trendingMovies} />
      
    </div>
  );
}

export default HomePage;
