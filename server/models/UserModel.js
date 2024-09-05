const mongoose = require('mongoose')
//调用mongoose的Schema类 来定义 数据库表结构
const Schema = mongoose.Schema
//创建数据库表结构对象
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    // 密码
    password: {
      type: String,
      required: true
    },
    //头像
    avatar: {
      type: String,
      required: false
    },
    // 手机号
    phone: {
      type: String,
      required: false
    },
    //性别
    gender: {
      type: Number,//1男 0女 //2保密,
      required: false
    },
    //role
    role: {
      type: Number,//1管理员 2普通用户
      required: false
    },
    introduction: {
      type: String,
      required: false
    }
  }
)
//创建数据库表对象
const userModel = mongoose.model('user', UserSchema)
// userModel.create({
//   username: 'admin',
//   password: '123456',
//   phone: '13800138000',
//   gender: 1,
//   role: 1,
//   introduction: '路漫漫其修远兮,吾将上下而求索'
// }).then(res => {
//   console.log(res)
// }).catch(error => {
//   console.log(error)
// })
module.exports = userModel