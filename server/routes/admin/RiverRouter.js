const express = require('express')
const RiverController = require('../../controllers/RiverController')
const RiverRouter = express.Router()
RiverRouter.post('/adminapi/river/add', RiverController.add)
RiverRouter.get('/adminapi/river/list', RiverController.getList)
RiverRouter.get('/adminapi/river/list/:id', RiverController.getList)
RiverRouter.put('/adminapi/river/list/:id', RiverController.putList)
RiverRouter.delete('/adminapi/river/list/:id', RiverController.delList)
module.exports = RiverRouter