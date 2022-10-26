import React from 'react'

function CustomInput({
	placeholder,
	disabled = false,
	required = false,
	className,
	type = 'text',
	defaultValue,
	onChange,
	value
}) {
	return (
		<div>
			<input
				disabled={disabled}
				type={type}
				onChange={e => onChange(e.target.value)}
				className={`form-container-inner-input ${className}`}
				placeholder={placeholder}
				required={required}
				defaultValue={defaultValue && defaultValue}
				value={value && value}
			/>
			{required && <span className='input-error'>This field is required.</span>}
		</div>
	)
}

export default React.memo(CustomInput)
