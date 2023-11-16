import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthProvider";
import EnrolledCoursesCard from "./EnrolledCoursesCard";

const EndrolledCourses = () => {
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  console.log(enrolledCourse);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Function to fetch enrolledTournamentsId for a user
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/enrolledCourses/${user?.email}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        setEnrolledCourse(data.enrolledCourses);
      } catch (error) {
        console.error("Error fetching bookMarkGames:", error);
      }
    };

    fetchEnrolledCourses();
  }, [user?.email]);

  return (
    <div>
      <div className="grid place-items-center grid-cols-1 gap-10 ">
        <section className="grid gap-6 mx-6 mb-8">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-2xl text-white font-bold flex items-center gap-1">
                Bookmarked Games
              </h3>
            </div>
          </div>
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
            {enrolledCourse?.map((items, i) => (
              <EnrolledCoursesCard key={i} items={items} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EndrolledCourses;
