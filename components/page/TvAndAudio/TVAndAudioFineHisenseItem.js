import React from 'react'

function TVAndAudioFindHisenseItem({ data: { image, title, description } }) {
	return (
		<div className='col-12 col-md-6 mb-18 mb-md-0'>
			<article className='article tv-and-audio-image-box-item text-start'>
				<img
					src={image.src}
					alt={image.alt}
					width='100%'
					className='img-box-shadow-hover'
				/>
				<div className='px-10'>
					<h2 className=' mb-3 mt-13'>{title.value}</h2>
					<p className='fw-normal m-auto mb-4'>{description.value}</p>
				</div>
			</article>
		</div>
	)
}

export default TVAndAudioFindHisenseItem
