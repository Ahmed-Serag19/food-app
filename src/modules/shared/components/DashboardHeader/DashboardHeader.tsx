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
    <div className="d-flex dashboard-header justify-content-around align-items-center text-white">
      <div className="header-text-container">
        <h1 className="fw-bolder py-3">
          {title}
          <span className="fw-normal text-capitalize">
            {titleSpan}
          </span>
        </h1>
        <p className="fs-5">{paragraph}</p>
      </div>
      <div className="header-image-container">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default DashboardHeader;
