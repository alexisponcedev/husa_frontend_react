import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

// import required modules
import { FreeMode, Thumbs } from 'swiper'

function ProductInfoSlider({ pim }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	return (
		<div className='col-12 col-md-6 product-gallery mb-12 mb-md-0 pe-md-10'>
			<Swiper
				spaceBetween={10}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
				}}
				modules={[FreeMode, Thumbs]}
				className=' gallery-top'>
				{pim.map(
					(item, index) =>
						item.type_id === 1 && (
							<SwiperSlide key={index}>
								<span className='media-slider-wrapper'>
									<img
										src={item.url}
										alt='Front U8G Hisense s'
										className='slider-media'
									/>
								</span>
								<figcaption className='figure-caption'>{item.title}</figcaption>
							</SwiperSlide>
						)
				)}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Thumbs]}
				className='gallery-thumbs single-product-gallery-thumbs  product-gallery-thumbs'>
				{pim.map(
					(item, index) =>
						item.type_id === 1 && (
							<SwiperSlide
								aria-hidden='true'
								tabIndex={'-1'}
								aria-label={`slide-${index + 1}`}>
								<img
									src={item.url}
									alt='Front U8G Hisense s'
									aria-hidden='true'
									tabindex='-1'
								/>
							</SwiperSlide>
						)
				)}
			</Swiper>
		</div>
	)
}

export default ProductInfoSlider
