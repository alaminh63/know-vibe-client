import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthProvider";
import BookedmarkedCoursesCard from "./BookedmarkedCoursesCard";


const BookmarkedCourses = () => {
  const [bookMarked, setBookMarkedCourse] = useState([]);
  console.log(bookMarked);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Function to fetch enrolledTournamentsId for a user
    const fetchBookmarkedCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/bookmarkedCourse/${user?.email}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        setBookMarkedCourse(data.bookmarkedCourse);
      } catch (error) {
        console.error("Error fetching bookMarkGames:", error);
      }
    };

    fetchBookmarkedCourses();
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
            {bookMarked?.map((items, i) => (
              <BookedmarkedCoursesCard key={i} items={items} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookmarkedCourses;
