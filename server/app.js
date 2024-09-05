const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
//环境变量文件
require('dotenv').config()
const UserRouter = require('./routes/admin/UserRoute')
const RiverRouter = require('./routes/admin/RiverRouter')
const DataRouter = require('./routes/admin/DataRouter')
const app = express()
const jwt = require('./util/jwt')
//后端跨域配置
const corsOption = {
  origin: ['http://localhost:8080'],
  exposedHeaders: ['Authorization'],
}
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
//要再加载路由前
app.use(cors(corsOption))
//刷新token中间件
app.use((req, res, next) => {
  if (req.url === '/adminapi/user/login') {
    next()
    return
  }
  const authorizationHeader = req.headers['authorization']
  // 检查 Authorization 头是否存在
  if (!authorizationHeader) {
    return res.status(401).json({ message: '未授权', status: false })
  }
  const token = authorizationHeader.split(' ')[1]
  try {
    // 验证 token
    const payload = jwt.verify(token)
    if (payload) {
      // 生成新的 token
      const newToken = jwt.generate({
        username: payload.username
      }, '1d')
      // 返回新的 token 并终止执行
      res.header('Authorization', 'Bearer ' + newToken)
      next()
    } else {
      return res.status(401).json({ message: 'token过期', status: false })
    }
  } catch (err) {
    // 捕获 token 验证错误
    return res.status(401).json({ message: '无效的 token', status: false })
  }
})
//加载用户数据路由
app.use(UserRouter)
app.use(RiverRouter)
app.use(DataRouter)
module.exports = app
