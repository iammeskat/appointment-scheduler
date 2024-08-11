import InputText from 'components/core/InputText';
import Spinner from 'components/Spinner';
import useGetAppointments from 'hooks/appointment/useGetAppointments';
import useUpdateAppointment from 'hooks/appointment/useUpdateAppointment';
import useIsLoggedin from 'hooks/useIsLoggedin';
import React, { useState } from 'react';
import { Button } from 'shadcn/ui/button';
import AppointmentCard from './components/AppointmentCard';

const AppointmentContainer = () => {
	const [search, setSearch] = useState('');
	const [type, setType] = useState('all');
	const [def, setDef] = useState(false);
	const { user = {} } = useIsLoggedin();
	const { data, isLoading } = useGetAppointments(user.people?.id, def);
	const [selectedDoc, setSelectedDoc] = useState(null);
	const { updateAppointment, isLoading: isUpdating } = useUpdateAppointment();

	// const filteredAppoitments = data.filter((appointment) => {

	// });

	// const getFilteresData = () => {
	// 	let filteredData = [...data];
	// 	if (type === "past") {
	// 		filteredData = data?.filter(item => !(moment().isBefore(item.date_time)))
	// 	} else if (type === "upcoming") {
	// 		filteredData = data?.filter(item => (moment().isBefore(item.date_time)))
	// 	}
	// 	if(search){
	// 		const pSearch = search?.toLowerCase();
	// 	}
	// 	return filteredData;
	// }

	const handleUpdateStatus = async (status = '', data = {}) => {
		setSelectedDoc(data.id);
		await updateAppointment(data.id, { ...data, status });
		setDef(!def);
	}

	if (isLoading)
		return <Spinner />
	return (
		<div className='w-full flex flex-col gap-4'>
			<h3 className='text-xl md:text-3xl font-medium'>
				Appointments
			</h3>
			<div className='w-full flex justify-between gap-2'>
				<div>
					<InputText
						placeholder='Search...'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
				<div className='flex gap-2'>
					<Button
						variant={type === "all" ? "" : "outline"}
						onClick={() => setType('all')}
					>
						All
					</Button>
					<Button
						variant={type === "upcoming" ? "" : "outline"}
						onClick={() => setType('upcoming')}
					>
						Upcoming
					</Button>
					<Button
						variant={type === "past" ? "" : "outline"}
						onClick={() => setType('past')}
					>
						Past
					</Button>
				</div>
			</div>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
				{data?.map((item, indx) => (
					<AppointmentCard
						key={`a-c-${indx}`}
						data={item}
						user={user}
						handleUpdateStatus={handleUpdateStatus}
						isLoading={(isUpdating || isLoading) && selectedDoc === item.id}
					/>
				))}
			</div>
		</div>
	)
}

export default AppointmentContainer