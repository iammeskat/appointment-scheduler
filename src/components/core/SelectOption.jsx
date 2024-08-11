import { Label } from "@shadcn-comp/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@shadcn-comp/ui/select";

const SelectOption = ({
	label = "",
	name = "",
	value = "",
	options = [],
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
					{label}
				</Label>
			}
			<Select
				ref={inputRef}
				id={elementId}
				name={name}
				placeholder={placeholder}
				required={required}
				value={value}
				onValueChange={(val) => onChange({ target: { name, value: val } })}
				autoFocus={autoFocus}
				{...props}
			>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{/* <SelectLabel>Fruits</SelectLabel> */}
						{options.map((item, indx) => (
							<SelectItem
								key={`select-o-${indx}`}
								value={item?.val || item}
								className=" capitalize"
							>
								{item?.label || item}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>

		</div >
	)
}

export default SelectOption;
