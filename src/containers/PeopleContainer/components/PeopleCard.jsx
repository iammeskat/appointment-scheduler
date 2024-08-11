import { CalendarPlus2, CircleUserIcon } from 'lucide-react';
import React from 'react';
import { Button } from 'shadcn/ui/button';

const PeopleCard = ({
	data = {},
	createAppointment = () => { }
}) => {
	const { name, email } = data;

	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border p-2 rounded">
			<div className='flex items-center gap-2'>
				<div className='size-9 p-1 bg-slate-200 rounded-full'>
					<CircleUserIcon className="size-7" />
				</div>
				<div className="grid gap-1">
					<p className="text-sm font-medium leading-none">
						{name}
					</p>
					<p className="text-sm text-muted-foreground">
						{email}
					</p>
				</div>
			</div>
			<div className="w-full sm:w-fit">
				<Button
					size="sm"
					className="w-full"
					onClick={() => createAppointment(data)}
				>
					<CalendarPlus2 className='mr-1' />
					<span>
						Appointment
					</span>
				</Button>
			</div>
		</div>
	)
}

export default PeopleCard