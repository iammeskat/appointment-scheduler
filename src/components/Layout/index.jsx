import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<Navbar />
			<main className="container min-h-[calc(100vh-65px)] py-4">
				{children}
			</main>
		</div>
	)
}

export default Layout