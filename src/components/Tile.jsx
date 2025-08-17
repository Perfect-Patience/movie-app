import React from 'react'
import { useNavigate } from 'react-router';


import { FaStarHalfAlt } from "react-icons/fa";
function Tile({movie ,category}) {
  const navigate = useNavigate()
  return (
    <div className='w-[15rem]  hover:scale-105' onClick={() => navigate(`/${category}/${movie.id}`)}>
        <div className='relative'>
        <img className="object-cover rounded-2xl" src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                  movie.poster_path
                }`} />
                <div className='absolute bottom-0 left=0 w-full h-2/5 ' style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,#1d293d  100%)'}}> 

                </div>
        </div>
        <div className='flex justify-between gap-2 mt-1'>
        <p className='text-white text-lg truncate' >{movie.title? movie.title : movie.name}</p>
                <p className='text-white text-md flex gap-2 items-center'><FaStarHalfAlt />{movie.vote_average}</p>
               
        </div>
    </div>
  )
}

export default Tile