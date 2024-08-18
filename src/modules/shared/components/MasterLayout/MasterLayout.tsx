import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SidebarComponent from "../SidebarComponent/SidebarComponent";

type Props = {
  setAuthToken: (token: string | null) => void;
};
const MasterLayout = ({ setAuthToken }: Props) => {
  return (
    <div>
<<<<<<< HEAD
      <div className="d-flex gap-3 ">
        <SidebarComponent setAuthToken={setAuthToken} />
=======
      <div className="d-flex gap-3">
        <div className="side">
          <div className="side-bar-container">
            <SidebarComponent setAuthToken={setAuthToken} />
          </div>
        </div>
>>>>>>> abc5de60bdf12582ebad8a0399e04dffbf288070

        <div className="w-100 px-3 py-4">
          <Navbar />
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
