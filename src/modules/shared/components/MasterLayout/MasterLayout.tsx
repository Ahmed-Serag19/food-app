import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SidebarComponent from '../SidebarComponent/SidebarComponent';

type Props = {
  setAuthToken: (token: string | null) => void;
};
const MasterLayout = ({ setAuthToken }: Props) => {
  return (
    <div>
      <div className="d-flex gap-3 ">
        <SidebarComponent setAuthToken={setAuthToken} />

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
