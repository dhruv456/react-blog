import React, { useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useForm, Controller } from "react-hook-form";
import authService from "../service/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../feature/authSlice";
import { useDispatch } from "react-redux";

const LoginComponent = () => {
  const [isLoginFailed, setIsLoginFailed] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isLoginFailed) {
      const timer = setTimeout(() => {
        setIsLoginFailed(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoginFailed]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const res = await authService.login({
      emailId: data.username,
      password: data.password,
    });
    if (!res) {
      setIsLoginFailed(true);
      return;
    }
    dispatch(login(data.username));
    navigate("/");
    return;
  };

  return (
    <div className="max-w-md mx-auto  p-6 border rounded-2xl shadow-lg">
      <h1 className="text-3xl my-auto inline">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          rules={{
            required: "this field is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "invalid email address",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              label="Username"
              placeholder="Enter your username"
            />
          )}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
        <Controller
          name="password"
          control={control}
          rules={{ required: "this field is required" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
        <Button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="mt-4 px-6 my-auto disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Login
        </Button>
      </form>
      {isLoginFailed && (
        <p className="text-red-500 text-sm mt-1">
          Login failed, please try again
        </p>
      )}
    </div>
  );
};

export default LoginComponent;
