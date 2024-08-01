// src/components/ResetPassword/ResetPassword.tsx

import { useState } from 'react';
import AuthContainer from '../../../shared/components/AuthContainer/AuthContainer';
import AuthLogo from '../../../shared/components/AuthLogo/AuthLogo';
import { CiLock, CiMail, CiMobile3 } from 'react-icons/ci';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import AuthButton from '../../../shared/components/AuthButton/AuthButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { handleResetPassword } from '../../../../utils/apiFunctions';

type ResetPasswordFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ResetPasswordFormInputs>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (
    data
  ) => {
    setLoading(true);
    console.log('Form submitted with data:', data);

    try {
      await handleResetPassword(
        data.email,
        data.seed,
        data.password,
        data.confirmPassword
      );

      setLoading(false);
      reset();
      navigate('/login');
      toast.success('Password reset successful!', {
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
      toast.error('Failed to reset password.', {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  const newPassword = watch('password');

  return (
    <AuthContainer>
      <div className="reset-password no-select p-5 rounded-border col-md-6 bg-white">
        <AuthLogo />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto d-flex flex-column justify-content-center align-content-center w-100"
        >
          <h4>Reset Password</h4>
          <p className="text-muted">
            Please enter your OTP or check your inbox
          </p>
          <div className="inputs-container d-flex flex-column gap-2 pt-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <CiMail />
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-danger py-2">
                {errors.email.message}
              </span>
            )}
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">
                  <CiMobile3 />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="OTP"
                aria-label="seed"
                aria-describedby="basic-addon2"
                {...register('seed', {
                  required: 'OTP is required',
                })}
              />
            </div>
            {errors.seed && (
              <span className="text-danger py-2">
                {errors.seed.message}
              </span>
            )}
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon3">
                  <CiLock />
                </span>
              </div>
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="New Password"
                aria-label="password"
                aria-describedby="basic-addon3"
                {...register('password', {
                  required: 'New Password is required',
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 and 30 characters long',
                  },
                })}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text text-muted"
                  id="toggle-new-password"
                  onClick={toggleNewPasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  {showNewPassword ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
            </div>
            {errors.password && (
              <span className="text-danger">
                {errors.password.message}
              </span>
            )}
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon4">
                  <CiLock />
                </span>
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Confirm New Password"
                aria-label="Confirm New Password"
                aria-describedby="basic-addon4"
                {...register('confirmPassword', {
                  required: 'Please confirm your new password',
                  validate: (value) =>
                    value === newPassword || 'Passwords do not match',
                })}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text text-muted"
                  id="toggle-confirm-password"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
            </div>
            {errors.confirmPassword && (
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <AuthButton
            text="Reset Password"
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </AuthContainer>
  );
};

export default ResetPassword;
