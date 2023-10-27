import React from 'react'

const DownloadIconV2 = ({ color = '#00AAA6', width = '21', height = '20' }) => {
	return (
		<svg
			width='21'
			height='20'
			viewBox='0 0 21 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M11.5 2.75C11.5 2.33579 11.1642 2 10.75 2C10.3358 2 10 2.33579 10 2.75V11.3636L7.04526 8.23503C6.76085 7.93389 6.28617 7.92033 5.98503 8.20474C5.6839 8.48915 5.67033 8.96383 5.95474 9.26497L10.2047 13.765C10.3464 13.915 10.5437 14 10.75 14C10.9563 14 11.1536 13.915 11.2953 13.765L15.5453 9.26497C15.8297 8.96383 15.8161 8.48915 15.515 8.20474C15.2138 7.92033 14.7392 7.93389 14.4547 8.23503L11.5 11.3636V2.75Z'
				fill={color}
			/>
			<path
				d='M4.25 12.75C4.25 12.3358 3.91421 12 3.5 12C3.08579 12 2.75 12.3358 2.75 12.75V15.25C2.75 16.7688 3.98122 18 5.5 18H16C17.5188 18 18.75 16.7688 18.75 15.25V12.75C18.75 12.3358 18.4142 12 18 12C17.5858 12 17.25 12.3358 17.25 12.75V15.25C17.25 15.9404 16.6904 16.5 16 16.5H5.5C4.80964 16.5 4.25 15.9404 4.25 15.25V12.75Z'
				fill={color}
			/>
		</svg>
	)
}

export default React.memo(DownloadIconV2)
