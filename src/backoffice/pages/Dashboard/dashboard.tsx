import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/side-bar/DashboardSidebar";

export default function Dashboard() {
  return (
    <div className="d-flex">
      <DashboardSidebar />
      <div className="flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
}
