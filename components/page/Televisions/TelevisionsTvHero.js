import { alt } from 'joi'
import Link from 'next/link'
import React from 'react'

const TelevisionsTvHero = ({ data: { structure } }) => {
	return (
		<section>
			<div className='televisions-tv-hero'>
				<div className='container'>
					<div className='header-content'>
						<div
							className='title gradient-text mb-8'
							dangerouslySetInnerHTML={{
								__html: structure?.title?.value
							}}></div>
						<div
							className='subtitle mb-3 mb-md-7'
							dangerouslySetInnerHTML={{
								__html: structure?.subtitle?.value
							}}></div>
					</div>
					<div className='row justify-content-center align-items-center'>
						<div className='col-12 py-3'>
							<div
								className='tv-item full-size'
								style={{
									backgroundImage: `url(${structure?.fullSizeCard?.value?.backgroundImage?.src})`
								}}>
								<img
									src={structure?.fullSizeCard?.value?.badge?.src}
									alt={structure?.fullSizeCard?.value?.badge?.alt}
									className='badge'
								/>
								<div className='content'>
									<img
										src={structure?.fullSizeCard?.value?.titleImage?.src}
										alt={structure?.fullSizeCard?.value?.titleImage?.alt}
										className='image'
									/>
									<div
										className={`title ${
											structure?.fullSizeCard?.value?.theme?.value === 'light'
												? 'text-white'
												: ''
										}`}
										dangerouslySetInnerHTML={{
											__html: structure?.fullSizeCard?.value?.title?.value
										}}></div>
									{structure?.fullSizeCard?.value?.link?.value ? (
										<Link href={structure?.fullSizeCard?.value?.link?.value}>
											<a
												className={`n-btn transparent d-block w-fit ${
													structure?.fullSizeCard?.value?.theme?.value ===
													'light'
														? 'outline-white'
														: 'outline-black'
												}`}>
												{structure?.fullSizeCard?.value?.link?.title}
											</a>
										</Link>
									) : null}
								</div>
							</div>
						</div>
						{structure?.coloredCardsList?.value.map((item, index) => (
							<div className='col-12 col-lg-6 py-3' key={index}>
								<div
									className='tv-item colored-bg'
									style={{
										backgroundColor: item?.backgroundColor?.value
									}}>
									<div className='content'>
										<img
											src={item?.image?.src}
											alt={item?.image?.alt}
											className='image'
										/>
										<div>
											<div
												className={`title ${
													item?.theme?.value === 'light' ? 'text-white' : ''
												}`}
												dangerouslySetInnerHTML={{
													__html: item?.title?.value
												}}></div>
											{item?.link?.value ? (
												<Link href={item?.link?.value}>
													<a
														className={`n-btn transparent d-block w-fit ${
															item?.theme?.value === 'light'
																? 'outline-white'
																: 'outline-black'
														}`}>
														{item?.link?.title}
													</a>
												</Link>
											) : null}
										</div>
									</div>
								</div>
							</div>
						))}
						<div className='col-12 col-lg-6 py-3'>
							<div className='tv-item no-bg'>
								<img
									src={structure?.noBgCard?.value?.logoImage?.src}
									alt={structure?.noBgCard?.value?.logoImage?.alt}
									className='logo'
								/>
								<img
									src={structure?.noBgCard?.value?.titleImage?.src}
									alt={structure?.noBgCard?.value?.titleImage?.alt}
									className='image'
								/>
								<div
									className='title'
									dangerouslySetInnerHTML={{
										__html: structure?.noBgCard?.value?.title?.value
									}}></div>
								{structure?.noBgCard?.value?.link?.value ? (
									<Link href={structure?.noBgCard?.value?.link?.value}>
										<a className='n-btn outline-white transparent d-block w-fit'>
											{structure?.noBgCard?.value?.link?.title}
										</a>
									</Link>
								) : null}
							</div>
						</div>
						<div className='col-12 col-lg-6 py-3'>
							<div
								className='tv-item simple'
								style={{
									backgroundImage: `url(${structure?.simpleCard?.value?.image?.src})`
								}}></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TelevisionsTvHero
