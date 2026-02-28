import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Tile from "../components/Tile";
import Slider2 from "../components/Slider2";
import { MdArrowForwardIos } from "react-icons/md";
import Footer from "../components/Footer";
function MoviesPage() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcomming, setUpcomming] = useState([]);


  const [isLoading, setLoading] = useState(true);

  async function getMovies(url, setter) {

    const options = {
      method: "GET",
      url: url,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
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
    getMovies(
      "https://api.themoviedb.org/3/movie/now_playing",
      setNowPlaying
    );
    getMovies(
      "https://api.themoviedb.org/3/movie/popular",
      setPopular
    );
    getMovies("https://api.themoviedb.org/3/movie/top_rated", setTopRated);
    getMovies("https://api.themoviedb.org/3/movie/upcoming", setUpcomming);
  }, []);

  return (
    <div className="bg-slate-800 min-w-screen min-h-screen pt-5">
      <section className="h-20 "></section>

      <section className="mt-5">
        <p className="text-white text-xl px-5 font-bold flex items-center gap-5">
          Now Showing{" "}
          {/* <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span> */}
        </p>
        {
          nowPlaying? <Slider2 movies={nowPlaying} category={"movie"}/>
          : <p>Loading...</p>
        }
      </section>
      <section className="mt-5">
        <p className="text-white text-xl px-5 font-bold flex items-center gap-5">
          Popular{" "}
          {/* <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span> */}
        </p>
        {
          popular? <Slider2 movies={popular} category={"movie"}/>
          : <p>Loading...</p>
        }
      </section>
      <section className="mt-5">
        <p className="text-white text-xl font-bold flex items-center px-5 gap-5 mb-10">
          Top Rated{" "}
          {/* <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span> */}
        </p>
       <div className="flex gap-2 md:gap-y-15 md:gap-x-5 flex-wrap justify-center">
         {
          topRated? topRated.map((movie) =>{
        return (
          <Tile movie={movie} category={"movie"}/>
        );
      }) : null}
       </div>
         
      </section>
      <section className="mt-5 w-[100vw]">
        <p className="text-white text-xl font-bold flex px-5 items-center gap-5 mb-10">
          Upcomming{" "}
          {/* <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span> */}
        </p>
       <div className="flex gap-2 md:gap-y-15 md:gap-x-5  flex-wrap justify-center">
         {
          upcomming? upcomming.map((movie) =>{
        return (
          <Tile movie={movie} category={"movie"}/>
        );
      }) : null}
       </div>
         
      </section>

<Footer/>
    </div>
  );
}

export default MoviesPage;
