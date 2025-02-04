import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useWindowSize } from 'hooks/useWindowSize'
import HomeAppliancesCarouselitem from './HomeAppliancesCarouselitem'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'

const HomeAppliancesCarousel = ({ data }) => {
	const { structure } = data
	const [justify, setJustify] = useState('')
	// const [content, setContent] = useState(null)

	const windowSize = useWindowSize()

	// useEffect(() => {
	// 	setContent(structure)
	// }, [])

	useEffect(() => {
		if (windowSize[0] - structure?.list?.value.length * 296 - 40 - 256 > 16)
			setJustify('justify_content_center')
		else setJustify('')
	}, [windowSize])

	return (
		<section>
			<div
				className={`ha_carousel text-center ${structure?.theme?.value} ${
					structure?.list?.value.length > 4 ? 'extra_space_bottom' : ''
				}`}>
				{structure?.subtitle?.value && (
					<div className='subtitle'>{structure?.subtitle?.value}</div>
				)}
				<h3
					className='title'
					dangerouslySetInnerHTML={{
						__html: structure?.title?.value
					}}></h3>
				<div className='slider_container'>
					<Swiper
						grabCursor={true}
						roundLengths={true}
						slidesPerView={1.12}
						slidesPerGroup={1}
						initialSlide={windowSize[0] >= 1000 ? 2 : 0}
						spaceBetween={16}
						centeredSlides={true}
						centeredSlidesBounds={true}
						navigation={true}
						pagination={{
							dynamicBullets: true,
							clickable: true
						}}
						breakpoints={{
							2340: {
								slidesPerView: 'auto',
								slidesPerGroup: 7
							},
							1745: {
								slidesPerView: 6,
								slidesPerGroup: 6
							},
							1441: {
								slidesPerView: 5,
								slidesPerGroup: 5
							},
							1150: {
								slidesPerView: 4,
								slidesPerGroup: 4
							},
							801: {
								slidesPerView: 3,
								slidesPerGroup: 4
							},
							420: {
								slidesPerView: 2,
								slidesPerGroup: 2,
								centeredSlides: false
							},
							370: {
								slidesPerView: 'auto',
								slidesPerGroup: 1
							}
							// 991: {
							// 	slidesPerView: 3,
							// 	slidesPerGroup: 2
							// },
							// 768: {
							// 	slidesPerView: 3,
							// 	slidesPerGroup: 2
							// },
							// 550: {
							// 	slidesPerView: 1.8,
							// 	slidesPerGroup: 2
							// }
						}}
						className={`slider ${justify} ${
							structure?.list?.value.length > 4 ? '' : 'hide_controls'
						}`}
						modules={[Pagination, Navigation]}>
						{structure?.list?.value.map((item, index) => (
							<SwiperSlide key={index} className='slider_item'>
								<HomeAppliancesCarouselitem data={item} structure={structure} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				{structure?.link?.value && (
					<div className='bottom_button'>
						<Link
							target={
								structure?.link?.target ? structure?.link?.target : '_self'
							}
							href={structure?.link?.value ? structure?.link?.value : '/'}>
							<a
								target={
									structure?.link?.target ? structure?.link?.target : '_self'
								}
								style={{ width: '150px' }}
								className='primary text-nowrap n-btn medium d-block mx-auto w-fit px-5 py-3'>
								{structure?.link?.title}
								{structure?.link?.target === '_blank' && (
									<img
										style={{ marginLeft: '10px' }}
										src={OpenPageOnNewTab.src}
									/>
								)}
							</a>
						</Link>
					</div>
				)}
			</div>
		</section>
	)
}

export default HomeAppliancesCarousel
