import Logo from 'components/core/Logo';
import ProtectedComp from 'components/hoc/ProtectedComp';
import UserDropdownMenu from 'components/UserDropdownMenu';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<header className="sticky top-0 border-b bg-background z-50">
			<div className='container'>
				<div className='flex h-16 items-center justify-between gap-4'>
					<div>
						<Logo responsive/>
					</div>
					<ProtectedComp>
						<div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
							<nav className=" gap-6 font-medium flex  md:items-center md:gap-5 text-sm lg:gap-6">

								<Link to="/peoples">
									<span className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
										Peoples
									</span>
								</Link>
								<Link to="/appointments">
									<span className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
										Appointments
									</span>
								</Link>
							</nav>
							<UserDropdownMenu />
						</div>
					</ProtectedComp>
				</div>
			</div>
		</header>
	)
}

export default Navbar