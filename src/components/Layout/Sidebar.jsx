import CandidateInfo from 'components/CandidateInfo'
import React from 'react'

const Sidebar = () => {
	return (
		<div className='hidden lg:flex sticky top-[84px] h-full max-h-[calc(100vh-100px)] w-[248px] min-w-[248px]  flex-col justify-end rounded-lg p-2 shadow-sm bg-white'>
			<CandidateInfo />
		</div>
	)
}

export default Sidebar