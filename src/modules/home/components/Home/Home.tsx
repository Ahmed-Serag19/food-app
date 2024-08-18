import DashboardHeader from "../../../shared/components/DashboardHeader/DashboardHeader";
import HomeImage from "../../../../assets/images/header-home.svg";
import CallToActionCard from "../../../shared/components/CallToActionCard/CallToActionCard";

interface HomeProps {
  userName?: string;
}

const Home: React.FC<HomeProps> = ({ userName }) => {
  return (
    <section>
      <div className="py-3">
        <DashboardHeader
          title={`Welcome `}
          titleSpan={userName}
          image={HomeImage}
          paragraph="This is a welcoming screen for the entry of the application , you can now see the options"
        />
      </div>
      <div>
        <CallToActionCard
          buttonText="Fill Recipes"
          linkTo="/dashboard/recipes"
          title="Fill the Recipes !"
          description="you can now fill the meals easily using the table and form , click here and sill it with the table !"
        />
      </div>
    </section>
  );
};

export default Home;
