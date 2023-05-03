import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';
import isObjectFieldEmpty from '../../utils/isObjectFieldEmpty';

const AdminLogin = () => {

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    //using RTK Query mutation for login.
    const [login, { data, isLoading, error: loginError }] =
        useLoginMutation();


    /*  
    * Routing to private page if the user logged in
    * or showing error by updating error state using reacts useEffect. 
    */
    useEffect(() => {
        if (loginError?.data) {
            setError(loginError.data);
        }

    }, [data, loginError]);


    const handleLogin = (event) => {
        event.preventDefault();
        if (!isObjectFieldEmpty(loginData)) {

            setError("");
            login(loginData);
        } else {
            setError("Some fields are empty.");
        }
    }

    // email password entry function
    const handleOnChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <section className="py-6 bg-primary h-screen grid place-items-center">
                <div className="mx-auto max-w-md px-5 lg:px-0">
                    <div>
                        <img className="h-12 mx-auto" src="../image/learningportal.svg" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                            Sign in to Admin Account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" type="email" autoComplete="email" required
                                    className="login-input rounded-t-md" placeholder="Email address"
                                    value={loginData.email} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required
                                    className="login-input rounded-b-md" placeholder="Password"
                                    value={loginData.password} onChange={handleOnChange} />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-violet-600 hover:text-violet-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AdminLogin;