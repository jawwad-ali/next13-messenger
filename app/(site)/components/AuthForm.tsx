"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Inputs/Input";

import { BsGithub, BsGoogle } from "react-icons/bs";

import { useCallback, useState } from "react";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import NextAuth from "next-auth/next";
import axios from "axios";

type VARIANT = "Login" | "Register";

const AuthForm = () => {
  const [variant, setVariant] = useState<VARIANT>("Login");
  const [loading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "Login") {
      setVariant("Register");
    } else {
      setVariant("Login");
    }
  }, [variant]);

  //   React-hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  //   Submit Handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    if (variant === "Register") {
      // Axios Register
      axios.post("/api/register", data);
    } else {
      // NextAuth SignIn
    }
  };

  const socialAction = (action: string) => {
    setLoading(true);
    // NextAuth SignIn
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* register state */}
          {variant === "Register" && (
            <Input
              disabled={loading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}

          {/* Login state */}
          <Input
            id="email"
            register={register}
            errors={errors}
            type="email"
            label="Email Address"
            disabled={loading}
          />
          <Input
            id="password"
            type="password"
            register={register}
            errors={errors}
            disabled={loading}
            label="Password"
          />
          <div>
            <Button disabled={loading} fullWidth type="submit">
              {variant === "Login" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or Continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "Login"
              ? "New to Messenger"
              : "Already have an account"}
          </div>

          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "Login" ? "Create An account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
