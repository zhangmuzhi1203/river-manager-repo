const DataService = require("../services/DataService")
const DataController = {
  add: async (req, res) => {
    const result = await DataService.add(req.body)
    if (result) {
      res.json({
        status: true,
        data: result,
        messgae: '添加成功'
      })
    } else {
      res.json({
        status: false,
        message: '添加失败'
      })
    }
  },
  addCloud: async (req, res) => {
    let { conductance, ph, temperature, turbidity } = req.body
    const result = await DataService.addCloud(
      {
        conductance: Number(conductance),
        ph: Number(ph),
        temperature: Number(temperature),
        turbidity: Number(turbidity)
      }
    )
    console.log(result)
    res.send({
      code: 200,
      data: result,
    })
  },
  getList: async (req, res) => {
    const result = await DataService.getList({ _id: req.params.id })
    res.json({
      status: true,
      data: result,
    })
  },
  putList: async (req, res) => {
    const result = await DataService.putList(req.body)
    console.log(result)
    if (result) {
      res.json({
        status: true,
        message: '修改成功'
      })
    }
  },
  delList: async (req, res) => {
    await DataService.delList({ _id: req.params.id })
    res.json({
      status: true,
    })
  }
}
module.exports = DataController