import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "shadcn/ui/dialog"


const Modal = ({
	title = "",
	description = "",
	open = false,
	onClose = () => { },
	children = (<></>),
	icon = ''
}) => {

	return (
		<Dialog
			open={open}
			onOpenChange={onClose}
		>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					{title &&
						<DialogTitle className="flex items-center gap-1">
							{icon}
							{title}
						</DialogTitle>
					}
					{description &&
						<DialogDescription>
							{description}
						</DialogDescription>
					}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>

	)
}

export default Modal