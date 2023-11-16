import { Outlet, Link } from "react-router-dom";
import {
  FaAlignCenter,
  FaDiceD6,
  FaHome,
  FaPlus,
  FaProductHunt,
  FaUser,
} from "react-icons/fa";

// import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // console.log(user?.email);
  //   const [isAdmin] = useAdmin();
  const isAdmin = true;

  const navOptions = (
    <>
      {isAdmin ? (
        <>
          <li className="text-white bg-orange-700 p-2 hover:bg-slate-900  text-center ">
            <Link to="/">
              <p className="flex items-center gap-2 text- font-semibold ">
                <FaHome className="text-yellow-500 text-lg" /> HOME
              </p>
            </Link>
          </li>

          <li className="text-white bg-orange-700 p-2 hover:bg-slate-900  text-center ">
            <Link to="/dashboard/student">
              <p className="flex items-center gap-2 text- font-semibold ">
                <FaProductHunt className="text-yellow-500 text-lg" /> profile
              </p>
            </Link>
          </li>

          <li className="text-white bg-orange-700 p-2 hover:bg-slate-900  text-center ">
            <Link to="/dashboard/enrolledCourses">
              <p className="flex items-center gap-2 text- font-semibold ">
                <FaDiceD6 className="text-yellow-500 text-lg" /> Enrolled
                Courses
              </p>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="text-white bg-orange-700 p-2 hover:bg-slate-900  text-center ">
            <Link to="/">
              <p className="flex items-center gap-2 text- font-semibold ">
                <FaHome className="text-yellow-500 text-lg" /> HOME
              </p>
            </Link>
          </li>

          <li className="text-white bg-orange-700 p-2 hover:bg-slate-900  text-center ">
            <Link to="/dashboard/profile">
              <p className="flex items-center gap-2 text- font-semibold ">
                <FaProductHunt className="text-yellow-500 text-lg" /> profile
              </p>
            </Link>
          </li>
          <li className="text-white bg-orange-700 p-2 hover:bg-slate-900   ">
            <Link to="/dashboard/matchFixered">
              <p className="flex items-center gap-2 text- font-semibold ">
                <FaDiceD6 className="text-yellow-500 text-lg" />
                Create New Course
              </p>
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="bg-[url('https://themedox.com/demo/mykd/assets/img/bg/area_bg02.jpg')] bg-cover">
      <style>
        {`
          /* Style for navigation menu */
          .text-white {
            color: white;
          }
        
          /* Linear gradient background for the body */
          body {
            background: linear-gradient(to bottom, black, #111);
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <div>
            <div className="fixed left-0 top-2  bottom-0 md:w-1/5 md:block hidden overflow-y-auto">
              <ul>
                <div className="space-y-1">{navOptions}</div>
              </ul>
            </div>

            <label
              htmlFor="my-drawer"
              className="fixed z-10  drawer-button md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-500 mt-4 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <div className="md:ml-[20%] md:mx-auto  ml-0">
              <div className=" ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="p-5 space-y-4 min-h-full bg-black">{navOptions}</ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
