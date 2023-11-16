import { useEffect, useState } from "react";
import { FaBookReader, FaClock, FaEject, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Courses = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomSubset = (array, size) => {
    const shuffledArray = array?.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, size);
  };

  const randomDataSubset = getRandomSubset(data, 6);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-5">
        <p className="text-[#FF2200] font-bold mt-20">All</p>
        <h3 className="text-3xl font-bold">Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5 py-10">
          {randomDataSubset.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-2xl">
              <Link to={`/courses/${item._id}`}>
                <div className="image-container rounded-t-2xl">
                  <img
                    className="rounded-t-2xl w-full"
                    src={item.image}
                    alt=""
                  />
                  <div className="overlay"></div>
                </div>
                <div className="flex justify-around items-center py-4">
                  <p className="flex items-center gap-1">
                    <FaStar />
                    <span className=" text-[#131515]">{item.rating}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <FaBookReader /> {item.total_lessons}
                  </p>
                  <p className=" flex items-center gap-1">
                    <FaEject />

                    {item.reviews.length}
                  </p>
                </div>
                <hr />
                <div className="px-5">
                  <div className="flex flex-col gap-2">
                    <h6 className="font-semibold mt-3">{item.title}</h6>
                    <p className="text-sm">{item.description}</p>
                  </div>
                  <hr className="my-2" />
                  <div className="flex pb-3  justify-between items-center">
                    <p className="flex  items-center gap-1">
                      <FaClock className="text-[#FF5522]" size={12} />
                      <span className=" text-[#131515]  font-bold ">
                        {item.duration}
                      </span>
                    </p>
                    <p className="text-[#FF5522] font-bold">{item.level}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
