const express = require('express')
const UserController = require('../../controllers/UserContoller')
const UserRouter = express.Router()
//文件上传
const multer = require('multer')
//这将告诉 Multer 将上传文件保存在哪
const upload = multer({ dest: 'public/avataruploads/' })
UserRouter.post('/adminapi/user/login', UserController.login)
UserRouter.post('/adminapi/user/upload', upload.single('file'), UserController.upload)
UserRouter.post('/adminapi/user/add', UserController.add)
UserRouter.get('/adminapi/user/list', UserController.getList)
UserRouter.get('/adminapi/user/list/:id', UserController.getList)
UserRouter.delete('/adminapi/user/list/:id', UserController.delList)
UserRouter.put('/adminapi/user/list/:id', UserController.putList)
module.exports = UserRouter