import React from 'react'
import NewsRoomMainNewsItem from '../NewsRoomMainNewsItem'
import Link from 'next/link'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Spinner from 'components/common/Spinner'

const NewsSingleLatestNews = ({ data }) => {
	let { structure } = data
	const [news, setNews] = useState()
	const [title, setTitle] = useState()

	console.log(structure)

	useEffect(() => {
		setTitle(structure?.title?.value)
		getNews()
	}, [])

	const getNews = async () => {
		setNews('loading')
		try {
			let response = await axios.get(
				`https://imcxm.dev-api.hisenseportal.com/api/husa/getPosts?type=news`
			)

			setNews(response.data.data)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='single_news_latest_news'>
			<div className='container'>
				<div>
					<h5 dangerouslySetInnerHTML={{ __html: title }}></h5>
					<div className='items'>
						{news === 'loading' ? (
							<Spinner />
						) : Array.isArray(news) ? (
							<>
								{news?.map(
									(item, index) =>
										index < structure?.count?.value && (
											<NewsRoomMainNewsItem data={item} isThree={true} />
										)
								)}
							</>
						) : null}
					</div>
					<Link href={structure?.link?.value || "/"}>
						<a>{structure?.link?.title}</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NewsSingleLatestNews
