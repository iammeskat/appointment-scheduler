import { auth } from 'config/firebase'
import { signOut } from 'firebase/auth'
import { CircleUserIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'shadcn/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from 'shadcn/ui/dropdown-menu'

const UserDropdownMenu = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		signOut(auth).then(() => {
			navigate("/login")
		}).catch((error) => {
			// An error happened.
		});
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" size="icon" className="rounded-full">
					<CircleUserIcon className="h-5 w-5" />
					<span className="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>
					My Account
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Profile
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserDropdownMenu