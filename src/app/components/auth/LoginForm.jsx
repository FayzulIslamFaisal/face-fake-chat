"use client";
import { useForm } from "react-hook-form";
import axios from "axios";

import Field from "../common/Field";
import { useRouter } from "next/navigation";
import { UseAuth } from "@/app/hooks/UseAuth";

const LoginForm = () => {
  const { setAuth } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (formData) => {
    try {
      console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        formData
      );
      console.log(response.data);
      if (response?.status === 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          setAuth({ user, authToken, refreshToken });
          router.push("/");
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Invalid email ${formData.email} is Not Found`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    >
      {/* Email Field */}
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", {
            required: "Email is required",
          })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-500"
          }`}
          name="email"
          type="email"
          id="email"
          autoComplete="off"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </Field>

      {/* Password Field */}
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-500"
          }`}
          name="password"
          type="password"
          id="password"
          autoComplete="off"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </Field>

      {/* Submit Button */}
      <p>{errors?.root?.random?.message}</p>
      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
