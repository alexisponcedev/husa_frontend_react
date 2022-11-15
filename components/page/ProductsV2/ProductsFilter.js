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
	setFilters
}) => {
	let router = useRouter()
	const [filterCounter, setFilterCounter] = useState()
	const [sowMoreLimitation, setSowMoreLimitation] = useState(4)
	useEffect(() => {
		if (router.query.filter) {
			filterCounterHandler(JSON.parse(decodeURIComponent(router.query.filter)))
		}
		setFilters(
			router.query.filter
				? JSON.parse(decodeURIComponent(router.query.filter))
				: []
		)
	}, [])

	const filterController = (e, _filter) => {
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
						values: [...filterWrapperExisted.values, _filter.title]
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
							values: removeExitItem
						}
					]
				}
			}
		} else {
			_filtersBox.push({
				id: _filter.filterId,
				values: [_filter.title]
			})
		}
		filterCounterHandler(_filtersBox)
		setFilters(_filtersBox)
		filterRequest(_filtersBox)

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
		setFilterCounter(filtersItem.length)
	}

	const checkboxClearHandler = () => {
		setCheckBoxCondition(!checkBoxCondition)
		setFilters([])
		filterRequest([])
	}
	return (
		<aside className='mobile-filter-line'>
			<div>
				<div className='d-flex justify-content-between align-items-center mb-4 mb-md-0'>
					<div className='fw-normal fs-8 d-block d-md-none'>Filter</div>
					<button
						className='n-btn outline-primary mb-md-8'
						onClick={checkboxClearHandler}>
						Clear Filters
						{filterCounter > 0 ? (
							<span className='ms-2'>({filterCounter})</span>
						) : (
							''
						)}
					</button>
				</div>
				<div className='filter-group-container pb-4 pb-md-0'>
					{filterList &&
						filterList.map(
							(filterItem, index) =>
								index + 1 <= sowMoreLimitation && (
									<ProductFiltersGroup
										index={index}
										key={`filter-${filterItem.name}-${filterItem.id} `}
										filter={filterItem}
										passedFilter={filters}
										filterController={filterController}
										checkBoxCondition={checkBoxCondition}
									/>
								)
						)}
					{filterList && filterList.length > 4 ? (
						<button
							onClick={() =>
								setSowMoreLimitation(
									sowMoreLimitation !== 4 ? 4 : filterList.length
								)
							}
							className='n-btn outline-black text-nowrap mx-2'>
							{sowMoreLimitation === 4 ? 'Show More' : 'Show Less'}
						</button>
					) : null}
				</div>
			</div>
		</aside>
	)
}

export default ProductsFilter
