import DashboardHeader from '../../../shared/components/DashboardHeader/DashboardHeader';
import UserHeaderImage from '../../../../assets/images/header-recipes.svg';

const RecipesList = () => {
  return (
    <div className="recipes-list py-3">
      <DashboardHeader
        title="Recipes "
        image={UserHeaderImage}
        titleSpan="items"
        paragraph="You can now add your items that any user can order it from the Application and you can edit"
      />
    </div>
  );
};

export default RecipesList;
