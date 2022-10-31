import React from 'react'
import ExtendedWarrantyFeatureBlocksItem from './ExtendedWarrantyFeatureBlocksItem'

const ExtendedWarrantyFeatureBlocks = ({ data }) => {
	const structure = {
		backgroundColor: '#FBFBFB',
		title: {
			value: ''
		},
		list: {
			value: [
				{
					image: {
						src: ''
					},
					link: {
						value: '/',
						title: 'View Products'
					},
					title: {
						value: 'Find Your Product'
					},
					paragraph: {
						value:
							'Browse from the product catagories and find your Hisense model.'
					}
				},
				{
					image: {
						src: ''
					},
					link: {
						value: '/',
						title: 'View Products'
					},
					title: {
						value: 'Find Your Product'
					},
					paragraph: {
						value:
							'We need to know some things about the product like serial number, date of purchase, and where it was purchased.'
					}
				},
				{
					image: {
						src: ''
					},

					title: {
						value: 'Find Your Product'
					},
					paragraph: {
						value:
							'Browse from the product catagories and find your Hisense model.'
					}
				},
				{
					image: {
						src: ''
					},
					link: {
						value: '/',
						title: 'View Products'
					},
					title: {
						value: 'Find Your Product'
					},
					paragraph: {
						value:
							'Browse from the product catagories and find your Hisense model.'
					}
				}
			]
		}
	}

	return (
		<section>
			<div
				className='home-page-mb-discovery py-20'
				style={{ backgroundColor: structure.backgroundColor }}>
				<h2 className='fs-2hx mb-17'>{structure?.title?.value}</h2>
				<div className='row justify-content-evenly align-items-center mx-0'>
					{structure.list.value.map((item, index) => (
						<ExtendedWarrantyFeatureBlocksItem
							key={index}
							image={item?.image}
							link={item?.link}
							title={item?.title?.value}
							paragraph={item?.paragraph?.value}
							width={100 / structure?.list?.value?.length}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default ExtendedWarrantyFeatureBlocks
