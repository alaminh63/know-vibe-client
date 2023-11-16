import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Login = () => {
  const [toggleIcon, setToggleIcon] = useState(false);
  const { signIn, signInGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { axiosSecure } = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Log In Successful",
          showConfirmButton: false,
          buttonsStyling: "#32c770",
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          buttonsStyling: {
            color: "#32c770",
            backgroundColor: "#32c770",
          },

          title: `${err.message}`,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  };

  const handleGoogleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInGoogle(googleProvider)
      .then((result) => {
        const user = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photo_url: result?.user?.photoURL,
        };

        axiosSecure.put(`/add-user?email=${user?.email}`, user).then((res) => {
          if (res.data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login sucessfull",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="bg-white lg:w-4/12 md:6/12 pt-20 w-10/12 m-auto  ">
        <div className="py-8 px-8 rounded-xl shadow-2xl">
          <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} action="" className="mt-6">
            <div className="my-5 text-sm">
              <label htmlFor="email" className="block text-black">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Email"
              />
            </div>
            <div className="my-5 text-sm">
              <label htmlFor="password" className="block text-black">
                Password
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                type={`${toggleIcon ? "text" : "password"}`}
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Password"
              />
              <span
                onClick={() => setToggleIcon(!toggleIcon)}
                className="absolute mt-7 mr-20 ml-2 toggle-icon"
              >
                {toggleIcon ? (
                  <FontAwesomeIcon
                    className="block"
                    icon={faEyeSlash}
                  ></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon
                    className="block"
                    icon={faEye}
                  ></FontAwesomeIcon>
                )}
              </span>
              <div className="flex justify-end mt-2 text-xs text-gray-600">
                <>
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must be PATTERN rules
                    </p>
                  )}
                </>
              </div>
            </div>

            <input
              className="btn block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
              type="submit"
              value="Login"
            />
          </form>
          <div className="flex md:justify-between justify-center items-center mt-10">
            <div
              style={{ height: 1 }}
              className="bg-gray-300 md:block hidden w-4/12"
            />
            <p className="md:mx-2 text-sm font-light text-gray-400">
              {" "}
              Login With Social{" "}
            </p>
            <div
              style={{ height: 1 }}
              className="bg-gray-300 md:block hidden w-4/12"
            />
          </div>
          <div className="block mt-7">
            <div>
              <button
                onClick={handleGoogleLogin}
                className="text-center w-full text-white bg-orange-700 p-3 duration-300 rounded-sm hover:bg-blue-700"
              >
                Google
              </button>
            </div>
         
          </div>
          <p className="mt-12 text-xs text-center font-light text-gray-400">
            Dont have an account?
            <Link to="/registration" className="text-black font-medium">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
