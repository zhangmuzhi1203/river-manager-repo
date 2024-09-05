const mongoose = require('mongoose')
//调用mongoose的Schema类 来定义 数据库表结构
const Schema = mongoose.Schema
//创建数据库表结构对象
const DataSchema = new Schema(
  {
    // 电导率
    conductance: {
      type: Number,
      required: true
    },
    //ph值
    ph: {
      type: Number,
      required: true
    },
    // 温度
    temperature: {
      type: Number,
      required: true
    },
    //浑浊度
    turbidity: {
      type: Number,
      required: true
    },
  }
)
const dataModel = mongoose.model('data', DataSchema)
module.exports = dataModel