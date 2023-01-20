import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import CustomImage from '../../common/CustomImage'

const ExtendedWarrantyFeatureBlocksItem = ({
	image,
	text,
	link,
	width,
	light
}) => {
	const chatHandler = () => {
		if (document.querySelector('.velaro-custom-launcher-frame iframe')) {
			let iframe = document.querySelector(
				'.velaro-custom-launcher-frame iframe'
			)
			let innerDoc = iframe.contentWindow.document.querySelector(
				'.velaro-custom-launcher'
			)
			innerDoc.click()
		}
	}
	return (
		<div
			className={`home-page-mb-discovery-item py-10 px-6 px-md-13 py-md-15`}
			style={{ width: width + '%' }}>
			<CustomImage
				wrapperHeight={'70px'}
				src={image?.src}
				alt={image?.alt}
				wrapperClass='mb-7'
			/>
			<div
				dangerouslySetInnerHTML={{ __html: text }}
				className={`fs-base mb-9 ${light ? 'light' : ''}`}></div>
			{text.includes('Chat') ? (
				<a
					onClick={chatHandler}
					style={{ cursor: 'pointer' }}
					className='n-btn primary-text'>
					{link?.title}
					{link?.title && (
						<span>
							<FontAwesomeIcon
								icon={faChevronRight}
								size={'sm'}
								className='ms-2'
							/>
						</span>
					)}
				</a>
			) : (
				<a href={link?.value} className='n-btn primary-text'>
					{link?.title}
					{link?.title && (
						<span>
							<FontAwesomeIcon
								icon={faChevronRight}
								size={'sm'}
								className='ms-2'
							/>
						</span>
					)}
				</a>
			)}
		</div>
	)
}

export default ExtendedWarrantyFeatureBlocksItem
