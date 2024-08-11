import { CalendarClock } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({ responsive }) => {
	return (
		<Link to="/">
			<div className='w-fit flex items-center gap-1'>
				<CalendarClock className='size-8' />
				<div className={`flex-col ${responsive ? "hidden sm:flex" : "flex "}`}>
					<p className='font-medium leading-4'>
						Appointment<br />
						<span className='text-slate-600'>
							Scheduler
						</span>
					</p>
					{/* <p>
					Scheduler
				</p> */}
				</div>
			</div>
		</Link>
	)
}

export default Logo