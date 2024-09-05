const UserModel = require('../models/UserModel')
const UserService = {
  login: async ({ username, password }) => {
    return UserModel.findOne({//要是有返回一个对象要是没有返回一个null
      username, password
    })
  },
  upload: async ({ _id, avatar, username, phone, gender, introduction }) => {
    if (avatar) {
      return UserModel.updateOne({ _id }, { username, phone, gender, introduction, avatar })
    } else {
      return UserModel.updateOne({ _id }, { username, phone, gender, introduction })
    }
  },
  add: async ({ username, password, phone, gender, role, introduction }) => {
    return UserModel.create({
      username, password, phone, gender, role, introduction
    })
  },
  getList: async ({ _id }) => {
    //find()取出所有的 返回给调用者 有两个参数 第一个查询条件 第二个查询对象
    return _id ? UserModel.find({ _id }, ['username', 'phone', 'gender', 'role', 'introduction'])
      : UserModel.find({}, ['username', 'phone', 'gender', 'role', 'introduction'])
  },
  putList: async (body) => {
    return UserModel.findOneAndUpdate({ _id: body._id }, body,)
  }
  ,
  delList: async ({ _id }) => {
    return UserModel.deleteOne({ _id })
  }
}

module.exports = UserService