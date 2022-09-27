import React from 'react'

// image
import Image from './../../../../public/assets/images/more-tv/header-television.png'

function MoreTvHead() {
	return (
		<section>
			<div class='blue-bg'>
				<div class='container-fluid bg-bubble-effect px-md-8 py-20'>
					<div class='row align-items-center overflow-hidden'>
						<div class='col-12 col-md-6'>
							<h1 class='header-texts'>
								<span class='d-block text-gradient'>Less talk.</span>
								More TV.
							</h1>
							<p class='fs-5 text-white fw-normal mb-7'>
								8 in 10 Americans believe a brand should invest in products, not
								ads.
								<span class='fw-bold'>We couldn’t agree more.</span>
							</p>
							<a href='#' class='btn btn-glowing rounded-5'>
								See The Lineup
							</a>
						</div>
						<div class='col-12 col-md-6'>
							<img src={Image.src} alt='featured image' width='100%' />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MoreTvHead
