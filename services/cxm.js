import axios from 'axios'

export async function getProductsWithCategoryApi(_categoryId) {
	let response = await axios.get(
		`${process.env.NEXT_PUBLIC_CXM_API_ROUTE}/searchProduct?categoryId=${_categoryId}`
	)
	return response
}

export async function getSettingApi() {
	let response = await axios.get(
		`${process.env.NEXT_PUBLIC_CXM_API_ROUTE}/getSettings`
	)
	return response
}

export async function GetNewsApi(filters, count) {
	let response = await axios.get(
		`${process.env.NEXT_PUBLIC_CXM_API_ROUTE}/getPosts?type=news${
			filters.year ? '&year=' + filters.year : ''
		}${filters.product ? '&tag=' + filters.product : ''}${
			filters.search && '&title=' + filters.search
		}&page=${filters.page}&perPage=${count || 10}&brand_id=${
			process.env.NEXT_PUBLIC_BRAND_ID
		}`
	)
	return response
}

export async function GetBlogsByTagApi(tag) {
	let response = await axios.get(
		`${process.env.NEXT_PUBLIC_CXM_API_ROUTE}/getPosts?type=blog&tag=${tag}&brand_id=${process.env.NEXT_PUBLIC_BRAND_ID}`
	)
	return response
}

export async function getBlogsByIdApi(ids) {
	let response = await axios.get(
		`${process.env.NEXT_PUBLIC_CXM_API_ROUTE}/getPostTags?postsIds=${ids}&brand_id=${process.env.NEXT_PUBLIC_BRAND_ID}`
	)
	return response
}
