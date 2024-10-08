import { useState } from 'react';
import AuthContainer from '../../../shared/components/AuthContainer/AuthContainer';
import AuthLogo from '../../../shared/components/AuthLogo/AuthLogo';
import { CiLock, CiMobile3 } from 'react-icons/ci';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import AuthButton from '../../../shared/components/AuthButton/AuthButton';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { handleLogin } from '../../../../utils/AuthApiFunctions';

type LoginFormInputs = {
  email: string;
  password: string;
};
type LoginProps = {
  onLoginSuccess: (token: string) => void;
};
const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const token = await handleLogin(email, password);
      setLoading(false);
      reset();
      onLoginSuccess(token);
      navigate('/dashboard');
      toast.success('Login successful!', {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <div className="login no-select p-5 rounded-border col-md-5 bg-white">
        <AuthLogo />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto d-flex flex-column justify-content-center align-content-center w-100"
        >
          <h4>Log In</h4>
          <p className="text-muted">
            Welcome Back! Please enter your details
          </p>
          <div className="inputs-container d-flex flex-column gap-2 pt-4">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <CiMobile3 />
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your E-mail"
                aria-label="Email"
                aria-describedby="basic-addon1"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-danger pb-4">
                {errors.email.message}
              </span>
            )}
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">
                  <CiLock />
                </span>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long',
                  },
                })}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text text-muted"
                  id="toggle-password"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
            </div>
            {errors.password && (
              <span className="text-danger">
                {errors.password.message}
              </span>
            )}
            <div className="login-links d-flex justify-content-between mb-3">
              <Link to="/register" className="primary-green">
                Register Now?
              </Link>
              <Link to="/forgot-password" className="primary-green">
                Forgot Password?
              </Link>
            </div>
          </div>
          <AuthButton text="Login" type="submit" loading={loading} />
        </form>
      </div>
    </AuthContainer>
  );
};

export default Login;
