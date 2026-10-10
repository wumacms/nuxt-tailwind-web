import products from '../../data/products.json'
import type { ProductItem, ProductDetailData } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const allProducts = products as ProductItem[]
  const product = allProducts.find((p) => p.id === id)

  if (!product) {
    return sendFail('商品不存在或已下架', 404, 404)
  }

  // 推荐同分类或其他推荐商品（排除当前商品，取4个）
  const related = allProducts
    .filter((p) => p.id !== id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4)

  const data: ProductDetailData = {
    product,
    related,
  }

  return sendSuccess(data, '获取商品详情成功')
})

