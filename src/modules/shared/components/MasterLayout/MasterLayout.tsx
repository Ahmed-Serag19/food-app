import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SidebarComponent from '../SidebarComponent/SidebarComponent';

type Props = {
  setAuthToken: (token: string | null) => void;
};
const MasterLayout = ({ setAuthToken }: Props) => {
  return (
    <div>
      <div className="d-flex gap-5 ">
        <SidebarComponent setAuthToken={setAuthToken} />

        <div className="w-100 p-5">
          <Navbar />
          <div className="bg-warning">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
