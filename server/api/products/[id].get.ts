import products from '../../data/products.json'
import type { ProductItem } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const product = (products as ProductItem[]).find((p) => p.id === id)

  if (!product) {
    return sendFail('商品不存在或已下架', 404, 404)
  }

  return sendSuccess(product, '获取商品详情成功')
})
