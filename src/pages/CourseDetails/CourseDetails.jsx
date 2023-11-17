import { useContext } from "react";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaCircle, FaStar, FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({});
  const {
    _id,
    title,
    image,
    description,
    duration,
    syllabus,
    instructor,
    rating,
    whatWillILearn,
    level,
    total_lessons,
    reviews,
  } = data;
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/courses/${id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = () => {
    const requestBody = {
      _id: _id, // Send the _id from the singleTournament
    };

    fetch(`http://localhost:3000/enrollCourses/${user.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody), // Send the request body as JSON
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Enrolled Course Successfull",
            icon: "success",
            color: "#FFFFFF",
            background:
              " linear-gradient(90deg, #0c0e12 0%, rgba(31, 41, 53, 0.66078) 100%)",

            confirmButtonColor: "cool",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Already Enrolled",
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
    <div className="">
      <div>
        <h2 className="text-center font-bold my-3 text-3xl">Course Overview</h2>
      </div>
      <div className="mx-auto max-w-screen-xl md:flex">
        <div className="w-[75%]  ">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold my-4 uppercase">{title}</h2>
              <p className="text-xl  font-semibold text-green-500 uppercase">
                COURSE LEVEL : {level}
              </p>
            </div>
            <p className="">
              {description}
              {description}
              {description}
              {description}
            </p>
            <div className="md:flex justify-around mt-5 border p-4">
              <div className=" font-semibold">
                Instructor: {instructor?.email}
              </div>
              <div>Course Duration : {duration}</div>
              <div className="flex gap-1 items-center">
                <FaStar />
                {rating}
              </div>
            </div>
          </div>
          <h2 className="font-bold text-2xl my-4 text-center uppercase">
            Course Syllabus
          </h2>
          <div>
            {syllabus?.map((item, i) => (
              <div key={i + 1}>
                <div className="collapse collapse-arrow ">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title border border-  font-medium flex justify-between">
                    {item?.module}
                    <p>{item?.duration}</p>
                  </div>
                  <div className="collapse-content">
                    {item?.lessons?.map((lesson, j) => (
                      <div key={j + 1}>
                        <div className=" relative  py-1 px-4">
                          <div className="">
                            <FaCircle className="absolute text-green-500 top-[8px] w-5 z h-5" />
                            <span className="z-20 absolute left-[21.5px] text-white">
                              {j + 1}
                            </span>
                          </div>
                          <div className="px-6 flex justify-between">
                            {lesson?.title}
                            <p>{lesson?.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="uppercase text-2xl font-bold text-center my-4">
              What Will LEARN
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid  grid-cols-2 border gap-2">
              {whatWillILearn?.map((item, i) => (
                <div key={i + 1}>
                  <ul className="">
                    <div className="font-semibold flex gap-1 items-center">
                      <FaCheckCircle className="text-green-500" />
                      <li>{item}</li>
                    </div>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {reviews?.map((item, i) => (
              <div key={i + 1}>
                <div className="container flex flex-col w-full mt-10 p-6 mx-auto divide-y rounded-md dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-100">
                  <div className="flex justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <FaUserAlt className="w-6 h-6 " />
                      </div>
                      <div>
                        <h4 className="font-bold">{item?.username}</h4>
                        <span className="text-xs dark:text-gray-400">
                          2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 dark:text-yellow-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current"
                      >
                        <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                      </svg>
                      <span className="text-xl font-bold">{item?.rating}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 text-sm dark:text-gray-400">
                    <p>{item?.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[25%]  border-green-500">
          <div className="shadow-2xl sticky top-14">
            <div className="flex items-center gap-3 text-white p-5">
              <div className="image-container rounded-t-2xl">
                <img className="rounded-t-2xl w-full" src={image} alt="" />
                <div className="overlay"></div>
              </div>
            </div>
            <div className=" flex px-4 font-semibold flex-col gap-2">
              <p className=" text-center text-xl font-bold">
                This Course Includes
              </p>
              <p className=" border py-1">Course Level : {level}</p>
              <p className=" border py-1">Duration : {duration}</p>
              <p className=" border py-1">Lession : {total_lessons}</p>
              <p className=" border py-1">Total Reviews : {reviews?.length}</p>
            </div>
            <button
              onClick={handleEnroll}
              className=" bg-[#33ab31]  font-bold mt-2 py-3 text-white w-full"
            >
              Enroll Now
            </button>
            <button
              onClick={handleBookmark}
              className="bg-[#FF5522] font-bold mt-2 py-3 text-white w-full"
            >
              Bookmark Now
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
