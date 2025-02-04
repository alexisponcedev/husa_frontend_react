import Link from 'next/link'
import React from 'react'

const CareersAccordionItemSublist = ({ data, collapsed }) => {
	return (
		<div className='careers_accordion_content row mx-0'>
			<div className='col-12 col-md-8 px-0'>
				<h4 className='faq-accordion-question mb-4 mb-md-8'>
					{data?.title?.value}
				</h4>
				<div
					className='faq-accordion-answer'
					dangerouslySetInnerHTML={{
						__html: data?.subtitle?.value
					}}></div>
			</div>
			{data?.link?.value && (
				<Link href={data?.link?.value}>
					<a
						className='n-btn outline-black medium fw-bold'
						style={{ paddingBottom: '13px' }}>
						{data?.link?.title}
					</a>
				</Link>
			)}
		</div>
	)
}

export default CareersAccordionItemSublist
