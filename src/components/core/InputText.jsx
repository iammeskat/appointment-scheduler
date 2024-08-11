import { Input } from "shadcn/ui/input"
import { Label } from "shadcn/ui/label"

const InputText = ({
	label = "",
	name = "",
	value = "",
	onChange = () => { },
	type = "text",
	placeholder = "",
	required = false,
	id = "",
	size = "md", //sm, md, lg
	autoFocus = false,
	error = "",
	inputRef,
	...props
}) => {
	const elementId = id || (label?.replaceAll(' ', '_'))
	return (
		<div className="w-full flex flex-col gap-1.5">
			{label &&
				<Label htmlFor={elementId}>
					{label}{required ? <span className="text-red-500">*</span> : ""}
				</Label>
			}
			<Input
				className="w-full"
				ref={inputRef}
				id={elementId}
				type={type}
				name={name}
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={onChange}
				autoFocus={autoFocus}
				{...props}
			/>
		</div>
	)
}

export default InputText