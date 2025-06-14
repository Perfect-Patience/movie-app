import React from 'react'

function Tile({movie}) {
  return (
    <div className='w-[15rem] '>
        <div className='relative'>
        <img className="object-cover rounded-2xl" src={`${import.meta.env.VITE_TMDB_API_IMAGE}${
                  movie.poster_path
                }`} />
                <div className='absolute bottom-0 left=0 w-full h-1/3' style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #1e2939 100%)'}}> 

                </div>
        </div>
        <p className='text-white text-xl mt-1' >{movie.title? movie.title : movie.name}</p>
    </div>
  )
}

export default Tile