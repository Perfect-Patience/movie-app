import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";

function Watch() {
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [casts, setCasts] = useState([]);
  const [trailers, setTrailers] = useState([]);

  let path = location.pathname.includes("series") ? "tv" : "movie";

  async function getMovies(url, setter) {
    const options = {
      method: "GET",
      url,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    };

    try {
      const res = await axios.request(options);
      setter(res.data.results ? res.data.results : res.data); // /videos returns "results"
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovies(`https://api.themoviedb.org/3/${path}/${id}`, setDetails);
    getMovies(`https://api.themoviedb.org/3/${path}/${id}/credits`, setCasts);
    getMovies(`https://api.themoviedb.org/3/${path}/${id}/videos`, setTrailers);
  }, [path, id]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <section className="p-8 text-white bg-slate-700 min-h-screen py-20">
      {/* Movie/TV Title */}
      <h1 className="text-4xl font-bold mb-6">
        {details.title || details.name}
      </h1>

      {/* Trailer Section */}
      <h2 className="text-2xl font-semibold mb-4">Trailers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trailers
          .filter((vid) => vid.site === "YouTube" && vid.type === "Trailer")
          .map((trailer) => (
            <div
              key={trailer.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
            >
              <iframe
                className="w-full h-60"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <p className="p-2 text-center text-sm truncate">{trailer.name}</p>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Watch;
