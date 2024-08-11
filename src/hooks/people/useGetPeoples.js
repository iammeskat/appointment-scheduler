import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { COLLECTIONS } from 'utils/data';

const useGetPeoples = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const fetchUsers = async () => {
			try {
				const peoplesCollection = collection(db, COLLECTIONS.PEOPLE);
				const peoplesSnapshot = await getDocs(peoplesCollection);
				const peopleList = peoplesSnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				setData(peopleList);
			} catch (error) {
				console.log({ error })
			} finally {
				setIsLoading(false)
			}
		};

		fetchUsers();
	}, []);

	return { data, isLoading };
}

export default useGetPeoples