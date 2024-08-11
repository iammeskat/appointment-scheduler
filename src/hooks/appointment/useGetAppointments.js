import { db } from 'config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { COLLECTIONS } from 'utils/data';

const useGetAppointments = (userId, def = false) => {
	console.log({ userId })
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		
		setIsLoading(true);
		const fetchAppointments = async () => {
			try {
				const q1 = query(
					collection(db, COLLECTIONS.APPOINTMENT),
					where("receiver.id", "==", userId)
				);

				const q2 = query(
					collection(db, COLLECTIONS.APPOINTMENT),
					where("inviter.id", "==", userId)
				);

				// Execute both queries
				const querySnapshot1 = await getDocs(q1);
				const querySnapshot2 = await getDocs(q2);

				// Combine results, avoiding duplicates
				const results = [];

				querySnapshot1.forEach((doc) => {
					results.push({ id: doc.id, ...doc.data() });
				});

				querySnapshot2.forEach((doc) => {
					if (!results.find(item => item.id === doc.id)) {
						results.push({ id: doc.id, ...doc.data() });
					}
				});
				setData(results);
			} catch (error) {
				console.log({ error })
			} finally {
				setIsLoading(false)
			}
		};
		if (userId) {
			fetchAppointments();
		}
	}, [userId, def]);

	return { data, isLoading };
}

export default useGetAppointments