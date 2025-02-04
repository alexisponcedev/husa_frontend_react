require('dotenv').config()
const { ComponentList } = require('../utils/ComponentList')

const PageGeneratorController = _page => {
	return `
import { useEffect,useState } from 'react'
import dynamic from 'next/dynamic'
const axios = require('axios')
import Layout from 'components/common/Layout/Layout';


${ComponentList.map(
	item => `const ${item.name} = dynamic(() => import('${item.path}'))`
).join(';')}


function Index({data,pim}) {
	const [components, setComponents] = useState([])
	useEffect(() => {
		let componentName =	data && data.widgets && data?.widgets.length ? data.widgets.map(item => item.name) : []
		setComponents(componentName)
	}, [])

	return (

		<Layout>
		<section> ${ComponentList.map(
			componentItem =>
				`{components.includes('${componentItem.name}') && <${componentItem.name} pim={pim} data={data.widgets.find(item => item.name === '${componentItem.name}')}/>}`
		).join('')}</section>
		</Layout>
			
	)
}
	
export async function getServerSideProps(context) {
	console.log('send ssr request')
	${
		!_page.model_id && _page.model_id === 0
			? `	let data = await axios
		.get(
			'${process.env.CXM_API_ROUTE}/getPageInfo/${_page.id}',
			{
				headers: {
					BrandId: ${process.env.BRAND_ID}
				}
			}
		)
		.then(response => {
			console.log('get ssr data')
			return response.data
		})
		.catch(error => {
			console.error('Error:', error)
			return null
		})
		return { props: { data } }
		`
			: `
			let productId = context?.query?.param[0]
			let data = await axios.get(
			'${process.env.CXM_API_ROUTE}/getDynamicPages/' + productId,
			{
				headers: {
					BrandId: ${process.env.BRAND_ID}
				}
			}
		)
		.then(response => {
			console.log('get ssr data')
			return response.data.data[0]
		})
		.catch(error => {
			console.error('Error:', error)
			return null
		});
		let pim = await axios
		.get(
			'${process.env.PIM_API_ROUTE}/getProduct/' + productId
		)
		.then(response => {
			console.log('get pim ssr data')
			return response.data
		})
		.catch(error => {
			if (error?.response?.status === 404) {
				return 404
			}
			console.error('Error:', error)
			return null
		})

		if (!data?.widgets || data?.widgets.length == 0) {
			return {
				notFound: true
			}
		}
	if (pim === 404) {
		return {
			notFound: true
		}
	}

	return { props: { data, pim } }	
		`
	}


	
}
export default Index`
}

module.exports = {
	PageGeneratorController
}
