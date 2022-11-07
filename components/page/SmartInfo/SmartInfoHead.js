import React from 'react'

import Link from 'next/link'

function SmartInfoHead({ data }) {
	let { structure } = data
	return (
		<section>
			<div className='heading'>
				<img
					src={structure?.image?.src}
					alt={structure?.image?.alt}
					width='100%'
					height='100%'
				/>
				<div className='heading-text'>
					<h3>{structure?.title?.value}</h3>
					<Link href={structure?.link?.value}>
						<a className='btn btn-light text'>{structure?.link?.title}</a>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default SmartInfoHead
