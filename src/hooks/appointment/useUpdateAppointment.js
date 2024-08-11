import { db } from 'config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { COLLECTIONS } from 'utils/data';

const useUpdateAppointment = () => {
	const [isLoading, setIsLoading] = useState(false);

	const updateAppointment = async (docId, newData = {}) => {
		try {
			setIsLoading(true);
			const res = await updateDoc(doc(db, COLLECTIONS.APPOINTMENT, docId), newData);
			return res;
		} catch (error) {
			console.log({ error })
		} finally {
			setIsLoading(false);
		}

	}

	return { updateAppointment, isLoading };
}

export default useUpdateAppointment