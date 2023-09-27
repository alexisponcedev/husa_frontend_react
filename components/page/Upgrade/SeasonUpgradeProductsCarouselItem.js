import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { GetSingleProduct } from 'services/Product'
import { useRouter } from 'next/router'
import { useSwiper } from 'swiper/react'
import Link from 'next/link'
import { RouteHandler } from 'utils/routeHandler'

const SeasonUpgradeProductsCarouselItem = ({
	data,
	setChannelAdvisorData,
	setShowDialog,
	length
}) => {
	const [showSizes, setShowSizes] = useState(false)
	const [activeSizeIndex, setActiveSizeIndex] = useState(0)
	const [activeItem, setActiveItem] = useState(null)
	const [series, setSeries] = useState([])
	const [product, setProduct] = useState()
	const router = useRouter()
	const swiper = useSwiper()

	useEffect(() => {
		setSeries(
			data?.series_products?.value.sort(
				(a, b) =>
					parseFloat(a?.name?.value.slice(0, -1)) -
					parseFloat(b?.name?.value.slice(0, -1))
			)
		)
	}, [data])

	useEffect(() => {
		if (series) {
			setActiveItem(series.find(item => item?.id?.value == data?.id?.value))
			setActiveSizeIndex(
				series.findIndex(item => item?.id?.value == data?.id?.value)
			)
		}
	}, [series])

	useEffect(() => {
		swiper.slideTo(
			window.innerWidth >= 768 ? (length % 2 === 0 ? length - 1 : length) : 0
		)
	}, [length])

	useEffect(() => {
		getProduct()
	}, [activeItem])

	function setData() {
		setChannelAdvisorData({
			product: product,
			productId: product?.id,
			type: 'static',

			model: product?.model,
			customizeRetailerId: activeItem?.retailers?.value?.map(
				retailer =>
					retailer?.status?.value === 'active' && {
						id: retailer?.id?.value,
						name: retailer?.name?.value
					}
			)
		})
		setShowDialog(true)
	}

	async function getProduct() {
		if (activeItem?.id?.value) {
			try {
				let response = await GetSingleProduct(router, activeItem?.id?.value)
				setProduct(response?.data?.data)
			} catch (error) {
				console.log(error)
			}
		}
	}
	return (
		<>
			<div className={'item h-100 w-100'}>
				<div className='column'>
					<div className='image_wrapper'>
						{RouteHandler(activeItem?.id?.value, 'product') ? (
							<Link href={RouteHandler(activeItem?.id?.value, 'product')}>
								<a className='d-block w-100 h-100'>
									<img src={product?.image} alt='tv' className='image' />
								</a>
							</Link>
						) : (
							<img src={product?.image} alt='tv' className='image' />
						)}
					</div>
					<div className='d-flex justify-content-between align-items-start gap-1 w-100'>
						<h6 className='title'>{product?.name}</h6>
						<span className='new_label'>{product?.isNew ? 'NEW' : ''}</span>
					</div>
					{series && series.length > 5 && (
						<div
							className={`screen_size_selector ${
								showSizes ? 'show_sizes' : ''
							}`}>
							<div className='content'>
								<div className='sizes'>
									<ul className='size_list'>
										{series.map((item, index) => (
											<li
												key={index}
												className={activeSizeIndex === index ? 'active' : ''}
												onClick={() => {
													setActiveItem(item)
													setActiveSizeIndex(index)
												}}
												style={{ width: 100 / series.length + '%' }}>
												{item?.name?.value}
											</li>
										))}
									</ul>
									<span
										style={{
											width: 100 / series.length + '%',
											transform: 'translateX(' + activeSizeIndex * 100 + '%)'
										}}
										className='indicator'>
										{activeItem?.name?.value}
									</span>
								</div>
								<div
									onClick={() => setShowSizes(true)}
									className='show_sizes_btn'>
									<span className='label'>Select Screen Size</span>
									<FontAwesomeIcon icon={faChevronDown} size='sm' />
								</div>
							</div>
						</div>
					)}
				</div>
				<div className='column'>
					<ul className='specs w-100'>
						{activeItem?.features?.value.map((item, index) => (
							<li
								key={index}
								dangerouslySetInnerHTML={{ __html: item?.text?.value }}></li>
						))}
					</ul>
					<div className='off'>Save {activeItem?.discount_amount?.value}</div>
					<div className='d-flex justify-content-start align-items-end gap-4 mb-n1 w-100'>
						<h4 className='price'>{activeItem?.new_price?.value}</h4>
						<p className='old_price '>{activeItem?.old_price?.value}</p>
					</div>
					<button onClick={setData} className='n-btn medium black w-100'>
						Shop Deal
					</button>
				</div>
			</div>
		</>
	)
}

export default SeasonUpgradeProductsCarouselItem
