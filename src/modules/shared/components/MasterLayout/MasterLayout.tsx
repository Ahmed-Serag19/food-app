import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

const MasterLayout = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-3 bg-primary h-100">
          <Sidebar />
        </div>
        <div className="col-9">
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
