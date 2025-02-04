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
	const [newsLength, setNewsLength] = useState()
	const [pagination, setPagination] = useState()
	const [newsItemOrder, setNewsItemOrder] = useState([1, 2, 2, 3, 3, 3])
	const [filters, setFilters] = useState({
		year: [],
		product: [],
		search: '',
		page: 1
	})

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

	return (
		<>
			<NewsSearchFilter
				filters={filters}
				filterHandler={(_key, _value, _a) => {
					_a && Object.keys(_a).length > 0
						? setFilters(_a)
						: setFilters({ ...filters, [_key]: _value, page: 1 })
				}}
				title={structure?.title?.value}
				color={structure?.titleColor?.value}
				link={structure?.titleLink}
				yearTitle={
					structure?.year_text?.value ? structure?.year_text?.value : 'Year'
				}
				categoryTitle={
					structure?.product_category?.value
						? structure?.product_category?.value
						: 'Product'
				}
				newsSearchTitle={
					structure?.newsroom_search?.value
						? structure?.newsroom_search?.value
						: 'search Newsroom'
				}
				news={news}
				targetRoute={structure?.link?.value}
				newsLength={newsLength}
			/>
			<NewsRoomSlider data={{ structure: { list: structure?.slider } }} />

			<div id='main_news_box' className='news_room_news_box'>
				<div className='container items px-4'>
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
									<div className='news_press_archive container'>
										<div>
											<div className='items_box'>
												<div className='items mt-0'>
													{news === 'loading' ? (
														<Spinner />
													) : Array.isArray(news) ? (
														news.map(item => (
															<div>
																<Link href={item?.route || '/'}>
																	<a
																		className='d-block'
																		style={{
																			width: width > 600 ? '370px' : '100%'
																		}}>
																		<CustomImage
																			src={
																				item?.meta?.find(
																					element =>
																						element?.name ===
																						'property="og:image"'
																				)?.content
																			}
																			wrapperWidth={
																				width > 600 ? '370px' : '100%'
																			}
																			wrapperHeight={'100%'}
																		/>
																	</a>
																</Link>
																<div className='text_box'>
																	{item?.tags.map(item => (
																		<span className='subject'>{item}</span>
																	))}

																	<h5>
																		<Link href={item?.route || '/'}>
																			<a>{item?.title}</a>
																		</Link>
																	</h5>
																	<span className='date'>
																		{item?.published_at
																			? moment(item?.published_at).format(
																					'MMMM DD YYYY'
																			  )
																			: moment(item?.created_at).format(
																					'MMMM DD YYYY'
																			  )}
																	</span>
																</div>
															</div>
														))
													) : null}
												</div>

												{pagination && (
													<NewsRoomPagination
														handler={_page =>
															setFilters({ ...filters, page: _page })
														}
														pagination={pagination}
													/>
												)}
											</div>
										</div>
									</div>
								</>
							)}
						</>
					) : (
						structure?.list?.value.map(
							(item, index) =>
								index < newsItemOrder.length && (
									<NewsRoomMainNewsItem
										key={index}
										link={item?.link?.value}
										target={item?.link?.target}
										date={item?.published_at}
										image={item?.image?.src}
										subject={item?.tag?.value}
										title={item?.title?.value}
										isFirst={newsItemOrder[index] === 1}
										isThree={newsItemOrder[index] === 3}
										fetched
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
