const jsonwebtoken = require('jsonwebtoken')
const jwt = {
  //封装了两个函数 generate生成token verify验证token
  generate (value, expires) {//value:传入的值 secret密钥 expiresIn:token过期时间
    return jsonwebtoken.sign(value, process.env.SECRET, { expiresIn: expires })//核心：生成token的签名方法
  },
  verify (token) {
    //前端传入的token或者生成后的token 以及设置的密钥
    try {
      return jsonwebtoken.verify(token, process.env.SECRET)
    } catch (e) {
      return false
    }
  }
}
module.exports = jwt
