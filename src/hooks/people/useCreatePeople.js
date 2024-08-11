import { db } from 'config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { COLLECTIONS } from 'utils/data';

const useCreatePeople = () => {
	const [isLoading, setIsLoading] = useState(false);

	const createPeople = async (data = {}) => {
		setIsLoading(true);
		const res = await addDoc(collection(db, COLLECTIONS.PEOPLE), data);
		setIsLoading(false);
		return res;

	}

	return { createPeople, isLoading };
}

export default useCreatePeople