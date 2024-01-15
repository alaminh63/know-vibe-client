import { Link, useLocation } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useContext, useState } from "react";

import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import { AuthContext } from "../../Contexts/AuthProvider";

const NavigationBar = () => {
  const nav = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Courses", url: "/courses" },
    { id: 3, name: "Instructors", url: "/instructors" },
    { id: 3, name: "My Class", url: "/myClass" },
    { id: 4, name: "Contact", url: "/contact" },
    { id: 5, name: "Dashboard", url: "dashboard/student" },
    { id: 5, name: "Youtube", url: "/youtube" },
  ];

  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <header className=" mx-auto flex items-center justify-between fixed top-0 left-0 right-0  py-2 z-10 bg-[#5A49F8] shadow-lg">
      {/* Logo */}
      <Link to='/'>
        <div className="pl-5">
          {/* <img className="max-w-[50px]" src="/logo.png" alt="" /> */}
          <p className="text-white font-bold left-10 text-4xl font-custom absolute top-3">
            KnowVibe
          </p>
        </div>
      </Link>

      {/* Navbar */}
      <ul
        className={`flex gap-5 font-bold ${
          open
            ? "flex-col absolute top-16 justify-center items-center gap-10 bg-black text-white w-full h-[calc(100vh-64px)]"
            : "hidden md:flex"
        }`}
      >
        {nav.map((item) => (
          <Link
            key={item.id}
            to={item.url}
            onClick={handleLinkClick}
            className={`${
              pathname === item.url
                ? "text-white font-bold border-b-2 border-white "
                : " text-white font-semibold hover:text-white transition-all"
            }`}
          >
            <li>{item.name}</li>
          </Link>
        ))}
        {user?.email ? (
          <div className="md:hidden">
            <ProfileDropDown />
          </div>
        ) : (
          <Link onClick={() => setOpen(!open)} to={"/login"}>
            <button className="md:hidden flex items-center justify-center gap-1 font-semibold text-[#6C7171]">
              <FaUser />
              Login/Signup
            </button>
          </Link>
        )}
      </ul>

      {/* Login - Register */}
      <div className="pr-5">
        {user?.email ? (
          <div className="hidden md:block">
            <ProfileDropDown />
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="hidden md:flex items-center justify-center gap-1  py-3 font-semibold text-white">
              <FaUser />
              Login/Signup
            </button>
          </Link>
        )}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default NavigationBar;
