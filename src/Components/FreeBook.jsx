import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import list from "../../public/list.json";
import Cards from "./Cards";
function FreeBook() {
  const filterData = list.filter((data) => data.category === "Free");
 console.log(filterData)
var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
  return (
    <>
      <div className="max-w-screen-2x1 container mx-auto md:px-20 px-4 ">
        <h1 className="font-semibold text-2xl pb-2"> Free Offered Cource</h1>
       <div> <p>Unlock the power of reading with BookStore! Immerse yourself in a world of endless possibilities,
             where every page turns into a new adventure. Discover stories that inspire, educate, and entertain, all for free. Our app gives you unlimited access to a diverse library, from timeless classics to modern masterpieces. Join our community of passionate readers today and embark on a journey of knowledge and imagination. 
            Download BookStore and let the stories come to life!</p>
       
      
      <div>
      <Slider {...settings}>
        {filterData.map((item)=> (
        <Cards item={item} key={item.id}/>
        ))}  
      </Slider>
      </div>
      </div>
      </div>
    </>
  );
}

export default FreeBook;