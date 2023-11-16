import { Outlet } from "react-router-dom";
import NavigationBar from "../Components/Shared/NavigationBar";

const Root = () => {
  return (
    <div>
      <div className="mt-[4rem]">
        <NavigationBar />
      </div>
      <Outlet />
    </div>
  );
};

export default Root;
