import Link from 'next/link'
import React from 'react'

// image
import ProductImage from '../../../../public/assets/images/home/tv.png'

function LandingProductItem({ data: { title, link, image } }) {
	return (
		<div className='col-12 col-md-6'>
			<figure>
				<div>
					<Link href={`/${link}`} title={image.alt}>
						<a className='img-link'>
							<img src={image.src} alt={image.alt} width='65%' />
						</a>
					</Link>
				</div>
				<figcaption>
					<p className='title'>{title}</p>
					<Link href={`/${link}`}>
						<a className='btn btn-outline-dark shop-btn'>SHOP NOW</a>
					</Link>
				</figcaption>
			</figure>
		</div>
	)
}

export default LandingProductItem
