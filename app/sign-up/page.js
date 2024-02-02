"use client";


import React from 'react'
import UseAuthHooks from '@/hooks/useAuthHooks';
import { icons } from '@/env/icons';
import Link from 'next/link';

const SignUpPage = () => {
    const { signUpBody, signUpChangeHandler, signupSubmitHandler } = UseAuthHooks();

    return (
        <div className="container">
            <div className="login-page-outer-container">
                <form
                    onSubmit={signupSubmitHandler}
                    className="login-form-inner-container"
                >
                    <img src={icons.BRAND_LOGO} alt="Logo" />
                    <div className="mt-2">
                        <label htmlFor="name">First Name</label>
                        <input type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={signUpBody.name}
                            onChange={signUpChangeHandler}
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="name">Last Name</label>
                        <input type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            value={signUpBody.lastName}
                            onChange={signUpChangeHandler}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={signUpBody.email}
                            onChange={signUpChangeHandler}
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
                            value={signUpBody.password}
                            onChange={signUpChangeHandler}
                            required
                        />
                    </div>
                    <p className="error">{signUpBody.error}</p>

                    <div className="mt-3">
                        <button
                            type="submit"
                            className={`btn btn-primary w-100`}
                        >
                            Sign Up
                        </button>

                        <Link href="/sign-in">
                            <button className={`btn w-100 mt-3`}>
                                Already have an account? Sign In
                            </button>
                        </Link>

                    </div>
                </form>
            </div>
        </div>)
}

export default SignUpPage