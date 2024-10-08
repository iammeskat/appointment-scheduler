import InputText from 'components/core/InputText';
import Spinner from 'components/Spinner';
import useGetPeoples from 'hooks/people/useGetPeoples';
import useIsLoggedin from 'hooks/useIsLoggedin';
import React, { useState } from 'react';
import CreateAppointmentModal from './components/CreateAppointmentModal';
import PeopleCard from './components/PeopleCard';

const PeopleContainer = () => {
	const [search, setSearch] = useState('');
	const [opened, setOpened] = useState(false);
	const { user = {} } = useIsLoggedin();
	const [selectedPeople, setSelectedPeople] = useState(null);
	const { data: peoples, isLoading } = useGetPeoples();
	const filteredUsers = peoples.filter(({ email = '', name = '' }) => (
		name?.toLowerCase().includes(search?.toLowerCase()) ||
		email?.toLowerCase().includes(search?.toLowerCase())
	));

	const handleOpenModal = (people) => {
		setSelectedPeople(people);
		setOpened(true);
	}

	const handleCloseModal = () => {
		setOpened(false);
		setSelectedPeople(null);
	}

	if (isLoading) {
		return <Spinner />
	}
	return (
		<div className='w-full flex flex-col gap-4'>
			<InputText
				placeholder="Search peoples"
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<ul className='flex flex-col gap-2'>
				{filteredUsers.map(people => (
					user?.people?.id === people?.id ? "" :
						<li key={people.id}>
							<PeopleCard
								data={people}
								createAppointment={handleOpenModal}
							/>
						</li>
				))}
			</ul>
			{filteredUsers?.length < 1 &&
				<p className='text-center text-xl font-medium'>
					No data found
				</p>
			}
			<CreateAppointmentModal
				opened={opened}
				onClose={handleCloseModal}
				peopleData={selectedPeople}
			/>

		</div>
	);
}

export default PeopleContainer;
