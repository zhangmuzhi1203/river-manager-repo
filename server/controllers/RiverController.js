const RiverService = require('../services/RiverService')
const RiverController = {
  add: async (req, res) => {
    // await RiverService.add(req.body)
    const result = await RiverService.add(req.body)
    console.log(result)
    res.send({
      code: 200,
      data: result
    })
  },
  getList: async (req, res) => {
    const result = await RiverService.getList({ _id: req.params.id })
    res.send({
      code: 200,
      data: result
    })
  },
  putList: async (req, res) => {
    await RiverService.putList(req.body)
    res.send({
      code: 200
    })
  },
  delList: async (req, res) => {
    // console.log(req.params.id)
    const result = await RiverService.delList({ _id: req.params.id })

    res.send({
      code: 200,
      data: result
    })
  }
}
module.exports = RiverController