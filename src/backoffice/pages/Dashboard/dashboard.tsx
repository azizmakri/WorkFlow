import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/side-bar/DashboardSidebar";

export default function Dashboard() {
  return (
    <div className="d-flex"
    style={{ height: '100vh', overflow: 'hidden' }} 
    >
      <DashboardSidebar />
      <div
        className="flex-grow-1"
        style={{
          overflowY: 'auto',
          padding: '20px',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
