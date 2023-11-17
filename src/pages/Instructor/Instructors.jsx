import { useContext, useEffect, useState } from "react";
import {
  FaBookmark,
  FaBookReader,
  FaClock,
  FaEject,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider";

const Instructors = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/instructors");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleBookmark = (_id) => {
    const requestBody = {
      _id: _id, // Send the _id from the singleTournament
    };

    fetch(`http://localhost:3000/bookmarkedCourse/${user.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody), // Send the request body as JSON
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: " Course Bookmark Successfull",
            icon: "success",
            color: "#FFFFFF",
            background:
              " linear-gradient(90deg, #0c0e12 0%, rgba(31, 41, 53, 0.66078) 100%)",

            confirmButtonColor: "cool",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Already Already Bookmarked",
            icon: "error",
            color: "#FFFFFF",
            background:
              " linear-gradient(90deg, #0c0e12 0%, rgba(31, 41, 53, 0.66078) 100%)",

            confirmButtonColor: "cool",
            confirmButtonText: "OK",
          });
        }
      });
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-5">
        <p className="text-[#FF2200] font-bold mt-20">All</p>
        <h3 className="text-3xl font-bold">Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5 py-10">
          {data.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-2xl">
              <div className="image-container rounded-t-2xl">
                <img className="rounded-t-2xl w-full" src={item.photo} alt="" />
                <div className="overlay"></div>
              </div>

              <hr />
              <div className="px-5">
                <div className="flex flex-col gap-2">
                  <h6 className="hover:text-[#FF5522] text-xl font-semibold mt-3">
                    {item.name}
                  </h6>
                  <p className="text-sm">{item.bio}</p>
                </div>

                <hr className="my-2 " />
                <div className=" pb-3  items-center">
                  <Link to={`/instructors/${item._id}`}>
                    <button className="bg-[#FF5522] font-bold mt-2 py-3 text-white w-full">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructors;
