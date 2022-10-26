import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function CustomSelectBox({ required = false, title, options, onChange }) {
	const [value, setValue] = useState(title)
	return (
		<div className=' custom-select-box'>
			<div className='form-container-inner-input select-container' tabIndex='1'>
				<div className='select-box-item'>
					<input
						className='input'
						type='radio'
						id='product'
						value='1'
						name='product'
						checked='checked'
						disabled
					/>
					<p className='input-text d-flex align-items-center justify-content-between '>
						{options === 'loading' ? (
							'loading ...'
						) : (
							<>
								{value}
								<FontAwesomeIcon icon={faChevronDown} size={'xs'} />
							</>
						)}
					</p>
				</div>
			</div>
			<ul className='select-box-list'>
				{options && Array.isArray(options) ? (
					<>
						{options.length === 0 ? (
							<li>empty</li>
						) : (
							options.map((item, index) => (
								<li
									onClick={() => {
										onChange(item)
										setValue(item?.name)
									}}
									key={index}>
									<label
										className='option'
										htmlFor='tv'
										aria-hidden='aria-hidden'>
										{item?.name}
									</label>
								</li>
							))
						)}
					</>
				) : null}
			</ul>
			{required && <span className='input-error'>This field is required.</span>}
		</div>
	)
}

export default CustomSelectBox
