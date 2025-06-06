import React from 'react'

function HomePage() {
  return (
    <div className='w-full flex justify-between text-white h-screen p-15  '>
        <div className='w-1/2 flex flex-col gap-10 '> 
            <h2 className='text-6xl font-bold '>Moviee Name</h2>
        
        <p className='text-2xl'>
            Movie Description here you will find the movie description and other details about the movie. This is a placeholder text for the movie description. You can replace it with actual content later.
        </p>
        <div className='flex gap-6'>
            <button className='bg-red-700 px-4 py-2 rounded-4xl text-xl '>Watch Now</button>
            <button className='bg-none border-2 border-white px-4 py-3 rounded-4xl text-xl'>Watch Trailer</button>
        </div>
        </div>
    </div>
  )
}

export default HomePage