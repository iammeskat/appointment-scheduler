import Spinner from "components/Spinner";
import useIsLoggedin from "hooks/useIsLoggedin";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ comp }) => {
	const { isLoggedin } = useIsLoggedin();

	if (isLoggedin === undefined)
		return <Spinner />;

	return isLoggedin ? comp : <Navigate to="/login" />;
};

export default ProtectedRoute;
