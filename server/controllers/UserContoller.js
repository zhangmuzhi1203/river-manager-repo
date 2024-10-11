const UserService = require('../services/UserService')
const jwt = require('../util/jwt')
const UserContoller = {
  login: async (req, res) => {
    console.log(req.body)
    let result = await UserService.login(req.body)
    if (result) {
      //生成token
      const token = jwt.generate({ username: result.username }, '1d')
      //通过res.json向前端发送token 授权
      res.header('Authorization', 'Bearer ' + token)
      res.json({
        status: true,
        message: '登录成功',
        data: {
          _id: result._id,
          username: result.username,
          gender: result.gender ? result.gender : 2,
          phone: result.phone,
          role: result.role,
          introduction: result.introduction,
          avatar: result.avatar ? result.avatar : ''
        }
      })
    } else {
      res.send({
        code: '-1',
        error: '用户名或密码错误'
      })
    }
  },
  upload: async (req, res) => {
    const { _id, username, phone, gender, introduction } = req.body
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
    const result = await UserService.upload({ _id, username, phone, gender: Number(gender), avatar, introduction })
    if (result) {
      if (avatar) {
        res.json({
          status: true,
          message: '更新成功',
          data: {
            username,
            introduction,
            phone,
            gender: Number(gender),
            avatar,
            _id
          }
        })
      } else {
        res.json({
          status: true, message: '更新成功',
          data: {
            username,
            _id,
            introduction,
            gender: Number(gender)
          }
        })
      }
    } else {
      res.json({ status: false, message: '更新失败', data: null })
    }

  },
  add: async (req, res) => {
    let { username, password, phone, gender, introduction, role } = req.body
    let result = await UserService.add({ username, password, phone, gender: Number(gender), introduction, role: Number(role) })
    res.json({
      status: 'OK',
      data: result
    })
  },
  getList: async (req, res) => {
    const result = await UserService.getList({ _id: req.params.id })
    res.json({
      status: true,
      data: result
    })
  },
  putList: async (req, res) => {
    const result = await UserService.putList(req.body)
    res.json({
      status: true,
      data: result
    })
  },
  delList: async (req, res) => {
    await UserService.delList({ _id: req.params.id })
    res.json({
      status: true,
    })
  }
}
module.exports = UserContoller









