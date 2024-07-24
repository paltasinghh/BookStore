import React from 'react'

function Cards({item}) {
  console.log(item)
  return (
   <>
    <div className="mt-4 my-3 p-4">
    <div className="card bg-slate-800 w-92 shadow-xl hover:scale-105 duration-200 dark:border">
  <figure>
    <img
      src="../../public/book.jpg"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.Name}
      <div className="badge badge-secondary flex-initial">{item.category}</div>
    </h2>
    <p>{item.title}</p>
    <div className="card-actions justify-between">
      <div className="badge text-white badge-outline">${item.price}</div>
      <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration">Buy Now</div>
    </div>
  </div>
</div>
    </div>
   </>
  )
}

export default Cards
