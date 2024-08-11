import InputText from 'components/core/InputText'
import TextArea from 'components/core/TextArea'
import Modal from 'components/Modal'
import useCreateAppointment from 'hooks/appointment/useCreateAppointment'
import useIsLoggedin from 'hooks/useIsLoggedin'
import { CalendarPlus2, Loader2, Send, X } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'shadcn/ui/button'
import { DialogFooter } from 'shadcn/ui/dialog'
import { getEventNameValue } from 'utils/helpers'

const CreateAppointmentModal = ({
	peopleData = {},
	opened = false,
	onClose = () => { }
}) => {
	const [formData, setFormData] = useState({});
	const { createAppointment, isLoading } = useCreateAppointment();
	const { user = {} } = useIsLoggedin();
	const navigate = useNavigate();

	const handleClose = () => {
		setFormData({});
		onClose();
	}

	const handleOnChange = (event) => {
		const { name, value } = getEventNameValue(event);
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}))
	}

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			...formData,
			inviter: {
				name: user.people?.name || '',
				email: user.people?.email || '',
				id: user.people?.id || ''
			},
			receiver: {
				name: peopleData?.name || '',
				email: peopleData?.email || '',
				id: peopleData?.id || ''
			},
		}
		await createAppointment(payload);
		navigate("/appointments")
		handleClose();
	}
	return (
		<Modal
			open={opened}
			onClose={handleClose}
			icon={<CalendarPlus2 className="size-5" />}
			title="Create Appointment"
			description="Please fill in the details to create a appointment. Click submit when you're done."
		>
			<form
				onSubmit={handleOnSubmit}
				className="w-full flex flex-col gap-8 pt-4"
			>
				<div className="space-y-4">
					<InputText
						size="lg"
						label="Title"
						placeholder="Enter title"
						name="title"
						value={formData.title}
						onChange={handleOnChange}
						required
						autoFocus
					/>
					<TextArea
						size="lg"
						label="Description"
						placeholder="Enter description"
						name="description"
						value={formData.description}
						onChange={handleOnChange}
						rows={3}
						required
					/>
					<InputText
						size="lg"
						label="Time"
						type="datetime-local"
						placeholder="Select time"
						name="date_time"
						value={formData.date_time}
						onChange={handleOnChange}
						required
					/>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						type="button"
						onClick={onClose}
					>
						<X className='size-4 mr-1' />
						<span>Cancel</span>
					</Button>
					<Button
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? <Loader2 className='size-4 mr-1 animate-spin' /> : <Send className='size-4 mr-1' />}
						<span>Submit</span>
					</Button>
				</DialogFooter>
			</form>
		</Modal >
	)
}

export default CreateAppointmentModal