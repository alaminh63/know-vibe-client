import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import NavigationBar from "../Components/Shared/NavigationBar";

const Root = () => {
  return (
    <div>
      <div className="mt-[4rem]">
        <NavigationBar />
      </div>
      <Outlet />
      <div className="mt-[4rem]">
        <Footer/>
      </div>
    </div>
  );
};

export default Root;
