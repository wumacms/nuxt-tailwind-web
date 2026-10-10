export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.name || !body?.email) {
    throw createError({
      statusCode: 400,
      statusMessage: '姓名与联系邮箱为必填项',
    })
  }

  // 模拟邮件服务或数据库写入处理
  return {
    success: true,
    message: '预约信息已妥善接收，Aperture 顾问将尽快与您联系！',
    receivedAt: new Date().toISOString(),
    data: {
      name: body.name,
      company: body.company || '未填写',
      email: body.email,
      type: body.type,
    },
  }
})
