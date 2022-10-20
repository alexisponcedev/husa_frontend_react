import React from 'react'
import HomePageMBTextedBoxesItem from './HomePageMBTextedBoxesItem'

const HomePageMBTextedBoxes = ({ data }) => {
	let structure = {
		list: {
			value: [
				{
					background: {
						src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png'
					},
					image: {
						src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/867b78c83f/download_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-akouj4.png-xl6sfw.png'
					},
					littleTitle: {
						value: 'Hisense Audio'
					},
					title: {
						value: 'Immersive sound optimized just for you.'
					},
					link: {
						value: '/',
						title: 'Learn More'
					}
				},
				{
					background: {
						src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png'
					},
					image: {
						src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/867b78c83f/download_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-akouj4.png-xl6sfw.png'
					},
					littleTitle: {
						value: 'Hisense Audio'
					},
					title: {
						value: 'Immersive sound optimized just for you.'
					},
					link: {
						value: '/',
						title: 'Learn More'
					}
				},
				{
					background: {
						src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png'
					},
					image: {
						src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/867b78c83f/download_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-akouj4.png-xl6sfw.png'
					},
					littleTitle: {
						value: 'Hisense Audio'
					},
					title: {
						value: 'Immersive sound optimized just for you.'
					},
					link: {
						value: '/',
						title: 'Learn More'
					}
				},
				{
					background: {
						src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png'
					},
					image: {
						src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/867b78c83f/download_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-akouj4.png-xl6sfw.png'
					},
					littleTitle: {
						value: 'Hisense Audio'
					},
					title: {
						value: 'Immersive sound optimized just for you.'
					},
					link: {
						value: '/',
						title: 'Learn More'
					}
				}
			]
		}
	}

	return (
		<section>
			<div className='row justify-content-center align-items-center mx-0  px-12'>
				{structure.list.value.map((item, index) => (
					<HomePageMBTextedBoxesItem
						key={index}
						background={item.background}
						image={item.image}
						littleTitle={item.littleTitle.value}
						title={item.title.value}
						link={item.link}
					/>
				))}
			</div>
		</section>
	)
}

export default HomePageMBTextedBoxes
