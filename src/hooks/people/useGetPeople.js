import { db } from 'config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { COLLECTIONS } from 'utils/data';

const useGetPeople = (userUid) => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (userUid) {
			setIsLoading(true);
			const fetchUsers = async () => {
				try {
					const peopleQuery = query(collection(db, COLLECTIONS.PEOPLE), where("userUid", "==", userUid));
					const peoplesSnapshot = await getDocs(peopleQuery);
					const peopleList = peoplesSnapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data()
					}));
					setData(peopleList?.[0] || {});
				} catch (error) {
					console.log({ error })
				} finally {
					setIsLoading(false)
				}
			};

			fetchUsers();
		}
	}, [userUid]);

	return { data, isLoading };
}

export default useGetPeople