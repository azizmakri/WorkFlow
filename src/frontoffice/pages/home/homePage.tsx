import { Outlet } from "react-router-dom";
import FrontSidebar from "../../components/side-bar/FrontSidebar";

export default function HomePage() {
  return (
    <div className="d-flex">
      <FrontSidebar />
      <div className="flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
}
