import React, { Fragment } from 'react';

const Breadcrumb = ({ links = [] }) => {
	return (
		<div className='flex flex-wrap items-center gap-1.5'>
			{links.map(({ label, href }, indx) => {
				const isLast = links.length === (indx + 1);
				return (
					<Fragment key={indx}>
						<a
							className={`text-[13px] ${isLast ? 'text-[#1882FF]' : 'text-[#5A6573]'} `}
							href={href}
						>
							{label}
						</a>
						{!isLast &&
							<img
								className='w-4 h-4'
								alt=""
								src="/icons/RightArrow.svg"
							/>
						}
					</Fragment>
				)
			})}
		</div>
	)
}

export default Breadcrumb