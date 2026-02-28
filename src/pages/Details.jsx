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
  }, [path,id]);

 
  return (
    <div className="bg-slate-800 pt-20 flex flex-col  min-h-screen ">
    <div className="w-screen h-fit  flex items-center md:px-5  md:py-10">
       {/* overlay and bg picture */}
          <div className="absolute top-0 right-0 md:w-[80vw] h-[100vh] w-[100vw]  ">
            <div className="relative w-full h-full">
              <div  className=" absolute inset-0  w-full h-full bg-[radial-gradient(circle,rgba(0,0,0,0.7)_20%,#1e293d_90%)]"></div>
              <img className="w-full h-full object-cover rounded-2xl" src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                details.backdrop_path
              }`}/>
            </div>
          </div>
      {details ? (
        <div className="flex w-full h-fit relative mx-5 justify-between  flex-wrap ">
         
         
         <div className="flex gap-10 z-20">
           {/* poster image */}
          <div className="md:w-[300px] md:block hidden ">
            <img
              className="w-[100%] object-cover rounded-xl"
              src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                details.poster_path
              }`}
              alt="details.title"
            />
          </div>
{/* details to the side of poster image */}
          <div className=" flex flex-col gap-4.5 h-[100%] justify-start relative ">
            <h4 className="text-4xl font-bold text-white ">
              {details.title ? details.title : details.name}
            </h4>
            <p className="text-xl text-amber-400 font-sans"> {details.tagline}</p>
            <p className="text- text-white  md:text-xl text-xs max-w-[600px] ">{details.overview}</p>

            <div className=" flex flex-col gap-2.5">
              <div className="flex gap-3 text-gray-300">
                <p className="text-white font-semibold text-[15px] ">
                  Seasons:{" "}
                  <span className=" text-pink-300 font-bold ml-2">
                    {details.number_of_seasons}
                  </span>
                </p>{" "}
                |
                <p className="text-white font-semibold text-[15px] ">
                  Episodes:{" "}
                  <span className=" text-pink-300 font-bold ml-2">
                    {details.number_of_episodes}
                  </span>
                </p>{" "}
                |
                <p className="text-white font-semibold text-[15px] ">
                  Rating:{" "}
                  <span className="text-pink-300">{details.vote_average}</span>
                </p>
              </div>

              <div className="flex gap-5 flex-wrap ">
                <p className="text-white">Genres: </p>{" "}
                <div className="flex gap-3 flex-wrap">
                  {details.genres
                    ? details.genres.map((item) => (
                        <button
                          className=" min-w-[100px] text-xs  md:text-[1rem] px-3  py-1.5 bg-gray-700 flex-shrink-0 text-white rounded-full"
                          key={item.id}
                        >
                          {item.name}
                        </button>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="flex md:gap-x-8 gap-2 mt-5">
              <a
                href={details.homepage}
                className="bg-pink-400 text-white  py-2 rounded-3xl text-lg font-semibold md:w-[150px] w-[120px] text-center flex justify-center items-center "
              >
                Watch Now
              </a>
              <a onClick={() => navigate(`/${loc}/trailer/${id}`)} className=" border border-white md:w-[150px]  w-[120px]  text-lg flex justify-center items-center text-center py-1 rounded-3xl text-white">
                Trailer
              </a>
            </div>
          </div>
         </div>
          {/* extra info on the far right */}
           {/* <div className=' absolute  right-0 top-0 min-w-[300px] min-h-[100vh] z-20'>
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
          </div> */}
         
        </div>
      ) : null}


 
    </div>
         <section className="mt-20 z-10 md:mx-10 mx-5">
          <h4 className="text-3xl text-white mb-5">Casts</h4>
<div className="flex md:gap-6 gap-2 overflow-x-auto scrollbar-hide p-4">
      {casts.cast? casts.cast.map((actor) => (
        <div key={actor.id} className="flex flex-col items-center flex-shrink-0">
          <img
            src={
              actor.profile_path
                ? `${import.meta.env.VITE_TMDB_API_IMAGE}${actor.profile_path}`
                : "/no-profile.png" // fallback image
            }
            alt={actor.name}
            className="md:w-30 md:h-30 w-15 h-15 rounded-full object-cover border-2 border-gray-300"
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

       <section className="mt-10 z-10 md:mx-10 mx-5">
  {casts.crew ? (
    <>
      <h4 className="text-3xl text-white mb-5">Crew</h4>
      <div className="flex md:gap-6 gap-2 overflow-x-auto scrollbar-hide py-4 pl-4">
        {casts.crew.map((actor) => (
          <div key={actor.id} className="flex flex-col items-center flex-shrink-0">
            <img
              src={
                actor.profile_path
                  ? `${import.meta.env.VITE_TMDB_API_IMAGE}${actor.profile_path}`
                  : "/no-profile.png"
              }
              alt={actor.name}
              className="md:w-30 md:h-30 w-15 h-15 rounded-full object-cover border-2 border-gray-300"
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
