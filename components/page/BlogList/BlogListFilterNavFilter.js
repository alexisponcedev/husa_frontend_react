import React, { useEffect, useRef, useState } from 'react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import axios from 'axios'
import clsx from 'clsx'
import Link from 'next/link'

import MagnifierIcon from 'components/icons/MagnifierIcon'
import { useWindowSize } from 'hooks/useWindowSize'

import BlogListFilterNavFilterItem from './BlogListFilterNavFilterItem'
import FilterResponsive from './responsiveFilter/FilterResponsive'

let years = []

for (let year = new Date().getFullYear(); year >= 1980; year--) {
	years.push(year)
}

const BlogListFilterNavFilter = ({
	title = 'Featured Blogs',
	filters,
	yearTitle,
	categoryTitle,
	newsSearchTitle,
	filterHandler,
	blogs,
	targetRoute,
	results,
	blogsLength,
	link,
	color = '#43898a',
	data
}) => {
	const [width] = useWindowSize()
	const [timer, setTimer] = useState(null)
	const [filterData, setFilterData] = useState()
	const [searchTerm, setSearchTerm] = useState('')
	const [fix, setFix] = useState(false)
	const [isTransparent, setIsTransparent] = useState(false)
	const [searchFocus, setSearchFocus] = useState(false)
	const target = useRef()
	const router = useRouter()

	useEffect(() => {
		getNews()
	}, [])

	useEffect(() => {
		if (window.scrollY < 61) setFix(true)
		if (window.scrollY >= 60) setFix(false)
		window.addEventListener('scroll', () => {
			// .5 helps prevent rare occurance of scrollY somewtimes being .5 behind the offset
			if ((window.scrollY + .5) < target?.current?.offsetTop) setIsTransparent(false)
			if ((window.scrollY + .5) >= target?.current?.offsetTop) setIsTransparent(true)

			if (target?.current?.offsetTop >= window.scrollY + 60) {
				document.getElementById('Header').classList.remove('full_transparent')
				setFix(true)
			} else {
				document.getElementById('Header').classList.add('full_transparent')
				setFix(false)
			}
			if (target?.current?.offsetTop >= window.scrollY + 20) {
				document.getElementById('Header').classList.remove('full_transparent')
			} else {
				document.getElementById('Header').classList.add('full_transparent')
			}
		})
	}, [])

	useEffect(() => {
		setSearchTerm(filters?.search)
	}, [filters])

	useEffect(() => {
		clearTimeout(timer)

		const newTimer = setTimeout(() => {
			filterHandler('search', searchTerm, false)
		}, 500)

		setTimer(newTimer)
	}, [searchTerm])

	const getNews = async () => {
		try {
			let response = await axios.get(
				`${process.env.NEXT_PUBLIC_CXM_API_ROUTE}/getPosts/meta?type=blog&brand_id=${process.env.NEXT_PUBLIC_BRAND_ID}`,
				{
					headers: {
						BrandId: process.env.NEXT_PUBLIC_BRAND_ID
					}
				}
			)
			setFilterData(response?.data)
		} catch (error) {
			console.log(error)
		}
	}
	function redirectToResultsPage() {
		if (
			Object.keys(filters).some(
				key => key !== 'page' && filters[key].length > 0
			)
		)
			setTimeout(() => {
				router.push(
					{
						pathname: targetRoute,
						query: {
							filters: JSON.stringify({ ...filters, search: searchTerm })
						}
					},
					targetRoute
				)
			}, 1000)
	}

	function reloadPage() {
		router.reload()
	}

	const resetSearch = (year, tag, search, reload) => {
		if (year) filterHandler('year', '', false)
		if (tag) filterHandler('tag', '', false)
		if (search) filterHandler('search', '', false)
		if (reload) reloadPage()
	}

	const resetVisible = () => {
		if (
			filters?.year?.length === 0 &&
			filters?.tag?.length === 0 &&
			filters?.search?.length === 0
		)
			return false
		return true
	}
	// function confirmChanges() {
	// 	filterHandler('', '', { ...tempFilters, page: 1 })
	// 	setOpenFilter(false)
	// 	setTimeout(() => {
	// 		window.scrollTo({
	// 			top: target.current.scrollHeight + 250
	// 		})
	// 	}, 500)
	// }

	return (
		<div
			ref={target}
			style={{
				zIndex: !fix ? 1001 : 997
			}}
			className={clsx("newsroom_search", !fix && 'white_bg')}>
			<div className={`news_room_search_filter ${isTransparent ? 'top-blog-with-blur' : ''}`}>
				<div className='position-relative'>
					<div className='content'>
						<div className='filter_title'>
							{link?.value ? (
								<Link
									href={link?.value}
									target={link?.target ? link?.target : '_self'}>
									<a
										target={link?.target ? link?.target : '_self'}
										style={{ color: color }}
										className='title'>
										{title}
									</a>
								</Link>
							) : (
								<span className='title' style={{ color: color }}>
									{title}
								</span>
							)}
						</div>
						{results && blogs && (
							// (filters.search.length > 0 ||
							// 	filters.year.length > 0 ||
							// 	filters.tag.length > 0) &&
							<div className='results'>{blogsLength} Results</div>
						)}

						{width >= 768 && (
							<div className='filter_options'>
								<BlogListFilterNavFilterItem
									filterChangeHandler={filterHandler}
									filters={filters?.year}
									title={yearTitle}
									data={filterData?.years}
									onClose={() => !results && redirectToResultsPage()}
									parentFix={fix}
									parentTransparent={isTransparent}
									dataKey='year'
									structureData={data}
								/>
								<BlogListFilterNavFilterItem
									filterChangeHandler={filterHandler}
									filters={filters?.tag}
									title={categoryTitle}
									data={filterData?.tags}
									onClose={() => !results && redirectToResultsPage()}
									parentFix={fix}
									parentTransparent={isTransparent}
									dataKey='tag'
									tagList={blogs}
									structureData={data}
								/>

								<div className='custom_input_box'>
									{/* <label>search archive</label> */}
									<div>
										<input
											onChange={e => setSearchTerm(e.target.value)}
											placeholder={newsSearchTitle}
											value={searchTerm}
											onKeyUp={e => {
												if (e.key === 'Enter' && !results)
													redirectToResultsPage()
											}}
											onBlur={() => {
												setSearchFocus(prev => !prev)
												!results && redirectToResultsPage()
											}}
											onFocus={() => setSearchFocus(prev => !prev)}
										/>
										{searchFocus ? (
											<FontAwesomeIcon
												icon={faClose}
												size='md'
												className='search-close p-1'
												onMouseDown={e => {
													e.preventDefault()
													resetSearch(false, false, true, false)
												}}
											/>
										) : (
											<MagnifierIcon stroke={'#8C8F8F'} />
										)}
									</div>
								</div>

								{resetVisible() && (
									<div className='reset-container'>
										<button
											className='reset-button'
											onClick={() => resetSearch(true, true, true, true)}>
											Reset
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			{width < 768 && (
				<FilterResponsive
					filters={filters}
					allFilters={filterData}
					yearTitle={yearTitle}
					categoryTitle={categoryTitle}
					newsSearchTitle={newsSearchTitle}
					filterHandler={filterHandler}
					news={blogs}
					onSearch={_v => setSearchTerm(_v)}
					searchTerm={searchTerm}
					onClose={() => !results && redirectToResultsPage()}
				/>
			)}
		</div>
	)
}

export default BlogListFilterNavFilter
