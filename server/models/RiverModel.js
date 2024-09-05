const mongoose = require('mongoose')
//调用mongoose的Schema类 来定义 数据库表结构
const Schema = mongoose.Schema
//创建数据库表结构对象
const RiverSchema = new Schema(
  {
    // 河流名称
    rivername: {
      type: String,
      required: true
    },
    // 地址
    riveraddress: {
      type: String,
      required: true
    },
    // 污染级别
    pollutionlevel: {
      type: Number,
      required: true
    },
    //是否处理
    ishandle: {
      type: Number,//1是 0不是 
      required: true
    },

    description: {
      type: String,
      required: false
    }
  }
)
const riverModel = mongoose.model('river', RiverSchema)
module.exports = riverModel