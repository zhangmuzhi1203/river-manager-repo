const mongoose = require('mongoose')//导入mongoose
mongoose.connect('mongodb://127.0.0.1:27017/database-one')//连接数据库
const db = mongoose.connection
db.on('open', () => {
  console.log('数据库连接成功')
})
db.on('error', (err) => {
  console.log('数据库连接失败')
})