"use client";

import { signIn } from "next-auth/react";
import axios from "axios" /*after installing it with npm install axios */;
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form"; /* after npm install react-hook-form */

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast"; /* after npm install react-hot-toast */
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      // This data will only contain email and password because that is what we specified on our CREDENTIAL PROVIDER in [...nextauth].ts FILE
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      // check if callback went alright
      if (callback?.ok) {
        // so if we have succeefully login
        toast.success("Logged in");
        router.refresh(); /*this will update all te values once logged in */
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error); /* this will provide the proper error */
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle=" Login to your account" />
      {/* <Heading center title="Welcome to Airbnb" subtitle=" Create an account"  /> */}
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className=" flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
            text-neutral-500
            text-center
            mt-4
            font-light
        "
      >
        <div className="justify-center flex items-center gap-2">
          <div className="">First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading} /*it will be disabled when loading*/
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(
        onSubmit
      )} /** wrapping the onSubmit with handle submit helps us validate the form easily. you can submit anything till all fields are filled */
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
