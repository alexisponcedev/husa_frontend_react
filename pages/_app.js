// component
import ErrorBoundary from 'components/common/ErrorBoundary/ErrorBoundary'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// redux
import { Provider } from 'react-redux'
import { store } from 'redux/store'

// style
import 'styles/App.scss'

function MyApp({ Component, pageProps }) {
	const [showChild, setShowChild] = useState(false)
	useEffect(() => {
		AOS.init()
		AOS.refresh()
		setShowChild(true)
	}, [])
	

	if (!showChild) {
		return null
	}

	if (typeof window === 'undefined') {
		return <></>
	} else {
		return (
			<Provider store={store}>
				{/* <ErrorBoundary> */}
				<Component {...pageProps} />
				{/* </ErrorBoundary> */}
			</Provider>
		)
	}

	// return (
	// 	<Provider store={store}>
	// 		<Component {...pageProps} />
	// 	</Provider>
	// )
}

export default MyApp
