import { useEffect, useState } from "react";
import { FaCheckCircle, FaCircle, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const {
    title,
    description,
    duration,
    syllabus,
    instructor,
    rating,
    whatWillILearn,
    level,
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
      <div className="mx-auto max-w-screen-xl md:flex">
        <div className="w-[75%] border-2 border-red-500">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold my-4 uppercase">{title}</h2>
              <p className="text-xl font-semibold text-green-500 uppercase">
                COURSE LEVEL : {level}
              </p>
            </div>
            <p className="">
              {description}
              {description}
              {description}
              {description}
            </p>
            <div className="md:flex justify-around border p-4">
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
          <div>
            {syllabus?.map((item, i) => (
              <div key={i + 1}>
                <div className="collapse collapse-arrow ">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-xl font-medium">
                    {item?.module}
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
                          <div className="pl-6">{lesson}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="grid grid-cols-2 border gap-2">
              {whatWillILearn?.map((item, i) => (
                <div key={i + 1}>
                  <ul className="">
                    <div className="font-semibold flex gap-1 items-center">
                        <FaCheckCircle className="text-green-500"/>
                      <li>{item}</li>
                    </div>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[25%] border-2 border-green-500"></div>
      </div>
    </div>
  );
};

export default CourseDetails;
