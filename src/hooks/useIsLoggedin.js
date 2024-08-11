import { auth } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import useGetPeople from './people/useGetPeople';

const useIsLoggedin = () => {
	const [isLoggedin, setIsLoggedin] = useState(undefined);
	const [user, setUser] = useState(null);
	const { data: userData } = useGetPeople(user?.uid);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
				setIsLoggedin(true);
				console.log({ currentUser })
			} else {
				setUser(null);
				setIsLoggedin(false);
			}
		});
		return () => unsubscribe();
	}, []);
	return ({
		user: { ...user, people: userData },
		isLoggedin,
	})
}

export default useIsLoggedin