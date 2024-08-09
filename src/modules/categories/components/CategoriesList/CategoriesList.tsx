import DashboardHeader from '../../../shared/components/DashboardHeader/DashboardHeader';
import UserHeaderImage from '../../../../assets/images/header-recipes.svg';

const CategoriesList = () => {
  return (
    <div className="categories-list py-3">
      <DashboardHeader
        title="Categories "
        image={UserHeaderImage}
        titleSpan="items"
        paragraph="You can now add your items that any user can order it from the Application and you can edit"
      />
    </div>
  );
};

export default CategoriesList;
