import { createError } from 'h3'

/**
 * 模拟真实企业级后端 API 统一响应包装与微延迟
 */
export async function sendSuccess<T>(data: T, message = 'success') {
  // 仅在本地开发调试阶段模拟微延迟，SSG 预渲染与生产构建零延迟输出
  if (process.env.NODE_ENV !== 'production' && !process.env.npm_lifecycle_event?.includes('generate')) {
    await new Promise((resolve) => setTimeout(resolve, 30))
  }

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
