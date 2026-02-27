import React, { useState } from 'react'
import { useNavigate } from 'react-router';


import { FaStarHalfAlt } from "react-icons/fa";
function Tile({movie ,category}) {
  const [showHover, setShowHover] = useState(false);
  const navigate = useNavigate()


  
  return (
    <div className={`md:w-[15rem] w-[7rem] group cursor-pointer`} onClick={() => navigate(`/${category}/${movie.id}`)}>
        <div className='relative'>
        <img className="object-cover rounded-xl" src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                  movie.poster_path
                }`} />
                <div className='absolute bottom-0 left=0 w-full h-2/5 ' style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,#1d293d  100%)'}}> 

                </div>
                {/* to do: fetch genres list and add the genre to the ui */}
                {/* <div className='absolute inset-0 w-4rem h-3rem'>${movie.genres}</div> */}
{/* using an overlay and button when parent is hovered through the group property in tailwind */}
              <div className=' absolute z-30  bg-black/40 opacity-0 h-full w-full group-hover:opacity-100 top-0 left-0 justify-center flex items-center'>
                  <button className='bg-pink-300 px-3 py-2 rounded-lg cursor-pointer '>
                    View Details
                  </button>

                    </div>
                
        </div>
        <div className='flex justify-between gap-2 mt-1'>
        <p className='text-white truncate md:text-base text-xs' >{movie.title? movie.title : movie.name}</p>
                <p className='text-slate-400 md:text-sm  md:flex gap-2 items-center hidden '><FaStarHalfAlt />{movie.vote_average}</p>
               
        </div>
    </div>
  )
}

export default Tile