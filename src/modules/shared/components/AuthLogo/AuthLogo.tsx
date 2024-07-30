import AuthLogoImage from '../../../../assets/images/logo-header.png';
const AuthLogo = () => {
  return (
    <div className="auth-logo-container d-block py-4 text-center">
      <img src={AuthLogoImage} alt="food app logo" className="w-50" />
    </div>
  );
};

export default AuthLogo;
