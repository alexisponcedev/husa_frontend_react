import React, { useRef, useState } from 'react'
import { faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../../common/Spinner'

const ExtendedWarrantyFileInput = ({
	label,
	boxContent,
	onChange,
	modalOnClick,
	id,
	name,
	value,
	loading
}) => {
	const inputRef = useRef(null)
	const [file, setFile] = useState()

	return (
		<div className='extended-warranty-file-input'>
			<div className='d-flex justify-content-start align-items-start align-items-md-center flex-column flex-md-row p-4'>
				<label>{label}</label>
				{modalOnClick && (
					<button
						className='n-btn modal-btn ms-0 ms-md-3 mt-3 mt-md-0'
						type='button'
						onClick={modalOnClick}>
						<FontAwesomeIcon icon={faCircleInfo} className='me-2' size='xl' />
						Where do i find my model number?
					</button>
				)}
			</div>
			<div
				className={`input position-relative ${
					value === '' ? '' : 'activated'
				}`}>
				{loading === name && (
					<div
						className={'position-absolute top-50 '}
						style={{
							left: '50%',
							transform: 'translate(-50%,-50%)',
							zIndex: '2'
						}}>
						<Spinner size={30} />
					</div>
				)}

				{file ? (
					<>
						<button
							onClick={() => {
								onChange(name, null)
								setFile(null)
							}}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
						<img
							src={file}
							className='w-100 h-100 top-0 left-0 position-absolute'
						/>
					</>
				) : (
					<div className='content'>
						{value === '' ? boxContent : 'Image Uploaded'}
					</div>
				)}

				{!file && (
					<input
						type='file'
						ref={inputRef}
						onChange={e => {
							const file = e.target.files[0]
							setFile(URL.createObjectURL(e.target.files[0]))
							file?.type.startsWith('image') &&
								onChange(name, {
									id: id,
									asset: e.target.files && e.target.files[0],
									name: name
								})
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default ExtendedWarrantyFileInput
