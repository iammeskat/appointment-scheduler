
import { Label } from 'shadcn/ui/label';
import { Textarea } from 'shadcn/ui/textarea';
const TextArea = ({
	label = "",
	name = "",
	value = "",
	onChange = () => { },
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
			<Textarea
				className="w-full"
				ref={inputRef}
				id={elementId}
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

export default TextArea