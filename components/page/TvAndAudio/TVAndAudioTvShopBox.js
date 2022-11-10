import Link from 'next/link'
import React from 'react'
import TVAndAudioTvShopItem from './TVAndAudioTvShopItem'

function TVAndAudioTvShopBox({ data: { structure } }) {
	return (
		<section>
			<div className='black-banner p-md-4'>
				<div className='container px-6 px-md-8 py-20'>
					<article className='article text-center'>
						<h2 className='text-white mb-10'>{structure?.title?.value}</h2>
						<div className='row justify-content-evenly align-items-stretch mb-14'>
							{structure?.list?.value.map((item, index) => (
								<TVAndAudioTvShopItem data={item} key={index} />
							))}
						</div>
						{structure?.link?.title && structure?.link?.value ? (
							<div>
								<Link
									href={structure?.link?.value ? structure?.link?.value : ''}>
									<a className='tv-and-audio-tv-shop-button text-decoration-none text-uppercase px-8 text-white border-0 rounded-5'>
										{structure?.link?.title}
									</a>
								</Link>
							</div>
						) : null}
					</article>
				</div>
			</div>
		</section>
	)
}

export default TVAndAudioTvShopBox
