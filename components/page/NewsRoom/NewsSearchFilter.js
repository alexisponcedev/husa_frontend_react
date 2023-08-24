import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import AngleArrow from 'components/icons/AngleArrow'
import MagnifierIcon from 'components/icons/MagnifierIcon'
import SelectBoxAngleArrow from 'components/icons/SelectBoxAngleArrow'
import { useWindowSize } from 'hooks/useWindowSize'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

let years = []

for (let year = new Date().getFullYear(); year >= 1980; year--) {
	years.push(year)
}

const NewsSearchFilter = ({
	title = 'Featured News',
	filters,
	yearTitle,
	categoryTitle,
	newsSearchTitle,
	filterHandler,
	resetFilters
}) => {
	const [openFilter, setOpenFilter] = useState(false)
	const [width] = useWindowSize()
	const [timer, setTimer] = useState(null)
	const [filterData, setFilterData] = useState()
	const [searchTerm, setSearchTerm] = useState('')
	const [tempFilters, setTempFilters] = useState({})
	const windowSize = useWindowSize()
	const target = useRef()

	useEffect(() => {
		getNews()
	}, [])

	useEffect(() => {
		setTempFilters(filters)
	}, [filters])

	useEffect(() => {
		clearTimeout(timer)

		const newTimer = setTimeout(() => {
			filterChangeHandler('search', searchTerm)
		}, 500)

		setTimer(newTimer)
	}, [searchTerm])

	const getNews = async () => {
		try {
			let response = await axios.get(
				`https://imcxm.dev-api.hisenseportal.com/api/husa/getPosts/meta?type=news&brand_id=3`
			)
			setFilterData(response?.data)
		} catch (error) {
			console.log(error)
		}
	}

	function filterChangeHandler(_key, _value) {
		if (windowSize[0] < 1050) {
			setTempFilters({ ...tempFilters, [_key]: _value })
		} else {
			filterHandler(_key, _value, false)
		}
	}

	function confirmChanges() {
		filterHandler('', '', { ...tempFilters, page: 1 })
		setOpenFilter(false)
		setTimeout(() => {
			window.scrollTo({
				top: target.current.scrollHeight + 250
			})
		}, 500)
	}

	return (
		<div ref={target} className='news_room_search_filter'>
			<div className=''>
				<div className='content'>
					<div className='filter_title'>
						<span className='title'>{title}</span>
						<button
							className={!openFilter && 'close_button'}
							onClick={() => setOpenFilter(state => !state)}>
							Filters
							<AngleArrow />
						</button>
					</div>

					<div
						className='filter_options'
						style={{
							height: width > 1050 ? 'fit-content' : openFilter ? '315px' : '0',
							marginTop: width > 1050 ? '0' : openFilter ? '32px' : '0',
							overflow:
								width < 1050 ? (!openFilter ? 'hidden' : 'unset') : 'unset'
						}}>
						<button
							onClick={() => {
								resetFilters()
								setTempFilters({
									page: 1,
									product: null,
									search: '',
									year: null
								})
								setSearchTerm('')
							}}
							className='reset d-none d-lg_block'>
							Reset Filters
						</button>
						<div className='select_box_custom'>
							{/* <label>Model year</label> */}
							<div>
								<span>
									<span>
										{tempFilters?.year || (
											<span className='label'>{yearTitle}</span>
										)}
									</span>
									{tempFilters?.year ? (
										<button
											className='bg-transparent border-0 text-white'
											onClick={() => filterChangeHandler('year', null)}>
											<FontAwesomeIcon icon={faXmark} />
										</button>
									) : (
										<SelectBoxAngleArrow />
									)}
								</span>
								<div>
									<ul>
										<li>
											<button
												className='clear'
												onClick={() => filterChangeHandler('year', null)}>
												Clear
												<FontAwesomeIcon icon={faXmark} size={'sm'} />
											</button>
										</li>
										{filterData?.years
											?.sort((a, b) => b - a)
											?.map(item => (
												<li>
													<button
														onClick={() => filterChangeHandler('year', item)}>
														{item}
													</button>
												</li>
											))}
									</ul>
								</div>
							</div>
						</div>
						<div className='select_box_custom product_select_box'>
							{/* <label>Product select</label> */}
							<div>
								<span>
									<span>
										{tempFilters?.product || (
											<span className='label'>{categoryTitle}</span>
										)}
									</span>
									{tempFilters?.product ? (
										<button
											className='bg-transparent border-0 text-white'
											onClick={() => filterChangeHandler('product', null)}>
											<FontAwesomeIcon icon={faXmark} />
										</button>
									) : (
										<SelectBoxAngleArrow />
									)}
								</span>
								<div>
									<ul>
										<li>
											<button
												className='clear'
												onClick={() => filterChangeHandler('product', null)}>
												Clear <FontAwesomeIcon icon={faXmark} size={'sm'} />
											</button>
										</li>
										{filterData?.tags?.map(item => (
											<li>
												<button
													onClick={() => filterChangeHandler('product', item)}>
													{item}
												</button>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						<div className='custom_input_box'>
							{/* <label>search archive</label> */}
							<div>
								<input
									onChange={e => setSearchTerm(e.target.value)}
									placeholder={newsSearchTitle}
									value={searchTerm}
								/>
								<MagnifierIcon />
							</div>
						</div>
						<div className='d-flex d-lg_none justify-content-center align-items-center gap-10'>
							<button
								onClick={() => {
									resetFilters()
									setTempFilters({
										page: 1,
										product: null,
										search: '',
										year: null
									})
									setSearchTerm('')
								}}
								className='reset'>
								Reset Filter
							</button>
							<button onClick={confirmChanges} className='n-btn white p-4'>
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewsSearchFilter
