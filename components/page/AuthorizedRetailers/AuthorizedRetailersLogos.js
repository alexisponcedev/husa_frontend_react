import React from 'react'

function AuthorizedRetailersLogos({ data }) {
	let { structure } = data
	return (
		<section>
			<div className='container mb-5'>
				<div className='grid-container'>
					{structure?.list?.value.map((item, index) => (
						<div
							key={'retailer-' + index}
							className='grid-item d-flex align-items-center justify-content-center'>
							<img
								src={item?.image?.src}
								alt={item?.image?.alt}
								width='100%'
								style={{ maxWidth: '120px' }}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default AuthorizedRetailersLogos
