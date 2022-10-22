
	import Layout from "components/common/Layout/Layout";
	import axios from "axios";
	import { useState } from "react";
	import dynamic from "next/dynamic";

	  

	function Index165({pim,data}) {
	    return (
			<Layout meta={[{"rel": "blank", "name": "title", "content": "learn something from nothing"}, {"rel": "blank", "name": "description", "content": null}, {"rel": "property=\"og:site_name\"", "name": "property=\"og:site_name\"", "content": "Hisense USA"}, {"rel": "property=\"og:title\"", "name": "property=\"og:title\"", "content": "learn something from nothing"}, {"rel": "property=\"og:description\"", "name": "property=\"og:description\"", "content": null}, {"rel": "property=\"og:image\"", "name": "property=\"og:image\"", "content": null}, {"rel": "property=\"og:url\"", "name": "property=\"og:url\"", "content": "/learn-something-from-nothing"}, {"rel": "property=\"og:type\"", "name": "property=\"og:type\"", "content": "website"}, {"rel": "property=\"og:locale\"", "name": "property=\"og:locale\"", "content": "en_US"}]}>
	      		<section>
		  		 
				</section>
			</Layout>
	    )
	  }

	  export async function getServerSideProps(context) {
			console.log('send ssr request')
			let data = await axios
				.get(
					'https://imcxm.dev-api.hisenseportal.com/api/husa/getPageInfo/165'
				)
				.then(response => {
					console.log('get ssr data')
					return response.data.widgets
				})
				.catch(error => {
					console.error('Error:', error)
					return null
				})			

			return { props: { data }} }
	

	  export default Index165