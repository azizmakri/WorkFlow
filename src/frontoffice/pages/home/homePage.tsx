import { Outlet } from "react-router-dom";
import FrontSidebar from "../../components/side-bar/FrontSidebar";

export default function HomePage() {
  return (
    <div
      className="d-flex"
      style={{ height: '100vh', overflow: 'hidden' }} // Prevent page scroll
    >
      <FrontSidebar />
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
