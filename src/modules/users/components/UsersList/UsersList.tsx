import DashboardHeader from '../../../shared/components/DashboardHeader/DashboardHeader';
import UserHeaderImage from '../../../../assets/images/header-recipes.svg';
const UsersList = () => {
  return (
    <div className="users-list py-3">
      <DashboardHeader
        title="Users "
        image={UserHeaderImage}
        titleSpan="List"
        paragraph="You can now add your items that any user can order it from the application and you can edit"
      />
    </div>
  );
};

export default UsersList;
