import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Login from "../pages/Authentication/Login/Login";
import Registration from "../pages/Authentication/Registration/Registration";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import Courses from "../pages/Courses/Courses";
import Home from "../pages/Home/Home";

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
    ],
  },
]);

export default router;
