import axios from "axios";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MyClassCard = ({ items }) => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/${items}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [items]);

  const { image, title } = course;

  const limitDescription = (description, limit) => {
    const words = description.split(" ");
    const limitedWords = words.slice(0, limit);
    return limitedWords.join(" ");
  };

  const limitedDescription = limitDescription(course?.description || "", 15);

  return (
    <div className=" rounded-lg p-3 flex justify-between items-center  text-black border bg-gray-300">
      <div>
        <img className=" w-96 h-48  inset-0" src={image} alt="" />
      </div>
      <div className="ml-4">
        <div className="font-bold   text-line-clamp-1  block">
          <Link to={`/courses/${items}`}>
            <h3 className="hover:text-orange-500 text-xl">{title}</h3>
          </Link>
        </div>
        <div className=" pb-3">
          <span className=" text-line-clamp-1 text-xs">
            <h3 className="">{limitedDescription}</h3>
          </span>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-success px-5">Continue </button>
          <button className="btn btn-success px-5">See Outline</button>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <div
          className="radial-progress "
          style={{ "--value": "70", "--size": "8rem", "--thickness": "1rem" }}
          role="progressbar"
        >
          70%
        </div>
      </div>
    </div>
  );
};

export default MyClassCard;
