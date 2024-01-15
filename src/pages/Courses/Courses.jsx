// import { useContext, useEffect, useState } from "react";
// import {
//   FaBookmark,
//   FaBookReader,
//   FaClock,
//   FaEject,
//   FaStar,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Contexts/AuthProvider";

// const Courses = () => {
//   const [data, setData] = useState([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/courses");
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

// const handleBookmark = (_id) => {
//   const requestBody = {
//     _id: _id, // Send the _id from the singleTournament
//   };

//   fetch(`http://localhost:3000/bookmarkedCourse/${user.email}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(requestBody), // Send the request body as JSON
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.modifiedCount) {
//         Swal.fire({
//           title: " Course Bookmark Successfull",
//           icon: "success",
//           color: "#FFFFFF",
//           background:
//             " linear-gradient(90deg, #0c0e12 0%, rgba(31, 41, 53, 0.66078) 100%)",

//           confirmButtonColor: "cool",
//           confirmButtonText: "OK",
//         });
//       } else {
//         Swal.fire({
//           title: "Already Already Bookmarked",
//           icon: "error",
//           color: "#FFFFFF",
//           background:
//             " linear-gradient(90deg, #0c0e12 0%, rgba(31, 41, 53, 0.66078) 100%)",

//           confirmButtonColor: "cool",
//           confirmButtonText: "OK",
//         });
//       }
//     });
// };

//   return (
//     <div>
//       <div className="max-w-screen-xl mx-auto px-5">
//         <p className="text-[#FF2200] font-bold mt-20">All</p>
//         <h3 className="text-3xl font-bold">Courses</h3>
//         <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5 py-10">
//           {data.map((item, index) => (
//             <div key={index} className="bg-white shadow-lg rounded-2xl">
//                <Link to={`/courses/${item._id}`}>
//               <div className="image-container rounded-t-2xl">
//                 <img className="rounded-t-2xl w-full" src={item.image} alt="" />
//                 <div className="overlay"></div>
//               </div>

//               <div className="flex justify-around items-center py-4">
//                 <p className="flex items-center gap-1">
//                   <FaStar />
//                   <span className=" text-[#131515]">{item.rating}</span>
//                 </p>
//                 <p className="flex items-center gap-1">
//                   <FaBookReader /> {item.total_lessons}
//                 </p>
//                 <p className=" flex items-center gap-1">
//                   <FaEject />

//                   {item.reviews.length}
//                 </p>
//               </div>
//               </Link>
//               <hr />
//               <div className="px-5">
//                 <Link to={`/courses/${item._id}`}>
//                   <div className="flex flex-col gap-2">
//                     <h6 className="hover:text-[#FF5522] font-semibold mt-3">{item.title}</h6>
//                     <p className="text-sm">{item.description}</p>
//                   </div>
//                 </Link>
//                 <hr className="my-2" />
//                 <div className="flex pb-3  justify-between items-center">
//                   <p className="flex  items-center gap-1">
//                     <FaClock className="text-[#FF5522]" size={12} />
//                     <span className=" text-[#131515]  font-bold ">
//                       {item.duration}
//                     </span>
//                   </p>
//                   <p className="text-[#FF5522] font-bold">{item.level}</p>
//                   <div onClick={() => handleBookmark(item._id)}>
//                     <p>
//                       <FaBookmark />
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;
import React, { useContext, useEffect, useState } from "react";
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

const Courses = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses");
        const result = await response.json();
        setData(result);
        setFilteredData(result); // Set initial filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on selected criteria
    let filtered = data.filter((course) => {
      return (
        (course.category.includes(selectedCategory) ||
          selectedCategory === "") &&
        (course.instructor.instructor_name
          .toLowerCase()
          .includes(selectedInstructor.toLowerCase()) ||
          selectedInstructor === "") &&
        course.rating >= selectedRating &&
        (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  }, [data, searchTerm, selectedCategory, selectedInstructor, selectedRating]);

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
            title: "Course Bookmark Successful",
            icon: "success",
            confirmButtonColor: "#10B981",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Already Bookmarked",
            icon: "error",
            confirmButtonColor: "#EF4444",
            confirmButtonText: "OK",
          });
        }
      });
  };

  const uniqueCategories = [...new Set(data.map((course) => course.category))];
  const uniqueInstructors = [
    ...new Set(data.map((course) => course.instructor.instructor_name)),
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleInstructorChange = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(parseFloat(event.target.value));
  };

  const filterByRating = () => {
    let filtered = data.filter((course) => course.rating >= selectedRating);
    setFilteredData(filtered);
  };
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedInstructor("");
    setSelectedRating(0);
    setSearchTerm("");
  };

  return (
    <div className="">
      {/* Filter Section */}
      <div className="border border-red-500 mx-[12rem] rounded-xl bg-[#5A49F8] p-10">
        <div className="gap-4 flex justify-center ">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-500 rounded"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-2 border border-gray-500 rounded"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Instructor Filter */}
          <select
            value={selectedInstructor}
            onChange={(e) => handleInstructorChange(e.target.value)}
            className="p-2 border border-gray-500 rounded"
          >
            <option value="">All Instructors</option>
            {uniqueInstructors.map((instructor, index) => (
              <option key={index} value={instructor}>
                {instructor}
              </option>
            ))}
          </select>

          {/* Rating Filter */}
          <div className="flex items-center space-x-4 ">
            <label
              htmlFor="ratingSlider"
              className="text-lg text-white font-semibold"
            >
              Filter by Rating:
            </label>
            <input
              type="range"
              id="ratingSlider"
              min={0}
              max={5}
              step={0.1}
              value={selectedRating}
              onChange={handleRatingChange}
              onMouseUp={filterByRating} // Apply filter on slider release
              className=""
            />
            <span className="text-white">{selectedRating.toFixed(1)}</span>
          </div>

          {/* Reset Filter Button */}
          <button
            onClick={resetFilters}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Reset Filters
          </button>
        </div>
      </div>
      {/* Courses */}
      <div className="max-w-screen-xl mx-auto px-5">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="text-center">
            <p className="text-[#FF2200] font-bold mt-10">All</p>
            <h3 className="text-3xl font-bold">Courses</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5 py-10">
            {filteredData.map((item, index) => (
              <div key={index} className="bg-white shadow-lg rounded-2xl">
                <Link to={`/courses/${item._id}`}>
                  {/* Display course information */}
                  <div className="image-container rounded-t-2xl">
                    <img
                      className="rounded-t-2xl h-48 w-full"
                      src={item.image}
                      alt=""
                    />
                    <div className="overlay"></div>
                  </div>

                  <div className="flex justify-around items-center py-4">
                    {/* Display course details such as rating, lessons, reviews */}
                    {/* Use item properties like item.rating, item.total_lessons, item.reviews.length */}
                  </div>

                  <hr />

                  <div className="px-5">
                    <Link to={`/courses/${item._id}`}>
                      {/* Display course title and description */}
                      <div className="flex flex-col gap-2">
                        <h6 className="hover:text-[#FF5522] font-semibold mt-3">
                          {item.title}
                        </h6>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </Link>

                    <hr className="my-2" />

                    <div className="flex pb-3  justify-between items-center">
                      {/* Display course duration, level, bookmark option */}
                      {/* Use item properties like item.duration, item.level */}
                      <p className="flex  items-center gap-1">
                        <FaClock className="text-[#FF5522]" size={12} />
                        <span className=" text-[#131515]  font-bold ">
                          {item.duration}
                        </span>
                      </p>
                      <p className="text-[#FF5522] font-bold">{item.level}</p>
                      <div onClick={() => handleBookmark(item._id)}>
                        <p>
                          <FaBookmark />
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
