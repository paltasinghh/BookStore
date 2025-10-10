import React from "react";
import PropTypes from "prop-types";

function Cards({ item }) {
  return (
    <div className="p-4">
      <div className="duration-200 shadow-xl card bg-slate-800 hover:scale-105 dark:border">
        <figure>
          <img src="/book.jpg" alt="Book" className="object-cover w-full h-55" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.Name}
            <div className="flex-initial badge badge-secondary">
              {item.category}
            </div>
          </h2>
          <p>{item.title}</p>
          <div className="justify-between card-actions">
            <div className="text-white badge badge-outline">${item.price}</div>
            <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Cards.propTypes = {
  item: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Cards;
