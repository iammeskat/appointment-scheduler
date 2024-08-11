import useIsLoggedin from "hooks/useIsLoggedin";
import { Loader2 } from "lucide-react";
import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ comp }) => {
	const { isLoggedin } = useIsLoggedin();

	if (isLoggedin === undefined)
		return <Loader2 className="animate-spin mx-auto size-14 text-slate-600" />;

	return isLoggedin ? <Navigate to="/" /> : comp;
};

export default GuestRoute;
