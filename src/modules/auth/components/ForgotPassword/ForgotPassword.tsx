// src/components/ForgotPassword/ForgotPassword.tsx

import { useState } from "react";
import AuthContainer from "../../../shared/components/AuthContainer/AuthContainer";
import AuthLogo from "../../../shared/components/AuthLogo/AuthLogo";
import { CiMobile3 } from "react-icons/ci";
import AuthButton from "../../../shared/components/AuthButton/AuthButton";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleForgotPassword } from "../../../../utils/AuthApiFunctions";

type ForgotPasswordInput = {
  email: string;
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordInput>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
    setLoading(true);

    try {
      await handleForgotPassword(data.email);
      setLoading(false);
      reset();
      navigate("/reset-password");
      toast.success("Check Your Email. OTP is sent", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      setTimeout(() => {
        navigate("/register");
      }, 2500);
    }
  };

  return (
    <AuthContainer>
      <div className="login no-select p-5 rounded-border col-md-5 bg-white">
        <AuthLogo />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto d-flex flex-column  justify-content-center align-content-center w-100"
        >
          <h4>Forgot Your Password?</h4>
          <p className="text-muted">
            No worries! Please enter your email and we will send a password
            reset link
          </p>
          <div className="inputs-container d-flex flex-column gap-4 py-5">
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-danger py-2">{errors.email.message}</span>
            )}
          </div>
          <AuthButton text="Submit" type="submit" loading={loading} />
        </form>
      </div>
    </AuthContainer>
  );
};

export default ForgotPassword;
