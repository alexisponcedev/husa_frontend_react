import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Spinner from 'components/common/Spinner'
import Link from 'next/link'
import React, { useState } from 'react'

function ProductsCategoriesWithSearch({ data }) {
	let { structure } = data
	const [searchInput, setSearchInput] = useState(false)
	const [searchList, setSearchList] = useState(false)
	const [searchProductsList, setSearchProductsList] = useState()

	const searchHandler = async _value => {
		if (_value.length >= 2) {
			setSearchProductsList('loading')
			try {
				let response = await axios.get(
					`https://imcxm.dev-api.hisenseportal.com/api/husa/searchProduct?string=${_value}`
				)
				setSearchProductsList(response.data.data)
			} catch (error) {
				setSearchProductsList([])
				console.log(error)
			}
		}
	}
	console.log(data)
	return (
		<section>
			<div className='product-category support-product-category-new text-center container my-15 mt-10 px-6'>
				<h2 className='mb-10 fs-4'>{structure?.title?.value}</h2>
				<div className='products row mb-8'>
					{structure?.list?.value.map((item, index) => (
						<div
							key={'category' + index}
							onClick={() => {
								setSearchList(false)
								setSearchInput(status => !status)
							}}
							id={item?.title?.value}
							className='p-type col-12 col-sm-6 col-md-4 col-lg-2 cursor-pointer'>
							<div className='img_box'>
								<img
									width={'100%'}
									src={item?.image?.src}
									alt={item?.image?.alt}
								/>
							</div>
							<p>{item?.title?.value}</p>
						</div>
					))}
				</div>
				{searchInput && (
					<div
						className='row justify-content-center align-items-center '
						id='product-support-search'>
						<div className='custom-select-support custom-select-support-new'>
							<button
								className='search-products-btn'
								onClick={() => setSearchList(status => !status)}>
								<FontAwesomeIcon icon={faMagnifyingGlass} size={'lg'} />
								<span className='ms-3'>Please Select Your Product</span>
							</button>
							{searchList && (
								<div className='search-products-list '>
									<input
										type='text'
										className='search'
										onChange={e => searchHandler(e.target.value)}
									/>
									<ul className='list'>
										{searchProductsList === 'loading' ? (
											<li className='py-5'>
												<Spinner size={20} />
											</li>
										) : Array.isArray(searchProductsList) &&
										  searchProductsList.length > 0 ? (
											searchProductsList.map((item, index) => (
												<li>
													{console.log(item)}
													<Link href='/'>
														<a>{item.name}</a>
													</Link>
												</li>
											))
										) : (
											<li>its empty</li>
										)}
									</ul>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</section>
	)
}

export default ProductsCategoriesWithSearch
