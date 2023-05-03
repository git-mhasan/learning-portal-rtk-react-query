import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/ui/Error';
import { useRegisterMutation } from '../../features/auth/authApi';
import isObjectFieldEmpty from '../../utils/isObjectFieldEmpty';

const SignUp = () => {

    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    //using RTK Query mutation for registering new user.
    const [register, { data, isLoading, error: registerError }] = useRegisterMutation();

    /*  
    * Routing to private page if the user logged in
    * or showing error by updating error state using reacts useEffect. 
    */
    useEffect(() => {
        if (registerError?.data) {
            setError(registerError.data);
        }

    }, [data, registerError, navigate]);


    const handleSignUpSubmit = (event) => {
        event.preventDefault();

        if (!isObjectFieldEmpty(signUpData)) {

            setError("");

            if (signUpData.confirmPassword !== signUpData.password) {
                setError("Passwords do not match");
            } else {
                const signUpInfo = { ...signUpData, role: "student" }
                delete signUpInfo.confirmPassword;
                register(signUpInfo);
            }
        } else {
            setError("Some fields are empty.");
        }

    };


    const handleOnChange = (event) => {
        setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <section className="py-6 bg-primary h-screen grid place-items-center">
                <div className="mx-auto max-w-md px-5 lg:px-0">
                    <div>
                        <img className="h-12 mx-auto" src="/image/learningportal.svg" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                            Create Your New Account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSignUpSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input id="name" name="name" type="name" autoComplete="name" required
                                    className="login-input rounded-t-md" placeholder="Student Name"
                                    value={signUpData.name} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" type="email" autoComplete="email" required
                                    className="login-input " placeholder="Email address"
                                    value={signUpData.email} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required
                                    className="login-input" placeholder="Password"
                                    value={signUpData.password} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                                <input id="confirm-password" name="confirmPassword" type="password"
                                    autoComplete="confirm-password" required className="login-input rounded-b-md"
                                    placeholder="Confirm Password" value={signUpData.confirmPassword} onChange={handleOnChange} />
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                                Create Account
                            </button>
                        </div>
                        {error !== "" && <Error message={error} />}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default SignUp;