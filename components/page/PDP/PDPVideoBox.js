import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

function PDPVideoBox() {
	const video = useRef()
	const [playVideo, setPlayVideo] = useState(false)

	const videoHandler = _condition => {
		if (_condition) {
			setPlayVideo(true)
			video.current.play()
		}
	}
	return (
		<section>
			<div className='video-container'>
				<video ref={video} width='100%' height='100%'>
					<source
						src='http://techslides.com/demos/sample-videos/small.mp4'
						type='video/mp4'
					/>
					Your browser does not support the video tag.
				</video>
				{!playVideo && (
					<button
						id='video-play-btn'
						onClick={() => videoHandler(true)}
						className='play-btn'>
						<FontAwesomeIcon
							icon={faPlay}
							size={'xl'}
							color={'text-primary-dark'}
						/>
					</button>
				)}
			</div>
		</section>
	)
}

export default PDPVideoBox
