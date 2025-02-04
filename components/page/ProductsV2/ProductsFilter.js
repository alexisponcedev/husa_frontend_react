import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { GetFiltersApi } from 'services/Filter'
import ProductFiltersGroup from './ProductFiltersGroup'

const ProductsFilter = ({
	filterList,
	filterRequest,
	checkBoxCondition,
	setCheckBoxCondition,
	filters,
	setFilters,
	total,
	category,
	showProductFilterCount,
	searchTerm,
	setSearchTerm
}) => {
	let router = useRouter()
	const [filterListData, setFilterListData] = useState([])
	const [filterCounter, setFilterCounter] = useState()
	const [sowMoreLimitation, setSowMoreLimitation] = useState(4)
	const [responsiveCollapseStatus, setResponsiveCollapseStatus] =
		useState(false)
	const [filterResponsiveStatus, setFilterResponsiveStatus] = useState(false)

	useEffect(() => {
		if (router.query.filter) {
			filterCounterHandler(
				searchTerm && searchTerm.length
					? JSON.parse(decodeURIComponent(router.query.filter)) + 1
					: JSON.parse(decodeURIComponent(router.query.filter))
			)
		} else {
			setFilterCounter(searchTerm && searchTerm.length ? 1 : 0)
		}
		setFilters(
			router.query.filter
				? JSON.parse(decodeURIComponent(router.query.filter))
				: []
		)
	}, [router.query.filter, searchTerm])

	useEffect(() => {
		setFilterListData(filterList)
	}, [filterList])

	const filterController = (e, _filter, _filterType) => {
		let _filtersBox = filters
		let filterWrapperExisted = _filtersBox.find(
			item => item.id === _filter.filterId
		)
		e.target.checked = true

		if (filterWrapperExisted) {
			if (filterWrapperExisted.values.indexOf(_filter.title) < 0) {
				let removeExitItemOfFilters = (_filtersBox = filters.filter(
					item => item.id !== _filter.filterId
				))
				_filtersBox = [
					...removeExitItemOfFilters,
					{
						id: filterWrapperExisted.id,
						type: _filterType,
						values: [...filterWrapperExisted.values, _filter.title],
						keys: [...filterWrapperExisted.values, _filter.value]
					}
				]
			} else {
				let removeExitItem = filterWrapperExisted.values.filter(
					item => item !== _filter.title
				)
				let removeExitItemOfFilters = (_filtersBox = filters.filter(
					item => item.id !== _filter.filterId
				))
				if (removeExitItem.length === 0) {
					_filtersBox = [...removeExitItemOfFilters]
				} else {
					_filtersBox = [
						...removeExitItemOfFilters,
						{
							id: filterWrapperExisted.id,
							type: _filterType,
							values: removeExitItem,
							keys: removeExitItem
						}
					]
				}
			}
		} else {
			_filtersBox.push({
				id: _filter.filterId,
				type: _filterType,
				values: [_filter.title],
				keys: [_filter.filter_value]
			})
		}
		filterCounterHandler(_filtersBox)
		setFilters(_filtersBox)
		filterRequest(_filtersBox, searchTerm)

		// if (_filtersBox.find(item => item.filter_name === _filter.title)) {
		// _filtersBox = filters.filter(item => item.filter_name !== _filter.title)
		// } else {
		// 	_filtersBox.push({
		// 		filter_name: _filter.title,
		// 		filter_value: _filter.filter_value
		// 	})
		// }
	}

	const filterCounterHandler = _filters => {
		let filtersItem = []
		_filters.forEach(filterItem => {
			filtersItem.push(...filterItem.values)
		})
		setFilterCounter(
			searchTerm && searchTerm.length
				? filtersItem.length + 1
				: filtersItem.length
		)
	}

	const checkboxClearHandler = () => {
		setFilterCounter()
		setCheckBoxCondition(!checkBoxCondition)
		setSearchTerm('')
		setFilters([])
		filterRequest([], '')
	}
	return (
		<aside className='mobile-filter-line w-100 pb-4'>
			<div>
				<div className='d-flex justify-content-between align-items-center mb-4 mb-md-0'>
					<div className='fw-normal fs-8 d-block d-md-none'>Filter</div>
					{filterList.length !== 0 && filterList.length !== 0 ? (
						<button
							className={`n-btn medium products-filtering-button ${
								filterCounter > 0 ? 'primary text-white' : 'outline-primary'
							} mb-md-8`}
							onClick={checkboxClearHandler}>
							Clear Filters{'   '}
							{filterCounter > 0 ? (
								<>
									<span className='ms-2'>{filterCounter}</span>
								</>
							) : (
								''
							)}
						</button>
					) : null}
				</div>
				<div className='filter-group-container pb-md-0'>
					<div className='filter-group-wrapper'>
						{filterListData &&
							filterListData.map(
								(filterItem, index) =>
									index + 1 <= sowMoreLimitation && (
										<ProductFiltersGroup
											responsiveCollapseStatus={responsiveCollapseStatus}
											setResponsiveCollapseStatus={setResponsiveCollapseStatus}
											index={index}
											key={`filter-${filterItem.name}-${filterItem.id} `}
											filter={filterItem}
											passedFilter={filters}
											filterController={filterController}
											checkBoxCondition={checkBoxCondition}
											setFilterResponsiveStatus={setFilterResponsiveStatus}
											filterResponsiveStatus={filterResponsiveStatus}
											total={total}
											category={category}
											showProductFilterCount={showProductFilterCount}
										/>
									)
							)}
						{filterListData && filterListData.length > 4 ? (
							<button
								onClick={() =>
									setSowMoreLimitation(
										sowMoreLimitation !== 4 ? 4 : filterListData.length
									)
								}
								className='n-btn outline-black text-nowrap mx-2 medium'>
								{sowMoreLimitation === 4 ? 'Show More' : 'Show Less'}
							</button>
						) : null}
					</div>
				</div>
			</div>
		</aside>
	)
}

export default ProductsFilter
