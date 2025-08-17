import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { useParams, useLocation, useNavigate } from "react-router";

function Details() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate()
  let path;
  let loc = "movie";
  if (location.pathname.includes("series")) {
    path = "tv";
    loc = "series";
  } else {
    path = "movie";
  }

  console.log("location: " + path);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [casts, setCasts] = useState([]);

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
      const res = await axios.request(options);

      setter(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovies(`https://api.themoviedb.org/3/${path}/${id}`, setDetails);
    getMovies(`https://api.themoviedb.org/3/${path}/${id}/credits`, setCasts)
  }, [path]);

  console.log(id);
  return (
    <div className="bg-slate-800 pt-20 flex flex-col lg:px-45 min-h-screen ">
    <div className="w-screen h-fit  flex items-center">
      {details ? (
        <div className="flex h-fit mx-auto gap-25 relative  ">
          <div className="w-1/7  ">
            <img
              className="w-[100%] object-cover rounded-xl"
              src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                details.poster_path
              }`}
              alt="details.title"
            />
          </div>

          <div className=" flex flex-col gap-8 h-[100%] justify-start relative ">
            <h4 className="text-7xl text-white ">
              {details.title ? details.title : details.name}
            </h4>
            <p className="text-3xl text-amber-400"> {details.tagline}</p>
            <p className="text-lg text-white max-w-[600px] ">{details.overview}</p>

            <div className=" flex flex-col gap-5">
              <div className="flex gap-3 text-gray-300">
                <p className="text-white text-lg ">
                  Seasons:{" "}
                  <span className=" text-pink-300 font-bold ml-2">
                    {details.number_of_seasons}
                  </span>
                </p>{" "}
                |
                <p className="text-white text-lg ">
                  Episodes:{" "}
                  <span className=" text-pink-300 font-bold ml-2">
                    {details.number_of_episodes}
                  </span>
                </p>{" "}
                |
                <p className="text-white text-lg ">
                  Rating:{" "}
                  <span className="text-pink-300">{details.vote_average}</span>
                </p>
              </div>

              <div className="flex gap-5">
                <p className="text-white">Genres : </p>{" "}
                <div className="flex gap-3 flex-wrap">
                  {details.genres
                    ? details.genres.map((item) => (
                        <button
                          className=" min-w-[100px] px-3 py-2 bg-gray-700 flex-shrink-0 text-white rounded-full"
                          key={item.id}
                        >
                          {item.name}
                        </button>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="flex gap-x-8">
              <a
                href={details.homepage}
                className="bg-pink-400 text-white  py-2 rounded-3xl text-xl w-[150px] border border-pink-300 text-center  "
              >
                Watch Now
              </a>
              <a onClick={() => navigate(`/${loc}/trailer/${id}`)} className=" border border-white w-[150px]  text-xl text-center py-2 rounded-3xl text-white">
                Trailer
              </a>
            </div>
          </div>
           <div className='min-w-[350px]'>
                    <ul className='sideDetails'>
                      <li>Original Title <span>{details.original_name? details.original_name : details.original_title}</span></li>
                      {details.languages? <li>Languages: <span>{details.languages.map((lang)=>(lang) )}</span></li>: null }
                      
                     { details.status? <li>Status: <span>{details.status}</span></li>: null }
                      {details.first_air_date? <li>First aired: <span>{details.first_air_date}</span></li>
                       : <li>Release Date <span>{details.release_date}</span></li>}
                       {details.last_air_date? <li>First aired: <span>{details.first_air_date}</span> </li> : null}
                      {details.created_by? <li>Authors: <span>{details.created_by.map((auth)=>(<span>{auth.name} &nbsp;<br/></span>))}</span></li>: null }
                      <li></li>
                    </ul>
          </div>
        </div>
      ) : null}


 
    </div>
         <section className="mt-20">
          <h4 className="text-3xl text-white mb-10">Casts</h4>
<div className="flex gap-6 overflow-x-auto scrollbar-hide p-4">
      {casts.cast? casts.cast.map((actor) => (
        <div key={actor.id} className="flex flex-col items-center flex-shrink-0">
          <img
            src={
              actor.profile_path
                ? `${import.meta.env.VITE_TMDB_API_IMAGE}${actor.profile_path}`
                : "/no-profile.png" // fallback image
            }
            alt={actor.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
          />
          <p className="text-white text-sm mt-2 text-center truncate w-20">
            {actor.name}
          </p>
          <p className="text-gray-400 text-xs text-center truncate w-20">
            {actor.character}
          </p>
        </div> 
      )) : null}
    </div>
        </section>

       <section className="mt-20">
  {casts.crew ? (
    <>
      <h4 className="text-3xl text-white mb-10">Crew</h4>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide p-4">
        {casts.crew.map((actor) => (
          <div key={actor.id} className="flex flex-col items-center flex-shrink-0">
            <img
              src={
                actor.profile_path
                  ? `${import.meta.env.VITE_TMDB_API_IMAGE}${actor.profile_path}`
                  : "/no-profile.png"
              }
              alt={actor.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
            <p className="text-white text-sm mt-2 text-center truncate w-20">
              {actor.name}
            </p>
            <p className="text-gray-400 text-xs text-center truncate w-20">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </>
  ) : <p className="text-slate-700">No crew to display..</p>}
</section>

        </div>

    
  );
}

export default Details;
