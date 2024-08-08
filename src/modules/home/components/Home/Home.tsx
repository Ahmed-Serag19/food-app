import DashboardHeader from '../../../shared/components/DashboardHeader/DashboardHeader';
import HomeImage from '../../../../assets/images/header-home.svg';

interface HomeProps {
  userName?: string;
}

const Home: React.FC<HomeProps> = ({ userName }) => {
  return (
    <div className="py-3">
      <DashboardHeader
        title={`Welcome `}
        titleSpan={userName}
        image={HomeImage}
        paragraph="This is a welcoming screen for the entry of the application , you can now see the options"
      />
    </div>
  );
};

export default Home;
