import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { selectAuthUser } from '../features/auth/authSelector';
import { userLoggedOut } from '../features/auth/authSlice';

const Navbar = () => {

    const dispatch = useDispatch();
    const leaderboardPage = useMatch("/leaderboard");
    const quizPage = useMatch("/quiz");

    // Get user's name to show at the nav menu 
    const loggedInUser = useSelector(selectAuthUser);

    const handleLogout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };

    return (
        <nav className="shadow-md">
            <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
                <Link to={`${loggedInUser.role === "admin" ? "/admin" : "/"}`}><img className="h-10" src="/image/learningportal.svg" /></Link>
                <div className="flex items-center gap-3">

                    {/* 
                        Dynamicly showing menu and Name/Admin on the navbar
                    */}
                    {(loggedInUser.role === "student") && (!quizPage && <Link to="/leaderboard" className={`${leaderboardPage && "font-bold"}`}>Leaderboard</Link>)}
                    {(loggedInUser.role === "admin") ? <h2 className="font-bold">Admin</h2> : <Link to="/lesson/1" className={`${!leaderboardPage && "font-bold"}`}>{loggedInUser.name}</Link>}
                    <button

                        className={`flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all ${(loggedInUser.role === "admin") ? "bg-red-600 hover:bg-red-700 font-medium" : "border border-cyan hover:bg-cyan"}`}
                        onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;