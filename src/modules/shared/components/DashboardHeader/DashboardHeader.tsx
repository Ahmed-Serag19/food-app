import './DashboardHeader.css';

interface DashboardHeaderProps {
  title: string;
  paragraph: string;
  image: string;
  titleSpan?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  paragraph,
  image,
  titleSpan,
}) => {
  return (
    <div className="d-flex dashboard-header justify-content-between px-5 align-items-center text-white">
      <div className="header-text-container col-6">
        <h2 className="fw-bolder py-2 fs-2">
          {title}
          <span className="fw-normal text-capitalize">
            {titleSpan}
          </span>
        </h2>
        <p className="fs-5">{paragraph}</p>
      </div>
      <div className="header-image-container">
        {title == 'Welcome ' ? (
          <img className="w-75" src={image} alt={title} />
        ) : (
          <img width="200px" src={image} alt={title} />
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
