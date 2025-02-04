import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'

// import required modules
import { FreeMode, Thumbs, Navigation } from 'swiper'
import Expand from 'public/assets/images/expand.png'
import { useWindowSize } from 'hooks/useWindowSize'
import LightBoxModal from '../NewComponents/LightBoxModal'
import Play from 'public/assets/svgs/play.svg'

function ProductInfoSlider({ pim, firstImage, allData }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [mainSwiper, setMainSwiper] = useState(null)
	const [imageModal, setImageModal] = useState(false)
	const [lightBoxStatus, setLightBoxStatus] = useState(false)
	const [lightBoxActiveIndex, setLightBoxActiveIndex] = useState(-1)
	const [hasQueryTriggered, setHasQueryTriggered] = useState(false)
	const [width] = useWindowSize()
	const [mainDragEnabled, setMainDragEnabled] = useState(false)
	const [thumbCanMove, setThumbCanMove] = useState(false)
	const [isMobileDragging, setIsMobileDragging] = useState(false)
	const [isMainDragging, setIsMainDragging] = useState(false)

	const mainSwiperRef = useRef()

	const router = useRouter()
	const querySlide = router?.query?.slide

	const queryToNumber = () => {
		const convertedValue = parseInt(querySlide, 10)
		if (typeof convertedValue === 'number' && !isNaN(convertedValue))
			return convertedValue
		return null
	}

	const querySlideNumber = queryToNumber()

	useEffect(() => {
		if (querySlideNumber && !hasQueryTriggered) {
			if (lightBoxActiveIndex !== querySlideNumber)
				setLightBoxActiveIndex(querySlideNumber - 1)
			if (!lightBoxStatus && lightBoxActiveIndex === querySlideNumber - 1) {
				setLightBoxStatus(true)
				setHasQueryTriggered(true)
			}
		}
	}, [querySlideNumber, hasQueryTriggered, lightBoxActiveIndex])

	useEffect(() => {
		if (width >= 768 && mainDragEnabled) {
			setMainDragEnabled(false)
			if (mainSwiperRef) {
				if (mainSwiperRef?.current?.swiper?.allowTouchMove === true)
					mainSwiperRef.current.swiper.allowTouchMove = false
			}
		}
		if (width < 768 && !mainDragEnabled) {
			setMainDragEnabled(true)
			if (mainSwiperRef) {
				if (mainSwiperRef?.current?.swiper?.allowTouchMove === false)
					mainSwiperRef.current.swiper.allowTouchMove = true
			}
		}
	}, [width])

	if (thumbsSwiper && width) {
		if (width >= 768) {
			if (thumbsSwiper?.navigation?.nextEl) {
				thumbsSwiper.navigation.nextEl.onmouseover = () => setThumbCanMove(true)
				thumbsSwiper.navigation.nextEl.onmouseout = () => setThumbCanMove(false)
			}
			if (thumbsSwiper?.navigation?.prevEl) {
				thumbsSwiper.navigation.prevEl.onmouseover = () => setThumbCanMove(true)
				thumbsSwiper.navigation.prevEl.onmouseout = () => setThumbCanMove(false)
			}
		}
	}

	const mobileDragHandler = () => {
		if (width < 768 && !thumbCanMove) {
			setThumbCanMove(true)
			if (!isMobileDragging) setIsMobileDragging(true)
		}
	}

	const mobileDragEndHandler = () => {
		if (width < 768 && thumbCanMove && isMobileDragging) {
			setThumbCanMove(false)
		}
		if (isMobileDragging) setIsMobileDragging(false)
	}

	const mainDragHandler = () => {
		if (!isMainDragging) {
			setIsMainDragging(true)
			if (!thumbCanMove) setThumbCanMove(true)
		}
	}

	const mainDragEndHandler = () => {
		if (isMainDragging) setIsMainDragging(false)
	}

	const canMoveTriggerPrevention = () => {
		if (isMainDragging) setIsMainDragging(false)
		if (thumbCanMove) setThumbCanMove(false)
	}
	const itemTypeIds = [1, 5]

	const lightboxActivateClickHandler = indexVal => {
		setLightBoxActiveIndex(indexVal)
		setLightBoxStatus(true)
	}

	// Format pim data as valid props for LightBoxModal component
	// TODO: replace all this with actual lightbox data once cxm options are updated
	/** start */
	const pimFirstImage = pim.filter(item => item.url === firstImage)
	pim = pim.filter(
		item => itemTypeIds.includes(item.type_id) && item.url !== firstImage
	)
	Array.prototype.unshift.apply(pim, pimFirstImage)
	pim = pim.map((item, index) => {
		return { ...item, order: index }
	})
	const playButton = Play.src
	const blockVideo = 'autoplay=0&controls=0'

	const lightBox = pim.map(item => ({
		link: {
			id: item.type_id,
			type: 'url',
			title: 'Download',
			value: item.url,
			hidden: false
		},
		image: {
			id: item.subject_id,
			alt: item.caption,
			src: item.type_id === 5 ? playButton : item.url,
			type: 'image',
			title: 'Image',
			hidden: false
		},
		video: {
			id: item.type_id,
			type: 'string',
			title: 'Iframe Link',
			value: item.type_id === 5 ? item.url : null,
			hidden: false
		},
		caption: {
			id: item.order,
			type: 'simpleText',
			title: 'Light Box Caption',
			value: item.caption,
			hidden: false
		}
		//   thumbnail_image: {
		// 	id: 4,
		// 	alt: item.caption,
		// 	src: item.type_id === 5 ? playButton : item.url,
		// 	type: "image",
		// 	title: "Thumbnail Image (for video)",
		// 	hidden: false
		//   }
	}))
	/** end */

	const thumbControlRemover = url => {
		let finalUrl = url
		if (url.includes('&autoplay=1')) finalUrl = url.replace('&autoplay=1', '')
		if (url.includes('&controls=1'))
			finalUrl = url.replace('&controls=1', '&controls=0')
		if (!url.includes('&controls=0')) finalUrl = finalUrl + '&controls=0'

		return finalUrl
	}

	// Fixes issue where clicking thumbnails doesnt move main slide if screen size has switched between mobile and desktop sizes
	const thumbClickFixer = e => {
		let ariaLabel = e.target.parentNode.parentNode.getAttribute('aria-label')
		let ariaSlide = parseInt(ariaLabel.replace('slide-', ''), 10)
		let slideNum = ariaSlide - 1
		if (mainSwiper && width >= 768 && ariaSlide) mainSwiper.slideTo(slideNum)
	}

	return (
		<div className='product_gallery px-0'>
			<Swiper
				onSwiper={setThumbsSwiper}
				direction={width >= 768 ? 'vertical' : 'horizontal'}
				spaceBetween={4}
				slidesPerView={width >= 768 ? 'auto' : 4.45}
				freeMode={true}
				watchSlidesProgress={true}
				allowSlideNext={thumbCanMove}
				allowSlidePrev={thumbCanMove}
				onNavigationNext={() => {
					setThumbCanMove(true)
				}}
				onNavigationPrev={() => {
					setThumbCanMove(true)
				}}
				onSliderFirstMove={() => mobileDragHandler()}
				onTouchEnd={() => mobileDragEndHandler()}
				navigation={width >= 768 ? true : false}
				modules={[FreeMode, Thumbs, Navigation]}
				className='thumbs_gallery'>
				{firstImage && (
					<SwiperSlide
						aria-hidden='true'
						tabIndex={'-1'}
						className='h-fit'
						aria-label={`slide-${0}`}
						onClick={e => {
							e.stopPropagation()
							thumbClickFixer(e)
							setThumbCanMove(false)
						}}>
						<figure className='image_wrapper'>
							<img
								src={firstImage}
								aria-hidden='true'
								tabIndex='-1'
								className='image'
							/>
						</figure>
					</SwiperSlide>
				)}
				{pim &&
					pim.map((item, index) =>
						item.type_id === 1 && item.url !== firstImage ? (
							<SwiperSlide
								key={index}
								aria-hidden='true'
								className='h-fit'
								tabIndex={'-1'}
								aria-label={`slide-${index + 1}`}
								onClick={e => {
									e.stopPropagation()
									thumbClickFixer(e)
									setThumbCanMove(false)
								}}>
								<figure className='image_wrapper'>
									<img
										src={item.url}
										alt={item?.caption ? item?.caption : item?.title}
										title={item?.caption ? item?.caption : item?.title}
										aria-hidden='true'
										className='image'
										tabIndex='-1'
									/>
								</figure>
							</SwiperSlide>
						) : item.type_id === 5 ? (
							<SwiperSlide
								key={index}
								aria-hidden='true'
								className='h-fit cursor-pointer'
								tabIndex={'-1'}
								aria-label={`slide-${index + 1}`}
								onClick={e => {
									e.stopPropagation()
									thumbClickFixer(e)
									setThumbCanMove(false)
								}}>
								<figure className='image_wrapper'>
									<iframe
										mute={true}
										style={{
											pointerEvents: 'none'
										}}
										src={thumbControlRemover(item?.url)}
										className='image'></iframe>
								</figure>
							</SwiperSlide>
						) : null
					)}
			</Swiper>
			<Swiper
				ref={mainSwiperRef}
				onSwiper={setMainSwiper}
				spaceBetween={20}
				navigation={true}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
				}}
				allowTouchMove={mainDragEnabled}
				onSlideChange={swiper => {
					setThumbCanMove(true)
					thumbsSwiper.slideTo(swiper.activeIndex)
				}}
				onSliderFirstMove={() => mainDragHandler()}
				onTouchEnd={() => mainDragEndHandler()}
				onSnapIndexChange={() => canMoveTriggerPrevention()}
				onTransitionEnd={() => {
					if (!isMainDragging) setThumbCanMove(false)
				}}
				speed={width >= 768 ? 0 : 300}
				modules={[FreeMode, Thumbs, Navigation]}
				className='main_frame'>
				{pim && pim?.length === 0 ? (
					<SwiperSlide>
						<figure
							className='image_wrapper cursor-pointer'
							onClick={() => {
								lightboxActivateClickHandler(lightBoxActiveIndex)
							}}>
							<img
								onClick={() => {
									setLightBoxActiveIndex(item.order)
									setLightBoxStatus(true)
								}}
								src={
									allData?.Category?.customFields.find(
										customFiledItem =>
											customFiledItem?.custom_field?.name === 'upload pic'
									)?.media?.external_url
								}
								className='image'
							/>
							<button
								onClick={() => {
									lightboxActivateClickHandler(lightBoxActiveIndex)
								}}
								className='resize_btn'>
								<img src={Expand.src} width='16' />
							</button>
						</figure>
					</SwiperSlide>
				) : null}
				{firstImage ? (
					<SwiperSlide key={'custom'}>
						<figure
							className='image_wrapper cursor-pointer'
							onClick={() => {
								lightboxActivateClickHandler(0)
							}}>
							<img
								src={firstImage}
								onClick={() => {
									setLightBoxActiveIndex(item.order)
									setLightBoxStatus(true)
								}}
								// alt={firstImage}
								// title={
								// 	pim.find(item => item.order === 1)?.caption
								// 		? pim.find(item => item.order === 1)?.caption
								// 		: pim.find(item => item.order === 1)?.title
								// }
								className='image'
							/>
							<button
								onClick={() => {
									lightboxActivateClickHandler(0)
								}}
								className='resize_btn'>
								<img src={Expand.src} width='16' />
							</button>
						</figure>
					</SwiperSlide>
				) : null}
				{pim &&
					pim.map((item, index) =>
						item.type_id === 1 && item.url !== firstImage ? (
							<SwiperSlide key={index}>
								<figure
									className='image_wrapper cursor-pointer'
									onClick={() => {
										lightboxActivateClickHandler(item.order)
									}}>
									<img
										onClick={() => {
											setLightBoxActiveIndex(item.order)
											setLightBoxStatus(true)
										}}
										src={item?.url}
										title={item?.caption ? item?.caption : item?.title}
										alt={item?.caption ? item?.caption : item?.title}
										className='image'
									/>
									<button
										onClick={() => {
											lightboxActivateClickHandler(item.order)
										}}
										className='resize_btn'>
										<img src={Expand.src} width='16' />
									</button>
								</figure>
								{/* <figcaption className='figure-caption'>
										{item.title}
									</figcaption> */}
							</SwiperSlide>
						) : item.type_id === 5 ? (
							<SwiperSlide key={index}>
								<figure
									className='image_wrapper cursor-pointer'
									onClick={() => {
										lightboxActivateClickHandler(item.order)
									}}>
									{/* Replace iframe with thumbnail once implemented in cxm */}
									<iframe
										src={
											item.url +
											(item.url.includes('?') ? `&` : '?') +
											blockVideo
										}
										autoplay=''
										controls
										className='image'></iframe>
									<div
										onClick={() => {
											setLightBoxActiveIndex(item.order)
											setLightBoxStatus(true)
										}}
										className='position-absolute top-0 left-0 w-100 h-100'></div>
									<button
										onClick={() => {
											lightboxActivateClickHandler(item.order)
										}}
										className='resize_btn'>
										<img src={Expand.src} width='16' />
									</button>
								</figure>
								{/* <figcaption className='figure-caption'>
										{item.title}
									</figcaption> */}
							</SwiperSlide>
						) : null
					)}
			</Swiper>
			{lightBoxStatus && (
				<LightBoxModal
					zIndex={99997}
					id={pim.id}
					caption={lightBox[lightBoxActiveIndex]?.caption}
					video={lightBox[lightBoxActiveIndex]?.video}
					image={lightBox[lightBoxActiveIndex]?.image}
					link={lightBox[lightBoxActiveIndex]?.link}
					isVisible={lightBoxStatus}
					visibleHandler={() => {
						setLightBoxStatus(prevState => !prevState)
						setLightBoxActiveIndex(lightBoxActiveIndex)
					}}
					activateSwiper
					dataList={lightBox}
					activeItemIndex={lightBoxActiveIndex}
				/>
			)}
		</div>
	)
}

export default ProductInfoSlider
