import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const Dashboard = () => {
  const isInstructor = true
  const nav = [
    { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Enrolled Courses", url: "/dashboard/enrolledCourses" },
  { id: 2, name: "Bookmarked Courses", url: "/dashboard/bookmarkedCourse" },
  ];
  const nav2 = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Added Courses", url: "/enrollCourses" },
  ];

  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <div className="md:flex">
      <div className="md:w-[15%] ">
        <header className=" mx-auto md:block flex items-center justify-between py-2 z-10 bg-white shadow-lg">
          {/* Logo */}
          <div className="pl-5">
            <img className="max-w-[50px]" src="/logo.png" alt="" />
          </div>

          {/* Navbar */}
          <ul
            className={`flex flex-col gap-2 ${
              open
                ? "flex-col  absolute top-16 justify-center items-center gap-10 bg-black text-white w-full h-[calc(100vh-64px)]"
                : "hidden md:flex"
            }`}
          >

{isInstructor ? (
        <>
           {nav.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleLinkClick}
                className={`${
                  pathname === item.url
                    ? "text-[#FF5522] border-b-2 border-[#FF5522] font-semibold"
                    : " text-[#6C7171] hover:text-[#FF5522] transition-all"
                }`}
              >
                <li>{item.name}</li>
              </Link>
            ))}
        </>
      ) : (
        <>
            {nav2.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleLinkClick}
                className={`${
                  pathname === item.url
                    ? "text-[#FF5522] border-b-2 border-[#FF5522] font-semibold"
                    : " text-[#6C7171] hover:text-[#FF5522] transition-all"
                }`}
              >
                <li>{item.name}</li>
              </Link>
            ))}
        </>
      )}



          
          </ul>

          {/* Login - Register */}
          <div className="pr-5">
            <button className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <FaXmark className="" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </header>
      </div>
      <div className="md:w-[85%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
