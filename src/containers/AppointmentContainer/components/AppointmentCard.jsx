import { CalendarArrowUp, CalendarCog, CalendarHeart, Loader2 } from 'lucide-react';
import moment from 'moment';
import React from 'react';
import { Button } from 'shadcn/ui/button';

const AppointmentCard = ({
	data = {},
	user = {},
	handleUpdateStatus = () => { },
	isLoading = false,
}) => {
	const { title, description, inviter, receiver, status, date_time } = data;
	const isUpcoming = moment().isBefore(date_time);
	return (
		<div className='relative overflow-hidden p-2 sm:p-6 border rounded-lg flex flex-col justify-between gap-4'>
			<div className='flex flex-col gap-4'>
				<div className='flex gap-2'>
					<CalendarHeart className='size-6 shrink-0' />
					<div>
						<h3 className='text-xl font-semibold leading-none tracking-tight'>
							{title}
						</h3>
						<p className='text-sm text-muted-foreground'>
							{description}
						</p>
						<p className='text-sm font-medium py-1 px-2 mt-1 rounded bg-slate-100'>
							Date: {moment(date_time).format("DD-MM-YYYY, hh:mm a")}
						</p>
					</div>
				</div>
				<div className='w-full flex flex-col gap-1 '>
					<div className='p-1 border border-orange-200 bg-orange-50 w-full rounded flex items-center gap-1 text-orange-500'>
						<CalendarCog />
						<p>
							<span className='font-medium'>Scheduler: </span>
							{inviter?.name + (inviter?.id === user.people?.id ? " (You)" : "")}
						</p>
					</div>
					<div className='p-1 border border-blue-200 bg-blue-50 w-full rounded flex items-center gap-1 text-blue-500'>
						<CalendarArrowUp />
						<p>
							<span className='font-medium'>Receiver: </span>
							{receiver?.name + (receiver?.id === user.people?.id ? " (You)" : "")}
						</p>
					</div>

				</div>
			</div>
			<div className='w-full flex items-center justify-between gap-2'>
				<div>
					<p className='text-sm capitalize'>
						Status:&nbsp;
						<span className={`
							font-medium ${status === "accepted" ?
								"text-green-500"
								: status === "cancelled" ?
									"text-red-500"
									: status === "declined" ?
										"text-orange-500" : "text-slate-600"
							}`}>
							{status || (isUpcoming ? "Pending" : "Not Accepted")}
						</span>
					</p>
				</div>
				<div className='flex gap-2'>
					{(inviter?.id === user.people?.id) ? (
						<>
							{!status && isUpcoming &&
								<Button Button
									variant="secondary"
									onClick={() => handleUpdateStatus("cancelled", data)}
								>
									Cancel
								</Button>
							}
						</>
					) : (isUpcoming ?
						<>
							{status != "declined" &&
								<Button
									size="sm"
									variant="destructive"
									onClick={() => handleUpdateStatus("declined", data)}
								>
									Decline
								</Button>
							}
							{status != "accepted" &&
								<Button
									size="sm"
									onClick={() => handleUpdateStatus("accepted", data)}
								>
									Accept
								</Button>
							}
						</> : ""
					)}
				</div>
			</div>
			<div className={`absolute top-0 right-0 text-xs font-medium px-2 py-0.5 text-white ${isUpcoming ? "bg-green-500" : "bg-slate-500"} rounded-bl-lg`}>
				{isUpcoming ? "Upcoming" : "Past"}
			</div>
			{
				isLoading &&
				<div className='z-10 w-full h-full absolute top-0 left-0 flex justify-center items-center bg-slate-700/50'>
					<Loader2 className='size-10 animate-spin' />
				</div>
			}
		</div >
	)
}

export default AppointmentCard