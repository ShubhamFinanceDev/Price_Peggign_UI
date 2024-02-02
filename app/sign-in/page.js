"use client";


import React from "react";
import useAuthHooks from "@/hooks/useAuthHooks";
import { icons } from "@/env/icons";
import withoutAuth from "@/hoc/withoutAuth";
import Link from "next/link";

const SignIn = () => {
    const { authBody, changeHandler, signinSubmitHandler } = useAuthHooks();

    return (
        <div className="container">
            <div className="login-page-outer-container">
                <form
                    onSubmit={signinSubmitHandler}
                    className="login-form-inner-container"
                >
                    <img src={icons.BRAND_LOGO} alt="Logo" />

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={authBody.email}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={authBody.password}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <p className="error">{authBody.error}</p>

                    <div className="mt-3">
                        <button
                            type="submit"
                            className={`btn btn-primary w-100`}
                        >
                            Sign In
                        </button>

                        <Link href="/sign-up">
                            <button className={`btn w-100 mt-3`}>
                                Don't have an account? Sign Up
                            </button>
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    );
};

// export default SignIn;
export default withoutAuth(SignIn);