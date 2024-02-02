import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";

import axios from "@/services/axios";
import API from "@/services/endpoints";
import useValidationHooks from "./useValidationHooks";
import errorHandler from "@/utils/handler.utils";
import pageRoutes from "@/utils/pageRoutes";
import { setUser } from "@/redux/slice/auth.slice";
import { removeUserCookies } from '@/hooks/helper/cookies'
import { useRouter } from "next/navigation";

const authIninitalBody = {
  email: "",
  password: "",
  error: "",
}
const singUpIninitalBody = {
  error: "",
  name: "",
  lastName: "",
  email: "",
  password: "",
}

const errorMessage = {
  EMAIL_ERROR: "Please enter a valid officially issued email address.",
  PASSWORD_ERROR: "Please enter a valid password."
}

const UseAuthHooks = () => {

  const dispatch = useDispatch();
  const router = useRouter()

  const { isEmailValid } = useValidationHooks()

  const [authBody, setAuthBody] = useState({ ...authIninitalBody })
  const [signUpBody, setSignUpBody] = useState({ ...singUpIninitalBody })

  const authBodyErrorHandler = (error) => {
    setAuthBody(state => ({ ...state, error: error }))
  }
  const signUpBodyErrorHandler = (error) => {
    setSignUpBody(state => ({ ...state, error: error }))
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const prevState = { ...authBody };
    prevState[name] = value;
    prevState.error = "";
    setAuthBody(prevState);
  }

  const signUpChangeHandler = (e) => {
    const { name, value } = e.target;
    const prevState = { ...signUpBody };
    prevState[name] = value;
    setSignUpBody(prevState);
  }

  const signinSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const body = {}

      if (!isEmailValid(authBody.email)) {
        authBodyErrorHandler(errorMessage.EMAIL_ERROR)
        return
      }
      body.email = authBody.email
      body.password = authBody.password

      const { data } = await axios.post(API.signIn.post(), body)

      if (data.code == "1111") {
        setAuthBody(state => ({ ...state, error: data.msg || "" }))
        return
      }

      Cookies.set("email", data.email)
      Cookies.set("userId", data.userId)
      Cookies.set("name", data.name)

      dispatch(setUser({
        email: data.email,
        userId: data.userId,
        name: data.name,
      }));

      router.push("/");
    } catch (error) {
      errorHandler(error)
    }
  }

  const signupSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const body = {}
      if (!isEmailValid(signUpBody.email)) {
        signUpBodyErrorHandler(errorMessage.EMAIL_ERROR)
        return
      }

      body.email = signUpBody.email
      body.password = signUpBody.password
      body.name = signUpBody.name
      body.lastName = signUpBody.lastName
      body.active = 1
      body.userRoles = [{ "role": "2" }]

      const { data } = await axios.post(API.addUser.post(), body)

      if (data.code == "1111") {
        setSignUpBody(state => ({ ...state, error: data.msg || "" }))
        return
      } else {
        setSignUpBody({ ...singUpIninitalBody })
        alert("Sign up success!")
        router.push("/sign-in");

      }

    } catch (error) {
      errorHandler(error)
    }
  }

  const logoutHandler = () => {
    dispatch(setUser({
      email: "",
      userId: "",
      name: ""
    }));
    removeUserCookies()
    router.push(pageRoutes.SIGN_IN_PAGE())
  }

  return {
    authBody, signUpBody, signUpChangeHandler, changeHandler, signinSubmitHandler, logoutHandler, signupSubmitHandler
  };
};

export default UseAuthHooks;