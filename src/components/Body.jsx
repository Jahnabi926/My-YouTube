import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
