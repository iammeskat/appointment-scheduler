import { db } from 'config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { COLLECTIONS } from 'utils/data';

const useCreateAppointment = () => {
	const [isLoading, setIsLoading] = useState(false);

	const createAppointment = async (data = {}) => {
		try {
			setIsLoading(true);
			const res = await addDoc(collection(db, COLLECTIONS.APPOINTMENT), data);
			return res;
		} catch (error) {
			console.log({ error })
		} finally {
			setIsLoading(false);
		}

	}

	return { createAppointment, isLoading };
}

export default useCreateAppointment