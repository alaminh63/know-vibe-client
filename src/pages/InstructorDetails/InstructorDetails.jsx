import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InstructorDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { photo } = data;
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/instructors/${id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex">
      <div className="w-[25%]">
        <img src={photo} alt="" />
      </div>
      <div className="flex flex-col justify-center border items-center">
        <h2>Name: {data?.name}</h2>
        <p>Email: {data?.email}</p>
        <p>Bio: {data?.bio}</p>
      </div>
    </div>
  );
};

export default InstructorDetails;
