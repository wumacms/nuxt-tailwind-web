/**
 * 模拟真实企业级后端 API 统一响应包装与微延迟
 */
export async function sendSuccess<T>(data: T, message = 'success') {
  // 模拟真实后端数据库/缓存查询与网络 IO 延迟（40ms-80ms）
  await new Promise((resolve) => setTimeout(resolve, 60))

  return {
    code: 200,
    message,
    data,
  }
}

export function sendFail(message = '请求失败', code = 400, statusCode = 400) {
  throw createError({
    statusCode,
    statusMessage: message,
    data: {
      code,
      message,
      data: null,
    },
  })
}
