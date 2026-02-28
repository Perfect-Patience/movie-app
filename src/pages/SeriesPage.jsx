import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Tile from "../components/Tile";
import Slider2 from "../components/Slider2";
import Footer from "../components/Footer";
import { MdArrowForwardIos } from "react-icons/md";
function SeriesPage() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);

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
    getMovies("https://api.themoviedb.org/3/tv/airing_today", setNowPlaying);
    getMovies("https://api.themoviedb.org/3/tv/popular", setPopular);
    getMovies("https://api.themoviedb.org/3/tv/top_rated", setTopRated);
    getMovies("https://api.themoviedb.org/3/tv/on_the_air", setOnTheAir);
  }, []);

  return (
    <div className="bg-slate-800 min-w-screen min-h-screen pt-5">
      <section className="h-20 "></section>

      <section className="mt-5 ">
        <p className="text-white text-xl font-bold px-5 flex items-center gap-5">
          Airing Today{" "}
          {/* <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span> */}
        </p>
        {nowPlaying ? (
          <Slider2 movies={nowPlaying} category={"series"} />
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <section className="mt-5">
        <p className="text-white text-xl px-5 font-bold flex items-center gap-5">
          On The Air{" "}
          {/* <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span> */}
        </p>
        {onTheAir ? (
          <Slider2 movies={popular} category={"series"} />
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <section className="mt-5">
        <p className="text-white text-xl font-bold px-5 flex items-center gap-5 mb-5">
          Top Rated{" "}
          {/* <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span> */}
        </p>
        <div className="flex gap-2 md:gap-y-15  md:gap-x-5 justify-center flex-wrap">
          {topRated
            ? topRated.map((movie) => {
                return <Tile movie={movie} category={"series"} />;
              })
            : null}
        </div>
      </section>
      <section className="mt-5">
        <p className="text-white text-xl font-bold px-5 flex items-center gap-5 mb-10">
          Popular{" "}
          {/* <span className="inline-block text-xl">
            <MdArrowForwardIos />
          </span> */}
        </p>
        <div className="flex gap-2 md:gap-y-15 md:gap-x-5 flex-wrap justify-center">
          {popular
            ? popular.map((movie) => {
                return <Tile movie={movie} category={"series"} />;
              })
            : null}
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default SeriesPage;
