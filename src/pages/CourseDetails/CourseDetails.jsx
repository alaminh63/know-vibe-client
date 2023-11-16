import { useContext } from "react";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaCircle, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({});
  const {
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
              <p className=" text-center text-xl font-bold">This Course Includes</p>
              <p className=" border py-1">Course Level : {level}</p>
              <p className=" border py-1">Duration : {duration}</p>
              <p className=" border py-1">Lession : {total_lessons}</p>
              <p className=" border py-1">Total Reviews : {reviews?.length}</p>
            </div>
            <button className="bg-[#FF5522] font-bold mt-2 py-3 text-white w-full">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
