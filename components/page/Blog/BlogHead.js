import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faLinkedinIn,
	faTwitter,
	faFacebook
} from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
} from 'react-share'
import XTwitterIcon from 'components/icons/XTwitterIcon'
import LinkedinIcon from 'components/icons/LinkedinIcon'
import FacebookIcon from 'components/icons/FacebookIcon'
import LinkIcon from 'components/icons/LinkIcon'
import OpenPageOnNewTab from 'public/assets/images/OpenNewPageIcon.png'

function BlogHead({ data: { structure }, pim }) {
	const [location, setLocation] = useState('')
	const [text, setText] = useState(null)
	const socialMedia = {
		link: {
			button: <button></button>,
			icon: faLink
		},
		linkedin: {
			button: LinkedinShareButton,
			icon: faLinkedinIn
		},
		facebook: {
			button: FacebookShareButton,
			icon: faFacebook
		},
		twitter: {
			button: TwitterShareButton,
			icon: faTwitter
		}
	}
	console.log(structure?.list?.value);
	useEffect(() => {
		setText(structure?.title?.value)
		setLocation(window.location.href)
	}, [])

	const copyUrl = () => {
		toast.success('Link copied successfully')
		navigator.clipboard.writeText(window.location.href)
	}

	const buttonGenerator = (Component, icon, index, val) => {
		const dataLayer = {
			link: 'Copy Link',
			linkedin: 'Linkedin',
			facebook: 'Facebook',
			twitter: 'Twitter'
		}

		if (icon === faLink) {
			return (
				<button
					key={index}
					className='text-primary-dark bg-transparent border-0 px-2 mx-1'
					onClick={() => {
						copyUrl()
						window.dataLayer.push({
							event: dataLayer[val]
						})
					}}>
					<LinkIcon />
				</button>
			)
		}
		if (icon === faTwitter)
			{
				return (
					<Component
						url={location}
						key={index}
						onClick={() => {
							window.dataLayer.push({
								event: dataLayer[val]
							})
						}}
						className='fill-primary-dark-important px-2 mx-1'>
							<XTwitterIcon />
					</Component>
				)
			}
			if (icon === faFacebook)
				{
					return (
						<Component
							url={location}
							key={index}
							onClick={() => {
								window.dataLayer.push({
									event: dataLayer[val]
								})
							}}
							className='text-primary-dark bg-transparent px-2 mx-1'>
								<FacebookIcon />
						</Component>
					)
				}
		return (
			<Component
				url={location}
				key={index}
				onClick={() => {
					window.dataLayer.push({
						event: dataLayer[val]
					})
				}}
				className='text-primary-dark px-2 mx-1'>
    				<LinkedinIcon />
			</Component>
		)
	}

	return (
		<section>
			<div className='blog-header overflow-hidden mt-20'>
				<div className='px-3 mb-13'>
					<div className='d-flex align-items-center justify-content-start flex-wrap gap-2 gap-sm-4 mb-0'>
						{pim?.tags?.map((item, index) => (
							<span
								key={index}
								className='d-block text-decoration-none blog-article-sub-header'>
								{item}
							</span>
						))}
					</div>
					{/* <Link
						target={
							structure?.tagLink?.target ? structure?.tagLink?.target : '_self'
						}
						href={structure?.tagLink?.value ? structure?.tagLink?.value : '/'}>
						<a
							target={
								structure?.tagLink?.target
									? structure?.tagLink?.target
									: '_self'
							}
							className='text-primary-dark fs-5 fw-normal mb-10 d-block text-decoration-none'>
							{structure?.tagLink?.title}
							{structure?.tagLink?.target === '_blank' && (
								<img
									style={{ marginLeft: '10px' }}
									src={OpenPageOnNewTab.src}
								/>
							)}
						</a>
					</Link> */}
					<div
						className='header-text header-gradient-text'
						dangerouslySetInnerHTML={{ __html: text }}></div>
					<span>{structure?.sharingTitle?.value}</span>
					<div className='row mt-7' style={{color: "43898a"}}>
						{structure?.list?.value.map((item, index) =>
							buttonGenerator(
								socialMedia[item?.socialMedia?.value].button,
								socialMedia[item?.socialMedia?.value].icon,
								index,
								item?.socialMedia?.value
							)
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default BlogHead
