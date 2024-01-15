import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Root from "../Layout/Root";
import Login from "../pages/Authentication/Login/Login";
import Registration from "../pages/Authentication/Registration/Registration";
import Contact from "../pages/Contact/Contact";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import Courses from "../pages/Courses/Courses";
import AddClass from "../pages/Dashboard/Instractors/AddClass";
import BookmarkedCourses from "../pages/Dashboard/Student/BookmarkedCourses/BookmarkedCourses";
import EndrolledCourses from "../pages/Dashboard/Student/EndrolledCourses/EndrolledCourses";
import Student from "../pages/Dashboard/Student/Student";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructor/Instructors";
import InstructorDetails from "../pages/InstructorDetails/InstructorDetails";
import MyClass from "../pages/MyClass/MyClass";
import Youtube from "../pages/Youtube/Youtube";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/instructors/:id",
        element: <InstructorDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/myClass",
        element: <MyClass />,
      },
      {
        path: "/youtube",
        element: <Youtube />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "student",
        element: <Student />,
      },
      {
        path: "enrolledCourses",
        element: <EndrolledCourses />,
      },
      {
        path: "bookmarkedCourse",
        element: <BookmarkedCourses />,
      },
      {
        path: "addClass",
        element: <AddClass />,
      },
    ],
  },
]);

export default router;
