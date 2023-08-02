import React from 'react'
import NewsRoomSlider from './NewsRoomSlider'
import { useWindowSize } from 'hooks/useWindowSize'
import { useState } from 'react'
import { useEffect } from 'react'
import { GetNewsApi } from 'services/cxm'
import NewsSearchFilter from './NewsSearchFilter'
import Spinner from 'components/common/Spinner'
import CustomImage from 'components/common/CustomImage'
import Link from 'next/link'
import NewsRoomPagination from './SingleNews/NewsRoomPagination'
import NewsRoomMainNewsItem from './NewsRoomMainNewsItem'
import moment from 'moment'

const NewsRoomMainBox = ({ data }) => {
	const [width] = useWindowSize()
	let { structure } = data
	const [news, setNews] = useState()
	const [pagination, setPagination] = useState()
	const [newsItemOrder, setNewsItemOrder] = useState([1, 2, 2, 3, 3, 3])
	const [filters, setFilters] = useState({
		year: '',
		product: '',
		search: '',
		page: 1
	})
	useEffect(() => {
		if (filters?.product || filters?.search || filters?.year) {
			getNews()
		} else {
			setNews(null)
		}
	}, [filters])

	useEffect(() => {
		let newOrder = []

		for (let i = 1; i < 4; i++)
			newOrder = [
				...newOrder,
				...new Array(structure['row-' + i]?.value).fill(
					structure['row-' + i]?.value
				)
			]
		setNewsItemOrder(newOrder)
	}, [])

	const getNews = async () => {
		setNews('loading')
		try {
			let response = await GetNewsApi(filters, 15)

			setNews(response.data.data)
			setPagination(response.data.meta)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<NewsSearchFilter
				filter={filters}
				filterHandler={(_key, _value) =>
					setFilters({ ...filters, [_key]: _value })
				}
				title={structure?.title?.value}
				yearTitle={
					structure?.year_text?.value ? structure?.year_text?.value : 'Year'
				}
				categoryTitle={
					structure?.product_category?.value
						? structure?.product_category?.value
						: 'Product Category'
				}
				newsSearchTitle={
					structure?.newsroom_search?.value
						? structure?.newsroom_search?.value
						: 'search newsroom'
				}
			/>

			<NewsRoomSlider data={{ structure: { list: structure?.slider } }} />
			<div className='news_room_news_box'>
				<div className='container items '>
					{/* {news === 'loading' ? (
					<Spinner />
				) : Array.isArray(news) ? ( */}
					{news ? (
						<>
							{news === 'loading' ? (
								<div style={{ width: '100%', marginBottom: '30px' }}>
									<Spinner />
								</div>
							) : (
								<>
									<div className='news_room_news_box_search_items'>
										{news.map(item => (
											<div>
												<Link href={item?.route || '/'}>
													<a style={{ width: width > 600 ? '370px' : '100%' }}>
														<div>
															<CustomImage
																src={
																	item?.meta?.find(
																		element =>
																			element?.name === 'property="og:image"'
																	)?.content
																}
																wrapperWidth={width > 600 ? '370px' : '100%'}
																wrapperHeight={width > 600 ? '100%' : '144px'}
															/>
														</div>
														<div className='text_box'>
															<span className='subject'>{item?.tags[0]}</span>
															<h5>
																<Link href={item?.route || '/'}>
																	<a>{item?.title}</a>
																</Link>
															</h5>
															<span className='date'>
																{moment(item?.created_at).format(
																	'MMMM DD YYYY'
																)}
															</span>
														</div>
													</a>
												</Link>
											</div>
										))}
									</div>
									<div className='pagination'>
										{pagination && (
											<NewsRoomPagination
												handler={_page =>
													setFilters({ ...filters, page: _page })
												}
												pagination={pagination}
											/>
										)}
									</div>
								</>
							)}
						</>
					) : (
						structure?.list?.value.map(
							(item, index) =>
								index <= 5 && (
									<NewsRoomMainNewsItem
										link={item?.link?.value}
										target={item?.link?.target}
										date={item?.created_at}
										image={item?.image?.src}
										subject={item?.tag?.value}
										title={item?.title?.value}
										isFirst={newsItemOrder[index] === 1}
										isThree={newsItemOrder[index] === 3}
									/>
								)
						)
					)}
					{/* ) : null} */}
				</div>
				{!news && (
					<Link
						target={structure?.link?.target || '_self'}
						href={structure?.link?.value || '/'}>
						<a
							target={structure?.link?.target || '_self'}
							className='view_archive'>
							{structure?.link?.title}
						</a>
					</Link>
				)}
			</div>
		</>
	)
}

export default NewsRoomMainBox
