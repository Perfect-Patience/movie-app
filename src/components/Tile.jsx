import React from 'react'

function Tile({movie}) {
  return (
    <div className='w-[15rem] '>
        <div>
        <img className="object-cover rounded-2xl" src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                  movie.poster_path
                }`} />
        </div>
        <p className='text-white text-xl mt-1'>{movie.title? movie.title : movie.name}</p>
    </div>
  )
}

export default Tile