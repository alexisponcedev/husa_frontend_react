import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import OpenPageOnNewTab from 'public/assets/images/OpenNewPageIcon_white.png'

// component
const ModalChanelAdviser = dynamic(() => import('./ModalChanelAdviser'))
const ProductInfoSlider = dynamic(() => import('./ProductInfoSlider'))
const ProductSliderLinkButtonV3 = dynamic(() =>
	import('./ProductSliderLinkButtonV3')
)

function ProductInfoAndSliderBox({ pim, data }) {
	const [chanelAdviserHandler, setChanelAdviserHandler] = useState(false)
	const [screenSize, setScreenSize] = useState([])
	useEffect(() => {
		if (Array.isArray(pim?.series[0]?.values)) {
			let addSizeToItem = pim?.series[0].values.map(item => ({
				...item,
				size: item?.title ? Number(item?.title?.replaceAll('"', '')) : 0
			}))
			setScreenSize(addSizeToItem.sort((a, b) => a.size - b.size))
		}
	}, [])

	const dataLayerHandler = () => {
		setChanelAdviserHandler(!chanelAdviserHandler)
		window.dataLayer.push({
			event: 'view_product',
			eventData: {
				product_id: pim?.model,
				category: pim?.Category?.name
			}
		})
	}
	return (
		<section id={data.name + data.id} className='new_product_info'>
			<div className='wrapper row'>
				<div className='product_info px-0 my-auto pt-3 d-md-none d-block'>
					<h2 className='serie'>
						{pim?.custom_fields.find(item => item.title === 'h2 Title')?.value
							? pim?.custom_fields.find(item => item.title === 'h2 Title')
									?.value
							: pim?.custom_fields?.find(item => item.title === 'Product Type')
									?.value}
					</h2>
					<h3 className='model'>
						{
							pim?.custom_fields.find(item => item.title === 'span Title')
								?.value
						}
					</h3>
					<h1 className='title'>{pim?.name}</h1>
					<p className='model_number mb-0'>Model: {pim?.model}</p>
				</div>
				<ProductInfoSlider
					firstImage={pim?.image}
					pim={pim?.assets}
					allData={pim}
				/>
				<div className='product_info px-0 my-auto'>
					<h2 className='serie d-none d-md-block'>
						{pim?.custom_fields.find(item => item.title === 'h2 Title')?.value
							? pim?.custom_fields.find(item => item.title === 'h2 Title')
									?.value
							: pim?.custom_fields?.find(item => item.title === 'Product Type')
									?.value}
					</h2>
					<h3 className='model d-none d-md-block'>
						{
							pim?.custom_fields.find(item => item.title === 'span Title')
								?.value
						}
					</h3>
					<h1 className='title d-none d-md-block'>{pim?.name}</h1>
					<p className='model_number d-none d-md-block'>Model: {pim?.model}</p>
					{screenSize && screenSize.length > 0 ? (
						<div className='sizes'>
							<p className='sizes_text'>Available Screen Sizes</p>
							<div className='sizes_list'>
								{screenSize.map(
									(item, index) =>
										item.title && (
											<ProductSliderLinkButtonV3
												key={index}
												data={item}
												pim={pim}
											/>
										)
								)}
							</div>
						</div>
					) : (
						<div className='sizes pb-0'></div>
					)}
					<div className='text-center text-md-start'>
						<button
							className='wtb_btn mx-auto mx-md-0'
							disabled={
								pim?.buy_status !== 'ChannelAdvisor' &&
								pim?.buy_status !== 'Internal'
							}
							onClick={() =>
								pim?.buy_status === 'ChannelAdvisor' ||
								pim?.buy_status === 'Internal'
									? dataLayerHandler()
									: {}
							}>
							{pim?.buy_status === 'ChannelAdvisor' ||
							pim?.buy_status === 'Internal'
								? 'Where To Buy'
								: 'coming soon'}
							{pim?.buy_status === 'ChannelAdvisor' ||
							pim?.buy_status === 'Internal' ? (
								<img
									style={{ marginLeft: '16px' }}
									src={OpenPageOnNewTab.src}
								/>
							) : null}
						</button>
					</div>
				</div>
			</div>

			{pim && (
				<ModalChanelAdviser
					product={pim}
					productId={pim.id}
					type={pim.buy_status}
					condition={chanelAdviserHandler}
					handler={setChanelAdviserHandler}
					model={pim?.model}
				/>
			)}
		</section>
	)
}

export default ProductInfoAndSliderBox
