import InputText from 'components/core/InputText';
import useGetPeoples from 'hooks/people/useGetPeoples';
import React, { useState } from 'react';
import CreateAppointmentModal from './components/CreateAppointmentModal';
import PeopleCard from './components/PeopleCard';

const PeopleContainer = () => {
	const [search, setSearch] = useState('');
	const [opened, setOpened] = useState(false);
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


	return (
		<div className='w-full flex flex-col gap-4'>
			<InputText
				placeholder="Search peoples"
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			{isLoading ? "Loading.." : ""}
			<ul className='flex flex-col gap-2'>
				{filteredUsers.map(people => (
					<li key={people.id}>
						<PeopleCard
							data={people}
							createAppointment={handleOpenModal}
						/>
					</li>
				))}
			</ul>
			<CreateAppointmentModal
				opened={opened}
				onClose={handleCloseModal}
				peopleData={selectedPeople}
			/>

		</div>
	);
}

export default PeopleContainer;
