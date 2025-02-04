import React, { useEffect, useState } from 'react'
import {
	useParallax,
	useParallaxController,
	ParallaxProvider
} from 'react-scroll-parallax'

const BlogBigImageAndTextBox = ({ data: { structure } }) => {
	return (
		<ParallaxProvider>
			<BlogBigImageAndTextBoxContainer structure={structure} />
		</ParallaxProvider>
	)
}

function BlogBigImageAndTextBoxContainer({ structure }) {
	const parallaxController = useParallaxController()
	const [text, setText] = useState(null)
	useEffect(() => {
		setText(structure?.text?.value)
	}, [])
	const imageRef = useParallax({
		speed: 10,
		translateY: [-5, 5]
	})
	return (
		<section>
			<div className='row align-items-stretch mx-0 blog_banner'>
				<div className='col-12 col-md-6 px-0 header-secondary2 overflow-hidden'>
					<img
						src={structure?.image?.src}
						alt={structure?.image?.alt}
						width='100%'
						height='120%'
						ref={imageRef.ref}
						onLoad={() => parallaxController.update()}
					/>
				</div>
				<div className='col-12 col-md-6 bg-light-orange-gradient blog_half_text'>
					<article className='blog-article row justify-content-start align-items-center text-left'>
						<h4 className='mb-10 '>{structure?.title?.value}</h4>
						<div
							dangerouslySetInnerHTML={{
								__html: text
							}}></div>
					</article>
				</div>
			</div>
		</section>
	)
}

export default BlogBigImageAndTextBox
