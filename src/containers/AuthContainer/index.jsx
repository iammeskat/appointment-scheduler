import Login from 'components/auth/Login';
import Signup from 'components/auth/Signup';
import React, { useState } from 'react';

const AuthContainer = () => {
	const [mode, setMode] = useState("login");
	const switchToLogin = () => setMode("login");
	const switchToSignup = () => setMode("signup");
	// const isUserLoggedin = isLoggedIn();
	// console.log({ isUserLoggedin })

	return (
		<div className='flex flex-col gap-2 h-full pt-16'>
			{mode === "login" ? (
				<Login switchToSignup={switchToSignup} />
			) : (
				<Signup switchToLogin={switchToLogin} />
			)}
		</div>
	)
}

export default AuthContainer