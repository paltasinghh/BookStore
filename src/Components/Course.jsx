import React from 'react'
import Cards from '../Components/Cards'
import {Link} from "react-router-dom"
import list from '../../public/list.json'



function Course() {
  return (
   <>
   <div className='max-w-screen-2xl container mx-auto md:px-20 py-4'>
    <div className='mt-20 items-center justify-center text-center'>
      <h1 className='text-3xl font-semibold md:text-2xl'> 
      We're delighted to have you {""}<span className='text-pink-500'>Here! :)</span>
      </h1>
      <p className='mt-10'>
      Reading books transports us to different worlds, broadens our horizons,
       and enriches our knowledge. It's a wonderful way to relax, stimulate our minds, 
      and expand our understanding of life. 
      Dive into a book and discover the joy and benefits of reading!
      </p><Link to="/">
      <button className=' mt-6 bg-pink-400 text-white px-4 py-2 rounded-2xl hover:bg-pink-800 duration-300'> Back</button>
      </Link>
   </div>
    <div className='mt-12 grid grid-cols-1 md:grid-cols-4'>
      {
        list.map((item)=>(
          <Cards key={item.id} item={item} />
        ))
      }
    </div>
    <Link to="/" className='flex justify-center'>
      <button className='mt-6 bg-pink-400 text-white px-2 py-2 rounded-2xl hover:bg-pink-800 duration-300'> Back</button>
      </Link>
    </div></>
  )
}

export default Course;
