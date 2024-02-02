import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../../Contexts/AuthProvider";
// eslint-disable-next-line react/prop-types
const EnrolledCoursesCard = ({ items }) => {
  const { user } = useContext(AuthContext);




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

//comments added


  const { _id, description, image, title } = course;
  const limitDescription = (description, limit) => {
    const words = description.split(" ");
    const limitedWords = words.slice(0, limit);
    return limitedWords.join(" ");
  };

  const limitedDescription = limitDescription(course?.description || "", 15);

  return (
    <div className=" rounded-lg p-3  text-black border bg-gray-300">
      <div
        style={{
          position: "relative",
          paddingTop: "70%",
        }}
      >
        <img className="block w-full absolute inset-0" src={image} alt="" />
      </div>

      <Link to={`/courses/${items}`}>
        <div className="font-bold  text-line-clamp-1  block">
          <h3 className="hover:text-orange-500 text-lg text-center">{title}</h3>
        </div>
        <div className="relative pb-3">
          <span className="text-xs  text-line-clamp-1">
            <h3 className="text-center ">{limitedDescription}</h3>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default EnrolledCoursesCard;
