import { useState, useEffect } from "react";
import Cards from "../Components/Cards";
import { Link } from "react-router-dom";
import axios from "axios";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getBook();
  }, []);

  return (
    <div className="container py-4 mx-auto max-w-screen-2xl md:px-20">
      <div className="items-center justify-center mt-20 text-center">
        <h1 className="text-3xl font-semibold md:text-2xl">
          We're delighted to have you{" "}
          <span className="text-pink-500">Here! :)</span>
        </h1>
        <p className="mt-10">
          Reading books transports us to different worlds, broadens our horizons,
          and enriches our knowledge. It's a wonderful way to relax, stimulate our minds,
          and expand our understanding of life.
          Dive into a book and discover the joy and benefits of reading!
        </p>
        <Link to="/">
          <button className="px-4 py-2 mt-6 text-white duration-300 bg-pink-400 rounded-2xl hover:bg-pink-800">
            Back
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 mt-12 md:grid-cols-4">
        {book.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Course;
