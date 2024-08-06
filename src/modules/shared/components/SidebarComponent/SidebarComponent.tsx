import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import SidebarHeader from '../../../../assets/images/logo.png';
import './SidebarComponent.css';
import { useState } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { LuCalendarDays } from 'react-icons/lu';
import { FiLogOut } from 'react-icons/fi';

type Props = {
  setAuthToken: (token: string | null) => void;
};

const SidebarComponent = ({ setAuthToken }: Props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    setAuthToken(null);
    navigate('/login');
  };
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="sidebar-bg">
      <Sidebar collapsed={collapsed} className="sidebar">
        <Menu>
          <button onClick={() => setCollapsed((prev) => !prev)}>
            <img
              src={SidebarHeader}
              alt=""
              width={collapsed ? '100px' : '180px'}
            />
          </button>
          <MenuItem
            icon={<IoHomeOutline />}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<FaUsers />}
            component={<Link to="/dashboard/users-list" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<IoFastFoodOutline />}
            component={<Link to="/dashboard/categories-list" />}
          >
            Recipes
          </MenuItem>
          <MenuItem
            icon={<LuCalendarDays />}
            component={<Link to="/dashboard/recipes-list" />}
          >
            Categories
          </MenuItem>
          <MenuItem
            icon={<FiLogOut />}
            component={<Link to="/login" />}
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
