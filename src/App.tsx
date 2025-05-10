import { Outlet } from "react-router-dom";
import Sidebar from "./frontoffice/components/side-bar/FrontSidebar";
import FrontendRoutes from "./routes/PrivateRoute";

function App() {

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        {<Outlet />}
      </div>
    </div>
  );}

export default App
