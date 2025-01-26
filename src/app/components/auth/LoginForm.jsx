"use client";
import { useForm } from "react-hook-form";

import Field from "../common/Field";
import { useRouter } from "next/navigation";
import { UseAuth } from "@/app/hooks/UseAuth";

const LoginForm = () => {
  const { setAuth } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = (formData) => {
    const user = { ...formData };
    setAuth({ user });
    router.push("/");
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
