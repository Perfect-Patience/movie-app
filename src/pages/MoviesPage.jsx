import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Tile from "../components/Tile";
import Slider2 from "../components/Slider2";
import { MdArrowForwardIos } from "react-icons/md";
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
    <div className="bg-slate-950 min-w-screen min-h-screen pt-15">
      <section className="h-20 "></section>

      <section className="mt-10 px-15">
        <p className="text-white text-2xl flex items-center gap-5">
          Now Showing{" "}
          <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span>
        </p>
        {
          nowPlaying? <Slider2 movies={nowPlaying} heading={""} subHeading={""}/>
          : <p>Loading...</p>
        }
      </section>
      <section className="mt-10 px-15">
        <p className="text-white text-2xl flex items-center gap-5">
          Popular{" "}
          <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span>
        </p>
        {
          popular? <Slider2 movies={popular} heading={""} subHeading={""}/>
          : <p>Loading...</p>
        }
      </section>
      <section className="mt-10 px-15">
        <p className="text-white text-2xl flex items-center gap-5 mb-10">
          Top Rated{" "}
          <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span>
        </p>
       <div className="flex gap-5 flex-wrap justify-around">
         {
          topRated? topRated.map((movie) =>{
        return (
          <Tile movie={movie}/>
        );
      }) : null}
       </div>
         
      </section>
      <section className="mt-10 px-15">
        <p className="text-white text-2xl flex items-center gap-5 mb-10">
          Upcomming{" "}
          <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span>
        </p>
       <div className="flex gap-5 flex-wrap justify-around">
         {
          upcomming? upcomming.map((movie) =>{
        return (
          <Tile movie={movie}/>
        );
      }) : null}
       </div>
         
      </section>

    </div>
  );
}

export default MoviesPage;
