import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import { useContext, useState } from "react";

import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import { AuthContext } from "../../Contexts/AuthProvider";

const NavigationBar = () => {
  const nav = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Courses", url: "/courses" },
    { id: 3, name: "About", url: "/about" },
    { id: 4, name: "Contact", url: "/contact" },
    { id: 5, name: "Dashboard", url: "dashboard/student" },
  ];

  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <header className=" mx-auto flex items-center justify-between fixed top-0 left-0 right-0  py-2 z-10 bg-white shadow-lg">
      {/* Logo */}
      <div className="pl-5">
        <img className="max-w-[50px]" src="/logo.png" alt="" />
      </div>

      {/* Navbar */}
      <ul
        className={`flex gap-5 ${
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
                ? "text-[#FF5522] border-b-2 border-[#FF5522] font-semibold"
                : " text-[#6C7171] hover:text-[#FF5522] transition-all"
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

     
    </header>
  );
};

export default NavigationBar;