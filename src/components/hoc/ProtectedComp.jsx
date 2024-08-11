import useIsLoggedin from 'hooks/useIsLoggedin';

const ProtectedComp = ({ children }) => {
	const { isLoggedin } = useIsLoggedin();
	return isLoggedin ? children : '';
}

export default ProtectedComp