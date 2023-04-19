import Link from 'next/link'
import React from 'react'
import OpenPageOnNewTab from "public/assets/images/OpenNewPageIcon.png"

function LaserFinedWithImage({ data: { structure } }) {
	return (
		<section>
			<div className='black-banner p-md-4'>
				<div className='container px-6 px-md-8 pt-20 pb-12'>
					<article className='article text-center'>
						<h2 className='text-white mb-7' style={{ fontSize: '38px' }}>
							{structure?.title?.value}
							<span className='text-primary'>
								{' '}
								{structure?.coloredTitle?.value}
							</span>
						</h2>
						<div>
							<p className='fw-normal mw-md-50 text-white m-auto'>
								{structure.description.value}
							</p>
						</div>
						<Link
							target={structure?.linkUrl?.target ? structure?.linkUrl?.target : '_self'}
							href={structure?.linkUrl?.value}>
							<a className='btn btn-outline-light rounded-5 mt-12 px-8'>
								{structure?.linkUrl?.title}
								{structure?.linkUrl?.target === '_blank' && (
									<img
										style={{ marginLeft: '10px' }}
										src={OpenPageOnNewTab.src}
									/>
								)}
							</a>
						</Link>
					</article>
				</div>
			</div>
		</section>
	)
}

export default LaserFinedWithImage
